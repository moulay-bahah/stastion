import { Station, Pump, Tank, TankRefill, PumpReading, Price } from "./type";


export const pumpReadings: PumpReading[] = [
  {
    id: "r_001",
    date: "2026-04-15",
    pumps : [
      {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 12000,
        totalLitersToday: 0,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 8000,
        totalLitersToday: 0,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 12000,
        totalLitersToday: 0,
      },
    ]
  },
  {
    id: "r_002",
    date: "2026-04-16",
    pumps : [
      {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 13000,
        totalLitersToday: 1000,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 9000,
        totalLitersToday: 1000,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 13000,
        totalLitersToday: 1000,
      },
    ]
  },
  {
    id: "r_003",
    date: "2026-04-17",
    pumps : [
      {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 14500,
        totalLitersToday: 14500 - 13000,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 10000,
        totalLitersToday: 10000 - 9000,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 14500,
        totalLitersToday: 14500 - 13000,
      },
    ]
  },
  {
    id: "r_004",
    date: "2026-04-18",
    pumps : [
      {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 16000,
        totalLitersToday: 16000 - 14500,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 11000,
        totalLitersToday: 11000 - 10000,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 16300,
        totalLitersToday: 16300 - 14500,
      },
    ]
  },
  {
    id: "r_005",
    date: "2026-04-19",
    pumps : [
      {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 17500,
        totalLitersToday: 17500 - 16000,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 12500,
        totalLitersToday: 12500 - 11000,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 17800,
        totalLitersToday: 17800 - 16300,
      },
    ]
  },
  {
    id: "r_006",
    date: "2026-04-20",
    pumps : [
      {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 19000,
        totalLitersToday: 19000 - 17500,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 14000,
        totalLitersToday: 14000 - 12500,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 19300,
        totalLitersToday: 19300 - 17800,
      },
    ]
  },
  {
    id: "r_007",
    date: "2026-04-21",
    pumps : [
      {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 20000,
        totalLitersToday: 20000 - 19000,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 15000,
        totalLitersToday: 15000 - 14000,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 20000,
        totalLitersToday: 20000 - 19300,
      },
    ]
  },
];

export const price: Price = {
  diesel: 500,
  gasoline: 600,
};

export const stations: Station[] = [
  {
    id: "st_001",
    name: "Station A",
    location: "Nouakchott",
    isActive: true,
  },
  {
    id: "st_002",
    name: "Station B",
    location: "Nouakchott Nord",
    isActive: true,
  },
];


export const pumps: Pump[] = [
  {
    id: "pump_001",
    tank_id: "tank_001",
    stationId: "st_001",
    index: pumpReadings[pumpReadings.length - 1].pumps.find((pump) => pump.pumpId === "pump_001")?.index || 0,
    name: "Pump 1",
    fuelType: "diesel",
    status: "active", // active  maintenance
    totalLitersToday: 320,
  },
  {
    id: "pump_002",
    tank_id: "tank_002",
    stationId: "st_001",
    index: pumpReadings[pumpReadings.length - 1].pumps.find((pump) => pump.pumpId === "pump_002")?.index || 0,
    name: "Pump 2",
    fuelType: "gasoline",
    status: "maintenance",
    totalLitersToday: 150,
  },
  {
    id: "pump_003",
    tank_id: "tank_003",
    stationId: "st_002",
    index: pumpReadings[pumpReadings.length - 1].pumps.find((pump) => pump.pumpId === "pump_003")?.index || 0,
    name: "Pump 1",
    fuelType: "diesel",
    status: "active",
    totalLitersToday: 500,
  },
];

export const tanks: Tank[] = [
  {
    id: "tank_001",
    stationId: "st_001",
    fuelType: "diesel",
    capacity: 10000, // باللتر
    currentLevel: 1500,
    minThreshold: 2000, // تنبيه عند النزول
    lastRefillAt: "2026-04-14T18:00:00Z",
  },
  {
    id: "tank_002",
    stationId: "st_001",
    fuelType: "gasoline",
    capacity: 8000,
    currentLevel: 3000,
    minThreshold: 1500,
    lastRefillAt: "2026-04-13T12:00:00Z",
  },
  {
    id: "tank_003",
    stationId: "st_002",
    fuelType: "diesel",
    capacity: 12000,
    currentLevel: 9000,
    minThreshold: 2500,
    lastRefillAt: "2026-04-15T06:00:00Z",
  },
];


export const tankRefills: TankRefill[] = [
  {
    id: "refill_001",
    tankId: "tank_001",
    amount: 4000,
    supplier: "Total Supplier",
    cost: 4800,
    createdAt: "2026-04-14T18:00:00Z",
  },
  {
    id: "refill_002",
    tankId: "tank_002",
    amount: 3000,
    supplier: "Local Supplier",
    cost: 3900,
    createdAt: "2026-04-13T12:00:00Z",
  },
];
