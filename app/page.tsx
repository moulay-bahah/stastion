"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import SalesChart from "@/components/SalesChart";
import PumpsTable from "@/components/PumpsTable";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <DashboardHeader />
          <SummaryCards />
          <SalesChart />
          <PumpsTable />
        </div>
      </main>
    </div>
  );
}
