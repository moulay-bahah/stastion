import { Fuel } from "lucide-react";
import { pumps } from "@/data/data";



const pumpsData = pumps.map((pump) => ({
  id: pump.name,
  status: pump.status,
  index: pump.index,
  fuel: pump.fuelType,
  sales: pump.totalLitersToday,
  statusColor: pump.status === "active" ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-500/20" : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-500/20",
}));

export default function PumpsTable() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-5 lg:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
         <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pumps Status</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">pumps sales and status</p>
         </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Pump</th>
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Status</th>
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Current Fuel</th>
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">index</th>
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Today's Sales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {pumpsData.map((pump, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                        <Fuel className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                     </div>
                     {pump.id}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${pump.statusColor}`}>
                    {pump.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">{pump.fuel}</td>
                <td className="py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">{pump.index}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-900 dark:text-white">{pump.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
