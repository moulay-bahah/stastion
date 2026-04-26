import { Station, Pump, Tank, TankRefill, PumpReading, Price, Owner, Employee } from "./type";


export const pumpReadings: PumpReading[] = [
  {
    id: "r_001",
    date: "2026-04-15",
    sales: 0,
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
    sales: 500 * 1000 + 600 * 1000 + 500 * 1000,
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
    sales: 500 * (14500 - 13000) + 600 * (10000 - 9000) + 500 * (14500 - 13000),
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
    sales: 500 * (16000 - 14500) + 600 * (11000 - 10000) + 500 * (16300 - 14500),
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
    sales: 500 * (17500 - 16000) + 600 * (12500 - 11000) + 500 * (17800 - 16300),
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
    sales: 500 * (19000 - 17500) + 600 * (14000 - 12500) + 500 * (19300 - 17800),
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
    sales: 500 * (20000 - 19000) + 600 * (15000 - 14000) + 500 * (20000 - 19300),
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
  {
    id: "r_008",
    date: "2026-04-22",
    sales: 500 * (21000 - 20000) + 600 * (18001 - 15000) + 500 * (25001 - 20000),
    pumps : [
            {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 21000,
        totalLitersToday: 1000,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 18001,
        totalLitersToday: 3001,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 25001,
        totalLitersToday: 5001,
      }
    ]
  },
  {
    id: "r_009",
    date: "2026-04-23",
    sales: 500 * (21001 - 21000) + 600 * (18002 - 18001) + 500 * (25002 - 25001),
    pumps : [
            {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 21001,
        totalLitersToday: 1,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 18002,
        totalLitersToday: 1,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 25002,
        totalLitersToday: 1,
      }
    ]
  },
  {
    id: "r_010",
    date: "2026-04-24",
    sales: 500 * (21002 - 21001) + 600 * (18002 - 18002) + 500 * (25002 - 25002),
    pumps : [
            {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 21002,
        totalLitersToday: 1,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 18002,
        totalLitersToday: 0,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 25002,
        totalLitersToday: 0,
      }
    ]
  },
  {
    id: "r_011",
    date: "2026-04-25",
    sales: 1600,
    pumps : [
            {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 21003,
        totalLitersToday: 1,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 18003,
        totalLitersToday: 1,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 25003,
        totalLitersToday: 1,
      }
    ]
  },
  {
    id: "r_012",
    date: "2026-04-26",
    sales: 3100,
    pumps : [
            {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 21008,
        totalLitersToday: 5,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 18004,
        totalLitersToday: 1,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 25003,
        totalLitersToday: 0,
      }
    ]
  },
  {
    id: "r_013",
    date: "2026-04-27",
    sales: 10200,
    pumps : [
            {
        pumpId: "pump_001",
        fuelType: "diesel",
        index: 21012,
        totalLitersToday: 4,
      },
      {
        pumpId: "pump_002",
        fuelType: "gasoline",
        index: 18016,
        totalLitersToday: 12,
      },
      {
        pumpId: "pump_003",
        fuelType: "diesel",
        index: 25005,
        totalLitersToday: 2,
      }
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
    name: "Diesel Main Tank",
    stationId: "st_001",
    fuelType: "diesel",
    capacity: 10000, // باللتر
    currentLevel: 1500,
    minThreshold: 2000, // تنبيه عند النزول
    lastRefillAt: "2026-04-14T18:00:00Z",
  },
  {
    id: "tank_002",
    name: "Gasoline Main Tank",
    stationId: "st_001",
    fuelType: "gasoline",
    capacity: 8000,
    currentLevel: 3000,
    minThreshold: 1500,
    lastRefillAt: "2026-04-13T12:00:00Z",
  },
  {
    id: "tank_003",
    name: "Diesel Secondary Tank",
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
    totalliter: 4000,
    fuelType: "diesel",
    costPerLiter: 400,
    createdAt: "2026-04-14T18:00:00Z",
    paymentEvidence: [],
    date: "2026-04-14",
  },
  {
    id: "refill_002",
    tankId: "tank_002",
    amount: 3000,
    supplier: "Local Supplier",
    date: "2026-04-13",
    totalliter: 3000,
    fuelType: "gasoline",
    costPerLiter: 500,
    createdAt: "2026-04-13T12:00:00Z",
    paymentEvidence: [],
  },
];


export const owners: Owner[] = [
  {
    id: "owner_001",
    role: "owner",
    name: "Owner 1",
    phone: "32347872",
    stationIds: ["st_001", "st_002"],
    employeeIds: ["employee_001", "employee_002"],
  },
];

export const employees: Employee[] = [
  {
    id: "employee_001",
    role: "employee",
    name: "Employee 1",
    phone: "123456789",
    ownerId: "owner_001",
    stationIds: ["st_001"],
  },
  {
    id: "employee_002",
    role: "employee",
    name: "Employee 2",
    phone: "123456789",
    ownerId: "owner_001",
    stationIds: ["st_001", "st_002"],
  },
];
