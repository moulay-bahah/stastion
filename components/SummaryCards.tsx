import { 
  Droplet, 
  AlertCircle, 
  DollarSign, 
  Activity 
} from "lucide-react";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Sales</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$12,450.00</h3>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
          +14.5% <span className="text-slate-400 font-normal">from yesterday</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Fuel Sold</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">4,280 L</h3>
          </div>
          <div className="p-2 bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl">
            <Droplet className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
          +8.2% <span className="text-slate-400 font-normal">from yesterday</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Pumps</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">3 / 4</h3>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
          1 pump out of service
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Alerts</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">2</h3>
          </div>
          <div className="p-2 bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
          Tank 2 Low Level
        </div>
      </div>
    </div>
  );
}
