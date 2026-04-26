"use client";

import { useState } from "react";
import { tanks, tankRefills } from "@/data/data";
import { TankRefill } from "@/data/type";
import { Truck, Plus, X, Calendar, Droplet, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<TankRefill[]>(tankRefills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterTank, setFilterTank] = useState("");

  // Modal State
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tankId, setTankId] = useState(tanks[0]?.id || "");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerLiter, setPricePerLiter] = useState("");
  const [paymentEvidence, setPaymentEvidence] = useState<File[]>([]);

  const total = (parseFloat(quantity) || 0) * (parseFloat(pricePerLiter) || 0);

  const filteredPurchases = purchases.filter((purchase) => {
    if (filterDate && purchase.date !== filterDate) return false;
    if (filterTank && purchase.tankId !== filterTank) return false;
    return true;
  });

  const handleAddPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTank = tanks.find(t => t.id === tankId);
    const newPurchase: TankRefill = {
      id: `refill_${Date.now()}`,
      tankId: tankId,
      date,
      totalliter: parseFloat(quantity),
      costPerLiter: parseFloat(pricePerLiter),
      amount: total,
      supplier: supplier,
      fuelType: selectedTank?.fuelType || "diesel",
      createdAt: new Date().toISOString(),
      paymentEvidence: paymentEvidence,
    };

    setPurchases([newPurchase, ...purchases]);
    setIsModalOpen(false);
    // Reset form
    setQuantity("");
    setPricePerLiter("");
    setSupplier("");
    setPaymentEvidence([]);
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-6 h-6 text-blue-600" />
              Fuel Purchases
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Track fuel deliveries from trucks into tanks.</p>
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
              Add Purchase
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
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Filter by Tank</label>
            <div className="relative">
              <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterTank}
                onChange={(e) => setFilterTank(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
              >
                <option value="">All Tanks</option>
                {tanks.map((tank) => (
                  <option key={tank.id} value={tank.id}>
                    {tank.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Date</th>
                  <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Tank</th>
                  <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Supplier</th>
                  <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Quantity (Liters)</th>
                  <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Price per Liter</th>
                  <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredPurchases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">No purchases found.</td>
                  </tr>
                ) : (
                  filteredPurchases.map((purchase) => {
                    const tank = tanks.find(t => t.id === purchase.tankId);
                    return (
                      <tr key={purchase.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-white">
                          {purchase.date}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                              purchase.fuelType === "diesel" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                            }`}>
                              {purchase.fuelType}
                            </span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {tank?.name || "Unknown Tank"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                          {purchase.supplier || "Unknown"}
                        </td>
                        <td className="py-4 px-6 text-sm font-mono text-slate-600 dark:text-slate-300">
                          {purchase.totalliter.toLocaleString()} L
                        </td>
                        <td className="py-4 px-6 text-sm font-mono text-slate-600 dark:text-slate-300">
                          {purchase.costPerLiter.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {(purchase.totalliter * purchase.costPerLiter).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Add Fuel Purchase
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddPurchase} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tank</label>
                <select
                  value={tankId}
                  onChange={(e) => setTankId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                >
                  {tanks.map((tank) => (
                    <option key={tank.id} value={tank.id}>
                      {tank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Supplier</label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter supplier name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Quantity (Liters)</label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price per Liter</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={pricePerLiter}
                    onChange={(e) => setPricePerLiter(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Payment Evidence (Transaction Images)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setPaymentEvidence(Array.from(e.target.files));
                    }
                  }}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-200 transition-all"
                />
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center mt-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Auto-Calculated</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                  {total.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                >
                  Save Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
