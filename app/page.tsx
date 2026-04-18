"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import SalesChart from "@/components/SalesChart";
import PumpsTable from "@/components/PumpsTable";
import TanksTable from "@/components/tanksTable";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <DashboardHeader />
        <SummaryCards />
        <SalesChart />
        <PumpsTable />
        <TanksTable />
      </div>
    </main>
  );
}
