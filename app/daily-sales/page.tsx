"use client";

import { useEffect, useState } from "react";
import { pumps, pumpReadings, price } from "@/data/data";
import { submitDailyReading } from "./actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fuel, ArrowLeft, Save, Calendar, DollarSign } from "lucide-react";

export default function DailySales() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState("");
  const [indices, setIndices] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sales, setSales] = useState(0);

  useEffect(() => {
    setMounted(true);
    setDate(new Date().toISOString().split("T")[0]);
    
    const defaultIndices: Record<string, number> = {};
    pumps.forEach(pump => {
      // Find the last reading for this pump to format the init state
      const lastReadingIndex = pumpReadings[pumpReadings.length - 1]?.pumps.find(p => p.pumpId === pump.id)?.index || 0;
      defaultIndices[pump.id] = lastReadingIndex;
    });
    setIndices(defaultIndices);
  }, []);

  useEffect(() => {
    const totalSales = pumps.reduce((acc, pump) => {
      const previousIndex = pumpReadings[pumpReadings.length - 1]?.pumps.find(p => p.pumpId === pump.id)?.index || 0;
      const currentIndex = indices[pump.id] || 0;
      const totalLiters = Math.max(0, currentIndex - previousIndex);
      return acc + totalLiters * price[pump.fuelType];
    }, 0);
    setSales(totalSales);
  }, [indices]);

  if (!mounted) return null;

  const handleIndexChange = (pumpId: string, value: string) => {
    setIndices(prev => ({
      ...prev,
      [pumpId]: value === '' ? 0 : parseFloat(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newReading = {
      id: `r_${(pumpReadings.length + 1).toString().padStart(3, "0")}`,
      date,
      sales,
      pumps: pumps.map(pump => {
        const previousIndex = pumpReadings[pumpReadings.length - 1]?.pumps.find(p => p.pumpId === pump.id)?.index || 0;
        const currentIndex = indices[pump.id] || 0;
        return {
          pumpId: pump.id,
          // Extract the fuelType from the main pumps[] list as requested
          fuelType: pump.fuelType, 
          index: currentIndex,
          // Calculate the totalLitersToday dynamically based on user input
          totalLitersToday: Math.max(0, currentIndex - previousIndex),
        };
      })
    };

    const result = await submitDailyReading(newReading);
    setSubmitting(false);
    
    if (result.success) {
      router.push("/");
      router.refresh();
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Daily Pump Reading</h1>
            <p className="text-slate-500 dark:text-slate-400">Update the index value for each pump to calculate today's total liters.</p>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
              <label htmlFor="date" className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Calendar className="w-4 h-4" />
                </div>
                Reading Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors font-medium"
                required
              />
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <DollarSign className="w-4 h-4" />
                </div>
                Estimated Total Sales
              </h2>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">$</span>
                <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {sales.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 lg:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
               <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pumps Readings</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Enter the current index for each pump</p>
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Pump</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Fuel Type</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Previous Index</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Current Index</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 text-right">Today's Liters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {pumps.map(pump => {
                    const previousIndex = pumpReadings[pumpReadings.length - 1]?.pumps.find(p => p.pumpId === pump.id)?.index || 0;
                    const currentIndex = indices[pump.id] || 0;
                    const totalLiters = Math.max(0, currentIndex - previousIndex);
                    
                    return (
                      <tr key={pump.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group bg-white dark:bg-slate-900">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                             <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                                <Fuel className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                             </div>
                             <div>
                                <div>{pump.name}</div>
                                <div className="text-xs text-slate-500 font-normal uppercase tracking-wider">{pump.id}</div>
                             </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            pump.fuelType === "diesel" 
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                          }`}>
                            {pump.fuelType}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-slate-600 dark:text-slate-300 font-mono">
                          {previousIndex.toLocaleString()}
                        </td>
                        <td className="py-4 px-6">
                          <input
                            type="number"
                            min={previousIndex}
                            value={indices[pump.id] !== undefined ? indices[pump.id] : ''}
                            onChange={(e) => handleIndexChange(pump.id, e.target.value)}
                            className="w-32 bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-inner"
                            placeholder="Enter index"
                            required
                          />
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className={`inline-flex items-center justify-end font-mono font-bold text-base ${totalLiters > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-600'}`}>
                            {totalLiters > 0 ? '+' : ''}{totalLiters.toLocaleString()} L
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-2 pb-8">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {submitting ? 'Saving Reading...' : 'Save Daily Reading'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}