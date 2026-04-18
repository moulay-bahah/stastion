export type Price = {
  diesel: number;
  gasoline: number;
};

export type Station = {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
};

export type Pump = {
  id: string;
  tank_id: string;
  stationId: string;
  index: number;
  name: string;
  fuelType: "diesel" | "gasoline";
  status: "active" | "maintenance";
  totalLitersToday: number;
};

export type Tank = {
  id: string;
  stationId: string;
  fuelType: "diesel" | "gasoline";
  capacity: number;
  currentLevel: number;
  minThreshold: number;
  lastRefillAt: string;
};

export type TankRefill = {
  id: string;
  tankId: string;
  amount: number;
  supplier: string;
  cost: number;
  createdAt: string;
};

export type PumpReading = {
  id: string;
  date: string;
  pumps : {
    pumpId: string;
    fuelType: "diesel" | "gasoline";
    index: number;
    totalLitersToday: number;
  }[];
};
