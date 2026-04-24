# Project Overview: Fuel Station Dashboard

## What is this project?
This project is a web-based dashboard application designed for managing and monitoring a fuel station. It provides a centralized interface to track daily fuel sales, monitor tank inventory levels, and manage station hardware (pumps and tanks).

## Key Technologies Used
- **Framework**: [Next.js 16](https://nextjs.org/) (React framework) - Utilizing the modern App Router (`app/` directory).
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) for utility-first, responsive design.
- **Icons**: `lucide-react` for consistent SVG iconography.
- **Charts**: `recharts` for rendering data visualizations (e.g., sales trends).
- **Package Manager**: `bun` (as indicated by the `bun.lock` file and user constraints).
- **Language**: TypeScript (`.ts` and `.tsx` files) for type safety.

## Core Features & Functionality
1. **Main Dashboard (`app/page.tsx`)**:
   - **Summary Cards**: Displays key operational metrics at a glance (e.g., total sales, liters sold).
   - **Sales Chart**: A visual graph representation of sales data trends over time.
   - **Pumps Status (`PumpsTable.tsx`)**: A table showing the current status, fuel type, and daily liters sold for all fuel pumps.
   - **Tanks Status (`tanksTable.tsx`)**: A table monitoring the fuel levels, capacity, and status of underground storage tanks.

2. **Daily Sales / Pump Readings (`app/daily-sales/page.tsx`)**:
   - A dedicated form interface for staff to input the daily meter index reading of each pump.
   - Automatically calculates the liters sold today by comparing the newly entered index with the previous recorded reading.
   - Computes the estimated total revenue dynamically based on current fuel prices (`diesel` and `gasoline`).

3. **Data Models & State (`data/type.ts` & `data/data.ts`)**:
   - Contains the core TypeScript interfaces defining the business logic:
     - `Station`: General station information.
     - `Pump`: Tracks fuel type, status, and indices.
     - `Tank` & `TankRefill`: Tracks fuel capacity, current levels, and refill history.
     - `PumpReading`: Daily logs of pump indices and calculated sales.
     - `User` (`Owner`, `Employee`): Role-based access and management.
   - Currently uses a localized data file (`data.ts`) to simulate a database.

4. **Navigation & Layout (`components/Sidebar.tsx` & `app/layout.tsx`)**:
   - A responsive sidebar with navigation links to Dashboard, Daily Sales, Reports, Staff, and Settings.
   - Built to work seamlessly on both mobile devices and desktop screens.

## Project File Structure
- `/app/`: Contains the Next.js page routes (Dashboard, Login, Settings, Daily Sales).
- `/components/`: Contains all modular React components used across pages (Charts, Tables, Sidebar, Header, etc.).
- `/data/`: Contains TypeScript type definitions (`type.ts`) and mock data/state (`data.ts`).
- `/public/`: For static assets like images and favicons.

## Primary Use Case
This application is intended to be used by **fuel station owners and employees** to:
1. **Digitize Operations**: Replace manual paper logs for daily pump readings with an automated digital calculation.
2. **Inventory Management**: Keep a close eye on underground fuel tanks to know when a refill is required.
3. **Financial Tracking**: Monitor daily, weekly, or monthly sales and total revenue.
4. **Administration**: Manage station locations, active pumps, and staff roles.

---
*Note: This file was automatically generated as a reference guide for the project's architecture and purpose.*
