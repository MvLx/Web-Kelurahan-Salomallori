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
      label: "Jumlah KK",
    },
    {
      icon: Trees,
      value: desa?.jumlahDusun ? `${desa.jumlahDusun} Dusun` : "-",
      label: "Jumlah Dusun",
    },
  ];

  return (
    <section className="bg-linen py-20 dark:bg-[#111411]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-[12px] border border-sage bg-paper p-6 text-center shadow-paper-sm transition-shadow hover:shadow-paper-md dark:border-[#414943] dark:bg-[#1a1a1a]"
              >
                <Icon className="mb-4 h-8 w-8 text-hudson-blue dark:text-[#84bd3a]" />
                {loading ? (
                  <div className="h-8 w-20 animate-pulse rounded bg-ash dark:bg-[#2e2e2e]" />
                ) : (
                  <h3 className="font-display text-headline-medium font-semibold text-obsidian dark:text-white">
                    {stat.value}
                  </h3>
                )}
                <p className="mt-1 font-body text-sm text-iron dark:text-[#c2c8bd]">
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