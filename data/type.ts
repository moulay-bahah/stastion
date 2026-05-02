export type Price = {
  diesel: number;
  gasoline: number;
};

export type Station = {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  ownerId?: string; // ID of the Owner managing this station
};

export type Pump = {
  id: string;
  tank_id: string;
  stationId: string;
  index: number;
  name: string;
  fuelType: string; //"diesel" | "gasoline";
  status: string; //"active" | "maintenance";
  totalLitersToday: number;
};

export type Tank = {
  id: string;
  name: string;
  stationId: string;
  fuelType: string; //"diesel" | "gasoline";
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
  date: string;
  paymentEvidence: File[];
  costPerLiter: number;
  totalliter:number;
  fuelType: "diesel" | "gasoline";
  createdAt: string;
};

export type PumpReading = {
  id: string;
  date: string;
  sales: number;
  pumps : {
    pumpId: string;
    fuelType: "diesel" | "gasoline";
    index: number;
    totalLitersToday: number;
  }[];
};

export type Owner = {
  id: string;
  role: "owner";
  name: string;
  phone: string;
  stationIds: string[]; // Stations owned by this owner
  employeeIds: string[]; // Employees managed by this owner
};

export type Employee = {
  id: string;
  role: "employee";
  name: string;
  phone: string;
  ownerId: string; // The owner who manages this employee
  stationIds: string[]; // Stations where this employee works
};

export type User = Owner | Employee;

export type Expense = {
  id: string;
  date: string;
  category: "Salary" | "Maintenance" | "Electricity" | "Transport" | "Other";
  amount: number;
  description?: string;
  stationId: string;
};
