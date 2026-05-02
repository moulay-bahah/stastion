import { Fuel } from "lucide-react";
import { tanks } from "@/data/data";

// const tanksData = [
//   { id: "Pump 1", fuel: "Diesel", capacity: "10000L", alerts: "2000L", statusColor: "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-500/20" },
//   { id: "Pump 2", fuel: "gasoline", capacity: "10000L", alerts: "2000L", statusColor: "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20" },
//   { id: "Pump 3", fuel: "gasoline", capacity: "10000L", alerts: "2000L", statusColor: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-500/20" },
// ];

const tanksData = tanks.map((tank) => ({
  name: tank.name,
  fuel: tank.fuelType,
  capacity: tank.capacity,
  currentLevel: tank.currentLevel,
  alerts: tank.currentLevel <  tank.minThreshold ? "Low stock" : "Normal",
  statusColor: tank.currentLevel < tank.minThreshold ? "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-500/20" : "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-500/20",
}));

export default function TanksTable() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-5 lg:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
         <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tanks Status</h3>
         </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Tank</th>
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Fuel Type</th>
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Capacity</th>
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Current Level</th>
              <th className="py-3 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Alerts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {tanksData.map((tank, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="py-4 px-6">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                        <Fuel className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                     </div>
                     {tank.name}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300">{tank.fuel}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-900 dark:text-white">{tank.capacity}</td>
                <td className="py-4 px-6 text-sm font-bold text-slate-900 dark:text-white">{tank.currentLevel}</td>
                <td className={`py-4 px-6 text-sm font-bold`}><span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${tank.statusColor}`}>{tank.alerts}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
