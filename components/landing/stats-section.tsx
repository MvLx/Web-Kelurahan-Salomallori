"use client";

import { useEffect, useState } from "react";
import { MapPin, Users, Home, Trees } from "lucide-react";

type DesaData = {
  luasWilayah: number | null;
  jumlahPenduduk: number | null;
  jumlahKK: number | null;
  jumlahDusun: number | null;
};

export function StatsSection() {
  const [desa, setDesa] = useState<DesaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/desa");
        if (res.ok) {
          const data = await res.json();
          setDesa(data);
        }
      } catch (error) {
        console.error("Failed to load desa data:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = [
    {
      icon: MapPin,
      value: desa?.luasWilayah ? `${desa.luasWilayah} km²` : "-",
      label: "Luas Wilayah",
    },
    {
      icon: Users,
      value: desa?.jumlahPenduduk
        ? desa.jumlahPenduduk.toLocaleString("id-ID")
        : "-",
      label: "Jumlah Penduduk",
    },
    {
      icon: Home,
      value: desa?.jumlahKK ? desa.jumlahKK.toLocaleString("id-ID") : "-",
      label: "Kepala Keluarga",
    },
    {
      icon: Trees,
      value: desa?.jumlahDusun ? `${desa.jumlahDusun} Dusun` : "-",
      label: "Dusun",
    },
  ];

  return (
    <section className="bg-linen dark:bg-[#111411] py-4xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-[12px] border border-sage bg-paper p-6 shadow-paper-sm transition-shadow hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]"
              >
                <Icon className="mb-3 h-8 w-8 text-hudson-blue dark:text-[#7fc8ff]" />
                {loading ? (
                  <div className="h-8 w-20 animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
                ) : (
                  <p className="font-display text-headline-medium font-semibold text-obsidian dark:text-white">
                    {stat.value}
                  </p>
                )}
                <p className="font-body text-body-small text-iron dark:text-[#c2c8bd] mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}