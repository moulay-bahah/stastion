"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const salesData = [
  { time: "06:00", sales: 400 },
  { time: "09:00", sales: 800 },
  { time: "12:00", sales: 1200 },
  { time: "15:00", sales: 1600 },
  { time: "18:00", sales: 2100 },
  { time: "21:00", sales: 1400 },
  { time: "00:00", sales: 500 },
];

export default function SalesChart() {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 lg:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
       <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sales Trend</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Hourly sales volume across all fuel types.</p>
       </div>
       <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.3} vertical={false} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} dx={-10} tickFormatter={(val) => `${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#fff', fontWeight: 500 }}
              />
              <Line type="monotone" dataKey="sales" name="Sales ($)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
}
