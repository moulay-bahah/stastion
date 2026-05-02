"use client";

import { useState } from "react";
import { tanks as initialTanks, pumps as initialPumps, price as initialPrice, stations } from "@/data/data";
import { Tank, Pump, Price } from "@/data/type";
import { Settings, Droplet, Fuel, DollarSign, Plus, Edit, X, Save, ArrowLeft, Container, MapPin, Activity } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"tanks" | "pumps" | "prices">("tanks");

  // Data State
  const [tanksList, setTanksList] = useState<Tank[]>(initialTanks);
  const [pumpsList, setPumpsList] = useState<Pump[]>(initialPumps);
  const [pricesData, setPricesData] = useState<Price>(initialPrice);

  // Modals State
  const [isTankModalOpen, setIsTankModalOpen] = useState(false);
  const [editingTank, setEditingTank] = useState<Tank | null>(null);

  const [isPumpModalOpen, setIsPumpModalOpen] = useState(false);
  const [editingPump, setEditingPump] = useState<Pump | null>(null);

  // Tank Form State
  const [tankName, setTankName] = useState("");
  const [tankFuelType, setTankFuelType] = useState("diesel");
  const [tankCapacity, setTankCapacity] = useState("");
  const [tankMinThreshold, setTankMinThreshold] = useState("");
  const [tankStationId, setTankStationId] = useState(stations[0]?.id || "");

  // Pump Form State
  const [pumpName, setPumpName] = useState("");
  const [pumpFuelType, setPumpFuelType] = useState("diesel");
  const [pumpTankId, setPumpTankId] = useState("");
  const [pumpStationId, setPumpStationId] = useState(stations[0]?.id || "");
  const [pumpIndex, setPumpIndex] = useState("");
  const [pumpStatus, setPumpStatus] = useState("active");

  // Prices Form State
  const [editDieselPrice, setEditDieselPrice] = useState(pricesData.diesel.toString());
  const [editGasolinePrice, setEditGasolinePrice] = useState(pricesData.gasoline.toString());
  const [priceSuccessMessage, setPriceSuccessMessage] = useState("");

  const openTankModal = (tank?: Tank) => {
    if (tank) {
      setEditingTank(tank);
      setTankName(tank.name);
      setTankFuelType(tank.fuelType);
      setTankCapacity(tank.capacity.toString());
      setTankMinThreshold(tank.minThreshold.toString());
      setTankStationId(tank.stationId);
    } else {
      setEditingTank(null);
      setTankName("");
      setTankFuelType("diesel");
      setTankCapacity("");
      setTankMinThreshold("");
      setTankStationId(stations[0]?.id || "");
    }
    setIsTankModalOpen(true);
  };

  const handleSaveTank = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTank) {
      setTanksList(tanksList.map(t => t.id === editingTank.id ? {
        ...t,
        name: tankName,
        fuelType: tankFuelType,
        capacity: parseFloat(tankCapacity),
        minThreshold: parseFloat(tankMinThreshold),
        stationId: tankStationId,
      } : t));
    } else {
      const newTank: Tank = {
        id: `tank_${Date.now()}`,
        name: tankName || "New Tank",
        fuelType: tankFuelType,
        capacity: parseFloat(tankCapacity),
        currentLevel: 0,
        minThreshold: parseFloat(tankMinThreshold),
        lastRefillAt: new Date().toISOString(),
        stationId: tankStationId,
      };
      setTanksList([...tanksList, newTank]);
    }
    setIsTankModalOpen(false);
  };

  const openPumpModal = (pump?: Pump) => {
    if (pump) {
      setEditingPump(pump);
      setPumpName(pump.name);
      setPumpFuelType(pump.fuelType);
      setPumpTankId(pump.tank_id);
      setPumpStationId(pump.stationId);
      setPumpIndex(pump.index.toString());
      setPumpStatus(pump.status);
    } else {
      setEditingPump(null);
      setPumpName("");
      setPumpFuelType("diesel");
      setPumpTankId(tanksList[0]?.id || "");
      setPumpStationId(stations[0]?.id || "");
      setPumpIndex("");
      setPumpStatus("active");
    }
    setIsPumpModalOpen(true);
  };

  const handleSavePump = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPump) {
      setPumpsList(pumpsList.map(p => p.id === editingPump.id ? {
        ...p,
        name: pumpName,
        fuelType: pumpFuelType,
        tank_id: pumpTankId,
        stationId: pumpStationId,
        index: parseFloat(pumpIndex),
        status: pumpStatus,
      } : p));
    } else {
      const newPump: Pump = {
        id: `pump_${Date.now()}`,
        name: pumpName || "New Pump",
        fuelType: pumpFuelType,
        tank_id: pumpTankId,
        stationId: pumpStationId,
        index: parseFloat(pumpIndex),
        status: pumpStatus,
        totalLitersToday: 0,
      };
      setPumpsList([...pumpsList, newPump]);
    }
    setIsPumpModalOpen(false);
  };

  const handleSavePrices = (e: React.FormEvent) => {
    e.preventDefault();
    setPricesData({
      diesel: parseFloat(editDieselPrice),
      gasoline: parseFloat(editGasolinePrice),
    });
    setPriceSuccessMessage("Prices updated successfully!");
    setTimeout(() => setPriceSuccessMessage(""), 3000);
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Manage station infrastructure and pricing.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab("tanks")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl transition-all ${
              activeTab === "tanks"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <Container className="w-4 h-4" />
            Tanks
          </button>
          <button
            onClick={() => setActiveTab("pumps")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl transition-all ${
              activeTab === "pumps"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <Fuel className="w-4 h-4" />
            Pumps
          </button>
          <button
            onClick={() => setActiveTab("prices")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-xl transition-all ${
              activeTab === "prices"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Prices
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6">
          
          {/* Tanks Tab */}
          {activeTab === "tanks" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Tanks Management</h2>
                <button
                  onClick={() => openTankModal()}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Tank
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Tank Name</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Station</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Fuel Type</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 text-right">Capacity (L)</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 text-right">Min Threshold</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {tanksList.map((tank) => {
                      const station = stations.find(s => s.id === tank.stationId);
                      return (
                        <tr key={tank.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{tank.name}</td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                              <MapPin className="w-3.5 h-3.5" />
                              {station?.name || "Unknown"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              tank.fuelType === "diesel" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            }`}>
                              <Droplet className="w-3 h-3 mr-1" />
                              {tank.fuelType.charAt(0).toUpperCase() + tank.fuelType.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right font-mono text-slate-600 dark:text-slate-300">{tank.capacity.toLocaleString()}</td>
                          <td className="py-4 px-6 text-right font-mono text-slate-600 dark:text-slate-300">{tank.minThreshold.toLocaleString()}</td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => openTankModal(tank)}
                              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              title="Edit Tank"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {tanksList.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">No tanks configured yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pumps Tab */}
          {activeTab === "pumps" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Pumps Management</h2>
                <button
                  onClick={() => openPumpModal()}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Pump
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Pump Name</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Linked Tank</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Station</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500">Status</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 text-right">Current Index</th>
                      <th className="py-4 px-6 text-xs uppercase tracking-wider font-semibold text-slate-500 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {pumpsList.map((pump) => {
                      const tank = tanksList.find(t => t.id === pump.tank_id);
                      const station = stations.find(s => s.id === pump.stationId);
                      return (
                        <tr key={pump.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{pump.name}</td>
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-300 text-sm">{tank?.name || "Unlinked"}</td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                              <MapPin className="w-3.5 h-3.5" />
                              {station?.name || "Unknown"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              pump.status === "active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}>
                              <Activity className="w-3 h-3 mr-1" />
                              {pump.status.charAt(0).toUpperCase() + pump.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right font-mono text-slate-600 dark:text-slate-300">{pump.index.toLocaleString()}</td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() => openPumpModal(pump)}
                              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              title="Edit Pump"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {pumpsList.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">No pumps configured yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Prices Tab */}
          {activeTab === "prices" && (
            <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-center space-y-1 mb-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Fuel Prices</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Update the selling price per liter.</p>
              </div>

              <form onSubmit={handleSavePrices} className="space-y-6">
                <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplet className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-sm font-semibold text-amber-900 dark:text-amber-200 mb-2">Diesel Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editDieselPrice}
                        onChange={(e) => setEditDieselPrice(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/30 rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-sm font-semibold text-emerald-900 dark:text-emerald-200 mb-2">Gasoline Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editGasolinePrice}
                        onChange={(e) => setEditGasolinePrice(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-900/30 rounded-xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  {priceSuccessMessage ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm animate-in fade-in">
                      {priceSuccessMessage}
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    Save Prices
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* Tank Modal */}
      {isTankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Container className="w-5 h-5 text-blue-600" />
                {editingTank ? "Edit Tank" : "Add New Tank"}
              </h2>
              <button 
                onClick={() => setIsTankModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveTank} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tank Name</label>
                <input
                  type="text"
                  value={tankName}
                  onChange={(e) => setTankName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="e.g. Main Diesel Tank"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Station</label>
                <select
                  value={tankStationId}
                  onChange={(e) => setTankStationId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                >
                  {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fuel Type</label>
                <select
                  value={tankFuelType}
                  onChange={(e) => setTankFuelType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="diesel">Diesel</option>
                  <option value="gasoline">Gasoline</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Capacity (Liters)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={tankCapacity}
                    onChange={(e) => setTankCapacity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="10000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Min Threshold</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={tankMinThreshold}
                    onChange={(e) => setTankMinThreshold(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="2000"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsTankModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                >
                  {editingTank ? "Save Changes" : "Create Tank"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pump Modal */}
      {isPumpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Fuel className="w-5 h-5 text-blue-600" />
                {editingPump ? "Edit Pump" : "Add New Pump"}
              </h2>
              <button 
                onClick={() => setIsPumpModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSavePump} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pump Name / ID</label>
                <input
                  type="text"
                  value={pumpName}
                  onChange={(e) => setPumpName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="e.g. Pump 1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Station</label>
                <select
                  value={pumpStationId}
                  onChange={(e) => setPumpStationId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                >
                  {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fuel Type</label>
                  <select
                    value={pumpFuelType}
                    onChange={(e) => setPumpFuelType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="diesel">Diesel</option>
                    <option value="gasoline">Gasoline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    value={pumpStatus}
                    onChange={(e) => setPumpStatus(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Link to Tank</label>
                <select
                  value={pumpTankId}
                  onChange={(e) => setPumpTankId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                >
                  {tanksList
                    .filter(t => t.fuelType === pumpFuelType && t.stationId === pumpStationId)
                    .map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                  {tanksList.filter(t => t.fuelType === pumpFuelType && t.stationId === pumpStationId).length === 0 && (
                    <option value="" disabled>No matching tanks found</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Reading Index</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={pumpIndex}
                  onChange={(e) => setPumpIndex(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="e.g. 15000"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsPumpModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                >
                  {editingPump ? "Save Changes" : "Create Pump"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}