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
  dataJson: DataPoint[];
  chartType: string;
  createdAt: string;
  updatedAt: string;
}

const COLORS = ["#006496", "#2D6A4F", "#F59E0B", "#BA1A1A", "#6B7280", "#171717"];

export default function ChartView({ item }: { item: ChartItem }) {
  const data = Array.isArray(item.dataJson) ? item.dataJson : [];

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
              <Line type="monotone" dataKey="value" stroke="#006496" strokeWidth={2} dot={{ fill: "#006496", r: 4 }} />
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
              <Area type="monotone" dataKey="value" stroke="#2D6A4F" fill="#2D6A4F" fillOpacity={0.2} strokeWidth={2} />
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