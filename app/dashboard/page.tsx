"use client";

import React, { useMemo, useState, useEffect } from "react";

// --- SVGs as simple inline components (No external dependencies) ---
const IconDroplet = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 13.5c0 5.385-4.365 9.75-9.75 9.75s-9.75-4.365-9.75-9.75c0-1.74.52-3.37 1.41-4.75 1.5-2.29 4.33-4.99 6.88-7.3a2.3 2.3 0 013.25-.01c2.46 2.22 5.25 4.88 6.75 7.15.84 1.3 1.25 2.89 1.25 4.54l-.04.37z" />
  </svg>
);

const IconDollar = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconAlertCircle = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const IconCheckCircle = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconAlertTriangle = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const IconLogout = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);

const IconPlus = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const IconChartBar = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const IconSettings = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);


// --- Reusable UI Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", className = "", ...props }: any) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 px-5 py-2.5 focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 px-5 py-2.5 focus:ring-gray-400",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100 px-3 py-2",
  };
  return (
    <button className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const AlertItem = ({ type, message, description }: { type: 'critical' | 'warning', message: string, description?: string }) => {
  const isCritical = type === 'critical';
  const Icon = isCritical ? IconAlertTriangle : IconAlertCircle;
  const bg = isCritical ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200';
  const textTitle = isCritical ? 'text-red-800' : 'text-yellow-800';
  const textDesc = isCritical ? 'text-red-600' : 'text-yellow-700';
  const iconColor = isCritical ? 'text-red-500' : 'text-yellow-500';

  return (
    <div className={`flex items-start p-4 border rounded-xl ${bg}`}>
      <div className="flex-shrink-0">
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="ml-3 w-full">
        <h3 className={`font-semibold text-sm ${textTitle}`}>{message}</h3>
        {description && <div className={`mt-1 text-sm ${textDesc}`}>{description}</div>}
      </div>
    </div>
  );
};

const ProgressBar = ({ current, max, colorClass }: { current: number, max: number, colorClass: string }) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  return (
    <div className="w-full bg-gray-100 rounded-full h-3.5 mb-1 overflow-hidden relative shadow-inner">
      <div 
        className={`h-3.5 rounded-full transition-all duration-700 ease-out ${colorClass}`} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// --- Main Dashboard Page ---

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Format date client-side to avoid hydration mismatch
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  // Mock Data
  const metrics = {
    fuelSold: 12450,
    expectedCash: 35240, // e.g. 12450L * avg price
    actualCash: 34100,
  };
  const cashDifference = metrics.actualCash - metrics.expectedCash;

  const tanks = [
    { id: 1, name: "Diesel", current: 16000, capacity: 20000 },
    { id: 2, name: "Petrol 95", current: 3500, capacity: 10000 },
    { id: 3, name: "Petrol 98", current: 1500, capacity: 10000 },
  ];

  const alerts = [
    { id: 1, type: "critical" as const, title: "Cash Mismatch Detected", desc: "Shortage of $1,140 based on shift readings." },
    { id: 2, type: "critical" as const, title: "Tank 3 Critically Low", desc: "Petrol 98 is at 15% capacity (1,500L)." },
    { id: 3, type: "warning" as const, title: "Missing Readings", desc: "Pump 4 flowmeter reading not submitted for Shift 1." },
  ];

  // Helper for tank status coloring
  const getTankStatus = (current: number, capacity: number) => {
    const ratio = current / capacity;
    if (ratio >= 0.5) return { colorClass: "bg-green-500", textClass: "text-green-600", status: "Healthy" };
    if (ratio > 0.2) return { colorClass: "bg-yellow-400", textClass: "text-yellow-600", status: "Low" };
    return { colorClass: "bg-red-500", textClass: "text-red-600", status: "Critical" };
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
              <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-2">
                Today's Overview
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="hidden sm:inline text-gray-600 font-normal">{currentDate}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 mr-2">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 leading-none">Ahmed Station</p>
                  <p className="text-xs text-gray-500 mt-1">Manager</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  AS
                </div>
              </div>
              <Button variant="ghost" className="!px-2" aria-label="Logout">
                <IconLogout className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Controls / Quick Actions for Mobile could go here, but let's put them in a section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Operational Metrics</h2>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Button variant="secondary" className="flex-1 sm:flex-none gap-2">
              <IconSettings className="w-4 h-4" />
              Manage Pumps
            </Button>
            <Button variant="secondary" className="flex-1 sm:flex-none gap-2">
              <IconChartBar className="w-4 h-4" />
              View Reports
            </Button>
            <Button variant="primary" className="flex-1 sm:flex-none gap-2 w-full sm:w-auto">
              <IconPlus className="w-4 h-4" />
              Add Daily Readings
            </Button>
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <IconDroplet className="w-24 h-24 text-blue-500 -mt-6 -mr-6" />
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <IconDroplet className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-gray-600">Total Fuel Sold</h3>
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-bold text-gray-900">{metrics.fuelSold.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-500 mt-2">Liters today</p>
            </div>
          </Card>

          <Card className="relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
              <IconDollar className="w-24 h-24 text-gray-500 -mt-6 -mr-6" />
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 bg-gray-100 text-gray-600 rounded-xl">
                <IconDollar className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-gray-600">Expected Cash</h3>
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-bold text-gray-900">${metrics.expectedCash.toLocaleString()}</p>
              <p className="text-sm font-medium text-gray-500 mt-2">Based on system calculations</p>
            </div>
          </Card>

          <Card className={`relative overflow-hidden border-l-4 ${cashDifference === 0 ? 'border-l-green-500 bg-green-50/30' : 'border-l-red-500 bg-red-50/30'}`}>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className={`p-3 rounded-xl ${cashDifference === 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600 animate-pulse'}`}>
                {cashDifference === 0 ? <IconCheckCircle className="w-6 h-6" /> : <IconAlertTriangle className="w-6 h-6" />}
              </div>
              <h3 className={`font-semibold ${cashDifference === 0 ? 'text-green-800' : 'text-red-800'}`}>Cash Difference</h3>
            </div>
            <div className="relative z-10">
              <p className={`text-4xl font-bold ${cashDifference === 0 ? 'text-green-600' : 'text-red-600'}`}>
                {cashDifference > 0 ? '+' : ''}{cashDifference.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </p>
              <p className={`text-sm font-medium mt-2 ${cashDifference === 0 ? 'text-green-700/70' : 'text-red-700/70'}`}>
                {cashDifference === 0 ? 'All cash accounted for' : 'Discrepancy detected! Immediate review required.'}
              </p>
            </div>
          </Card>

        </div>

        {/* Lower Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tanks Status */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-gray-800">Tanks Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tanks.map((tank) => {
                const statusInfo = getTankStatus(tank.current, tank.capacity);
                const perc = Math.round((tank.current / tank.capacity) * 100);
                
                return (
                  <Card key={tank.id} className="flex flex-col h-full !p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-800">{tank.name}</h4>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${statusInfo.colorClass.replace('bg-', 'bg-').replace('500', '100')} ${statusInfo.textClass}`}>
                        {perc}%
                      </span>
                    </div>
                    
                    <div className="mt-auto">
                      <ProgressBar 
                        current={tank.current} 
                        max={tank.capacity} 
                        colorClass={statusInfo.colorClass} 
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                        <span>{tank.current.toLocaleString()} L</span>
                        <span>{tank.capacity.toLocaleString()} L</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Alerts Sidebar */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Action Required
              <span className="bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs font-bold">{alerts.length}</span>
            </h2>
            
            <Card className="flex flex-col gap-4 !p-5 bg-white/50 backdrop-blur-sm border-gray-100 shadow-sm">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <AlertItem 
                    key={alert.id}
                    type={alert.type}
                    message={alert.title}
                    description={alert.desc}
                  />
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 flex flex-col items-center gap-3">
                  <IconCheckCircle className="w-10 h-10 text-green-400 opacity-50" />
                  <p className="text-sm font-medium">All systems normal. No active alerts.</p>
                </div>
              )}
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
