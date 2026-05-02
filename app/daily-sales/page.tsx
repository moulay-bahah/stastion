"use client";

import { useEffect, useState } from "react";
import { submitDailyReading } from "./actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fuel, ArrowLeft, Save, Calendar, DollarSign, Plus, X, Activity, Loader2 } from "lucide-react";
import { PumpReading, Pump, Price } from "@/data/type";

export default function DailySales() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // List state
  const [filterDate, setFilterDate] = useState("");
  const [readings, setReadings] = useState<PumpReading[]>([]);
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [price, setPrice] = useState<Price>({ diesel: 0, gasoline: 0 });

  // Form state
  const [date, setDate] = useState("");
  const [indices, setIndices] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sales, setSales] = useState(0);

  useEffect(() => {
    setMounted(true);
    setDate(new Date().toISOString().split("T")[0]);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/sales?meta=true");
      const data = await res.json();
      
      if (data.readings) {
        setReadings(data.readings);
        setPumps(data.pumps || []);
        setPrice(data.price || { diesel: 0, gasoline: 0 });
        
        // Initialize indices for the form
        const defaultIndices: Record<string, number> = {};
        data.pumps?.forEach((pump: Pump) => {
          // Find the last reading for this pump from the readings list
          // Note: data.readings is sorted desc by date, so first one with this pump is the latest
          let lastIndex = 0;
          for (const reading of data.readings) {
            const pEntry = reading.pumps.find((p: any) => p.pumpId === pump.id);
            if (pEntry) {
              lastIndex = pEntry.index;
              break;
            }
          }
          defaultIndices[pump.id] = lastIndex;
        });
        setIndices(defaultIndices);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pumps.length === 0) return;
    
    const totalSales = pumps.reduce((acc, pump) => {
      // Find previous index for this pump
      let previousIndex = 0;
      for (const reading of readings) {
        const pEntry = reading.pumps.find((p: any) => p.pumpId === pump.id);
        if (pEntry) {
          previousIndex = pEntry.index;
          break;
        }
      }
      
      const currentIndex = indices[pump.id] || 0;
      const totalLiters = Math.max(0, currentIndex - previousIndex);
      const fuelPrice = pump.fuelType === "diesel" ? price.diesel : price.gasoline;
      return acc + totalLiters * fuelPrice;
    }, 0);
    setSales(totalSales);
  }, [indices, pumps, readings, price]);

  if (!mounted) return null;

  const filteredReadings = readings.filter((reading) => {
    if (filterDate && reading.date !== filterDate) return false;
    return true;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleIndexChange = (pumpId: string, value: string) => {
    setIndices(prev => ({
      ...prev,
      [pumpId]: value === '' ? 0 : parseFloat(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newReadingData = {
      date,
      sales,
      pumps: pumps.map(pump => {
        let previousIndex = 0;
        for (const reading of readings) {
          const pEntry = reading.pumps.find((p: any) => p.pumpId === pump.id);
          if (pEntry) {
            previousIndex = pEntry.index;
            break;
          }
        }
        const currentIndex = indices[pump.id] || 0;
        return {
          pumpId: pump.id,
          fuelType: pump.fuelType, 
          index: currentIndex,
          totalLitersToday: Math.max(0, currentIndex - previousIndex),
        };
      })
    };

    const result = await submitDailyReading(newReadingData);
    setSubmitting(false);
    
    if (result.success) {
      setIsModalOpen(false);
      // Refresh data instead of just local state update for consistency
      fetchData();
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
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Daily Sales
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Track daily pump readings and total sales.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Reading
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Filter by Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-600" />
              <p>Loading sales data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Date</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Total Liters Sold</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Diesel Sold</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Gasoline Sold</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 text-right">Total Sales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredReadings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">No daily readings found.</td>
                    </tr>
                  ) : (
                    filteredReadings.map((reading) => {
                      const totalLiters = reading.pumps.reduce((acc, p) => acc + p.totalLitersToday, 0);
                      const dieselLiters = reading.pumps.filter(p => p.fuelType === "diesel").reduce((acc, p) => acc + p.totalLitersToday, 0);
                      const gasolineLiters = reading.pumps.filter(p => p.fuelType === "gasoline").reduce((acc, p) => acc + p.totalLitersToday, 0);

                      return (
                        <tr key={reading.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-white">
                            {reading.date}
                          </td>
                          <td className="py-4 px-6 text-sm font-mono text-slate-600 dark:text-slate-300">
                            {totalLiters.toLocaleString()} L
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                                diesel
                              </span>
                              <span className="text-sm font-mono text-slate-600 dark:text-slate-300">
                                {dieselLiters.toLocaleString()} L
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                                gasoline
                              </span>
                              <span className="text-sm font-mono text-slate-600 dark:text-slate-300">
                                {gasolineLiters.toLocaleString()} L
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <span className="font-mono font-bold text-slate-900 dark:text-white">
                              {reading.sales.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Reading Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Add Daily Reading
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 max-h-[calc(100vh-140px)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-center">
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
                      className="w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors font-medium"
                      required
                    />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-center">
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

                <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="p-5 lg:p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/80">
                     <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pumps Readings</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Enter the current index for each pump</p>
                     </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                          <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Pump</th>
                          <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Fuel Type</th>
                          <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Previous Index</th>
                          <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Current Index</th>
                          <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 text-right">Today's Liters</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {pumps.map(pump => {
                          let previousIndex = 0;
                          for (const reading of readings) {
                            const pEntry = reading.pumps.find((p: any) => p.pumpId === pump.id);
                            if (pEntry) {
                              previousIndex = pEntry.index;
                              break;
                            }
                          }
                          const currentIndex = indices[pump.id] || 0;
                          const totalLiters = Math.max(0, currentIndex - previousIndex);
                          
                          return (
                            <tr key={pump.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors group bg-white dark:bg-slate-800/50">
                              <td className="py-4 px-6">
                                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                                   <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors">
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
                                  className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors placeholder:text-slate-400 shadow-inner"
                                  placeholder="Enter index"
                                  required
                                />
                              </td>
                              <td className="py-4 px-6 text-right">
                                <span className={`inline-flex items-center justify-end font-mono font-bold text-base ${totalLiters > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
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

                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-6 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {submitting ? 'Saving Reading...' : 'Save Daily Reading'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}