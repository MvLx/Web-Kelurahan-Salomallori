"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartItem {
  id: string;
  judul: string;
  tahun: number;
  dataJson: unknown;
  chartType: string;
  createdAt: string;
  updatedAt: string;
}

const COLORS = ["#84bd3a", "#32735f", "#febe0d", "#0b2b40", "#6B7280", "#BA1A1A"];

type UnknownRecord = Record<string, unknown>;

function humanizeKey(key: string): string {
  const spaced = key.replace(/([A-Z])/g, " $1").replace(/[_-]+/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isDataPointArray(value: unknown): value is DataPoint[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (v) =>
      v !== null &&
      typeof v === "object" &&
      "label" in v &&
      "value" in v &&
      typeof (v as Record<string, unknown>).label === "string" &&
      typeof (v as Record<string, unknown>).value === "number"
  );
}

/**
 * Normalisasi dataJson agar kompatibel dengan Recharts (DataPoint[]).
 * Mendukung 3 format:
 *  1. DataPoint[]  — [{ label, value }]  (format baru / yang dipakai admin)
 *  2. Chart.js     — { labels: [], datasets: [{ data: [] }] }  (format seed lama)
 *  3. Flat object  — { totalPenduduk: 1599, jumlahKK: 561 }  (STAT_CARDS seed lama)
 */
function normalizeData(dataJson: unknown): DataPoint[] {
  // Format 1: sudah DataPoint[]
  if (isDataPointArray(dataJson)) {
    return dataJson.filter(
      (d) => typeof d.label === "string" && typeof d.value === "number" && !Number.isNaN(d.value)
    );
  }

  if (dataJson !== null && typeof dataJson === "object") {
    const obj = dataJson as UnknownRecord;

    // Format 2: Chart.js style { labels: [...], datasets: [{ data: [...] }] }
    if (Array.isArray(obj.labels) && Array.isArray(obj.datasets) && obj.datasets.length > 0) {
      const labels = obj.labels as string[];
      const firstDataset = obj.datasets[0] as UnknownRecord;
      const values = Array.isArray(firstDataset?.data) ? (firstDataset.data as number[]) : [];
      return labels
        .map((label, i) => ({ label: String(label), value: Number(values[i] ?? 0) }))
        .filter((d) => !Number.isNaN(d.value));
    }

    // Format 3: Flat object → DataPoint[] (mis. untuk STAT_CARDS)
    const entries = Object.entries(obj);
    if (entries.length > 0 && entries.every(([, v]) => typeof v === "number")) {
      return entries.map(([key, value]) => ({
        label: humanizeKey(key),
        value: Number(value),
      }));
    }
  }

  return [];
}

export default function ChartView({ item }: { item: ChartItem }) {
  const data = normalizeData(item.dataJson);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-iron text-sm">Tidak ada data untuk ditampilkan</p>
      </div>
    );
  }

  const renderChart = () => {
    switch (item.chartType) {
      case "LINE_CHART":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dee2de" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #dee2de", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="value" stroke="#32735f" strokeWidth={2} dot={{ fill: "#32735f", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );

      case "PIE_CHART":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={100}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label={(entry: any) => `${entry.label}: ${entry.value}`}
              >
                {data.map((entry: DataPoint, index: number) => (
                  <Cell key={index} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #dee2de", borderRadius: "8px" }} />
            </PieChart>
          </ResponsiveContainer>
        );

      case "DOUGHNUT_CHART":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label={(entry: any) => `${entry.label}: ${entry.value}`}
              >
                {data.map((entry: DataPoint, index: number) => (
                  <Cell key={index} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #dee2de", borderRadius: "8px" }} />
            </PieChart>
          </ResponsiveContainer>
        );

      case "AREA_CHART":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dee2de" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #dee2de", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="value" stroke="#84bd3a" fill="#84bd3a" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "STAT_CARDS":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((d: DataPoint, index: number) => (
              <div key={index} className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {d.value.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{d.label}</p>
              </div>
            ))}
          </div>
        );

      default: // BAR_CHART
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dee2de" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #dee2de", borderRadius: "8px" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry: DataPoint, index: number) => (
                  <Cell key={index} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-body text-body-small text-iron">Tahun {item.tahun}</p>
        </div>
        <span className="bg-fog text-obsidian dark:text-white dark:bg-[#2e2e2e] text-xs font-semibold px-3 py-1 rounded-xs">
          {item.chartType.replace(/_/g, " ")}
        </span>
      </div>
      {renderChart()}
    </div>
  );
}