import { 
  Droplet, 
  AlertCircle, 
  DollarSign} from "lucide-react";
import { price, tanks } from "@/data/data";
import { pumpReadings } from "@/data/data";

export default function SummaryCards() {
  const dieselsold = 4280;
  const gasolineSold = 4280;
  const totalSales = dieselsold * price.diesel + gasolineSold * price.gasoline;
  const alerts = tanks.filter((tank) => tank.currentLevel < tank.minThreshold).length;

  // ------------------------- calculate sales change ------------------------- 
  const todayDieselliter = pumpReadings[pumpReadings.length - 1].pumps.filter((pump) => pump.fuelType === "diesel").reduce((acc, pump) => acc + pump.totalLitersToday, 0);
  const yesterdayDieselliter = pumpReadings[pumpReadings.length - 2].pumps.filter((pump) => pump.fuelType === "diesel").reduce((acc, pump) => acc + pump.totalLitersToday, 0);
  const todayGasolineliter = pumpReadings[pumpReadings.length - 1].pumps.filter((pump) => pump.fuelType === "gasoline").reduce((acc, pump) => acc + pump.totalLitersToday, 0);
  const yesterdayGasolineliter = pumpReadings[pumpReadings.length - 2].pumps.filter((pump) => pump.fuelType === "gasoline").reduce((acc, pump) => acc + pump.totalLitersToday, 0);
  const dieselChange = Math.round((todayDieselliter - yesterdayDieselliter) / yesterdayDieselliter * 100);
  const gasolineChange = Math.round((todayGasolineliter - yesterdayGasolineliter) / yesterdayGasolineliter * 100);
  const totalSalesChange = Math.round((todayDieselliter*price.diesel + todayGasolineliter*price.gasoline - yesterdayDieselliter*price.diesel - yesterdayGasolineliter*price.gasoline) / (yesterdayDieselliter*price.diesel + yesterdayGasolineliter*price.gasoline) * 100);
  // ------------------------- calculate sales change ------------------------- 

  const data = [
    {
      title: "Total Sales",
      value: totalSales + " MRU",
      change: Math.abs(totalSalesChange) + "%",
      changeType: totalSalesChange > 0 ? "positive" : "negative",
      icon: DollarSign,
      color: "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Fuel Sold (diesel)",
      value: dieselsold + " L",
      change: Math.abs(dieselChange) + "%",
      changeType: dieselChange > 0 ? "positive" : "negative",
      icon: Droplet,
      color: "bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Fuel Sold (gasoline)",
      value: gasolineSold + " L",
      change: Math.abs(gasolineChange)  + "%",
      changeType: gasolineChange > 0 ? "positive" : "negative",
      icon: Droplet,
      color: "bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Alerts",
      value: alerts,
      change:  alerts + " tank Low Level",
      changeType: alerts > 0 ? "negative" : "positive",
      icon: AlertCircle,
      color: "bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <div key={index} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{item.value}</h3>
            </div>
            <div className={`p-2 ${item.color} rounded-xl`}>
              <item.icon className="w-5 h-5" />
            </div>
          </div>
          <div className={`mt-4 text-sm font-medium flex items-center gap-1 ${item.changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {item.change}
          </div>
        </div>
      ))}
    </div>
  );
}
