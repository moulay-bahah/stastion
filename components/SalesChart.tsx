"use client";

import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { pumpReadings, price } from "@/data/data";

export type SalesData = {
  time: string;
  sales: number;
  diesel: number;
  gasoline: number;
  dieselLiters: number;
  gasolineLiters: number;
};

const rawSalesData = pumpReadings.reduce((acc: Record<string, SalesData>, reading) => {
  const date = reading.date;
  const daySales = reading.sales;
  
  const dieselLiters = reading.pumps
    .filter((p) => p.fuelType === "diesel")
    .reduce((sum, p) => sum + p.totalLitersToday, 0);

  const gasolineLiters = reading.pumps
    .filter((p) => p.fuelType === "gasoline")
    .reduce((sum, p) => sum + p.totalLitersToday, 0);

  const dieselSales = dieselLiters * price.diesel;
  const gasolineSales = gasolineLiters * price.gasoline;

  if (!acc[date]) {
    acc[date] = { time: date, sales: 0, diesel: 0, gasoline: 0, dieselLiters: 0, gasolineLiters: 0 };
  }
  
  acc[date].sales += daySales;
  acc[date].diesel += dieselSales;
  acc[date].gasoline += gasolineSales;
  acc[date].dieselLiters += dieselLiters;
  acc[date].gasolineLiters += gasolineLiters;
  
  return acc;
}, {} as Record<string, SalesData>);

const salesData: SalesData[] = Object.values(rawSalesData).sort(
  (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
);

export default function SalesChart() {
  const [activeLines, setActiveLines] = useState({
    sales: true,
    diesel: true,
    gasoline: true,
  });

  const toggleLine = (dataKey: keyof typeof activeLines) => {
    setActiveLines((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 lg:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sales Trend</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Daily sales volume across fuel types.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => toggleLine("sales")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                activeLines.sales 
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" 
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeLines.sales ? "bg-blue-500" : "bg-slate-400"}`}></div>
              Total
            </button>
            <button 
              onClick={() => toggleLine("diesel")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                activeLines.diesel 
                  ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" 
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeLines.diesel ? "bg-amber-500" : "bg-slate-400"}`}></div>
              Diesel
            </button>
            <button 
              onClick={() => toggleLine("gasoline")}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                activeLines.gasoline 
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" 
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeLines.gasoline ? "bg-emerald-500" : "bg-slate-400"}`}></div>
              Gasoline
            </button>
          </div>
       </div>
       <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} vertical={false} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 13 }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#64748b", fontSize: 13 }} 
                dx={-10} 
                tickFormatter={(val) => {
                  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
                  if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
                  return `${val}`;
                }} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "12px", color: "#fff", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                itemStyle={{ fontWeight: 500 }}
                formatter={(value: any, name: any, item: any) => {
                  if (name === "Diesel" && item?.payload?.dieselLiters != null) {
                    return [`${Number(value).toLocaleString()} (${item.payload.dieselLiters.toLocaleString()} L)`, name];
                  }
                  if (name === "Gasoline" && item?.payload?.gasolineLiters != null) {
                    return [`${Number(value).toLocaleString()} (${item.payload.gasolineLiters.toLocaleString()} L)`, name];
                  }
                  return [Number(value).toLocaleString(), name];
                }}
              />
              {activeLines.sales && (
                <Line type="monotone" dataKey="sales" name="Total Sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6, strokeWidth: 0 }} />
              )}
              {activeLines.diesel && (
                <Line type="monotone" dataKey="diesel" name="Diesel" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6, strokeWidth: 0 }} />
              )}
              {activeLines.gasoline && (
                <Line type="monotone" dataKey="gasoline" name="Gasoline" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6, strokeWidth: 0 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
}
