import { 
  BarChart3, 
  Fuel, 
  LayoutDashboard, 
  Settings, 
  Users 
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 md:flex md:flex-col shrink-0 flex-row overflow-x-auto md:overflow-visible gap-2 border-b md:border-b-0 hidden md:block">
      <div className="space-y-2 lg:mt-4">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg font-medium transition-colors">
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors">
          <Fuel className="w-5 h-5" /> Pump Status
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors">
          <BarChart3 className="w-5 h-5" /> Reports
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors">
          <Users className="w-5 h-5" /> Staff
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors">
          <Settings className="w-5 h-5" /> Settings
        </a>
      </div>
    </aside>
  );
}
