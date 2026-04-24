"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Fuel, 
  LayoutDashboard, 
  Settings, 
  Users,
  Menu,
  X,
  Droplet
} from "lucide-react";
import Link from "next/link"; // Recommended for internal navigation

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header (Hidden on Desktop) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
          <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Station
        </div>
        <button 
          onClick={() => setIsOpen(true)} 
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Background Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col h-full
        md:sticky md:top-0 md:h-screen md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 dark:border-slate-800">
           <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
             <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
             <span className="hidden md:block">FuelStation</span>
             <span className="md:hidden">Station</span>
           </div>
           <button 
             onClick={() => setIsOpen(false)} 
             className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
           >
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/daily-sales" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors">
            <Fuel className="w-5 h-5" /> Daily Sales
          </Link>
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors">
            <BarChart3 className="w-5 h-5" /> Reports
          </Link>
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" /> Staff
          </Link>
          <Link href="/setting" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </div>
      </aside>
    </>
  );
}
