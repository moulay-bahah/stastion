import { PrismaClient } from '@prisma/client'
import { owners, stations, employees, tanks, pumps, price, pumpReadings, tankRefills } from '../data/data'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Clear existing data (optional, but good for a fresh start)
  // Order matters due to foreign key constraints
  await prisma.pumpReadingEntry.deleteMany({})
  await prisma.pumpReading.deleteMany({})
  await prisma.tankRefill.deleteMany({})
  await prisma.pump.deleteMany({})
  await prisma.tank.deleteMany({})
  await prisma.expense.deleteMany({})
  await prisma.station.deleteMany({})
  await prisma.employee.deleteMany({})
  await prisma.owner.deleteMany({})
  await prisma.price.deleteMany({})

  console.log('Cleared existing data.')

  // 2. Seed Owners
  for (const o of owners) {
    await prisma.owner.create({
      data: {
        id: o.id,
        name: o.name,
        phone: o.phone,
      },
    })
  }
  console.log(`Seeded ${owners.length} owners.`)

  // 3. Seed Employees
  const employeePhones = new Set()
  for (const e of employees) {
    let phone = e.phone
    if (employeePhones.has(phone)) {
      phone = `${phone}_${e.id}`
    }
    employeePhones.add(phone)

    await prisma.employee.create({
      data: {
        id: e.id,
        name: e.name,
        phone: phone,
        ownerId: e.ownerId,
      },
    })
  }
  console.log(`Seeded ${employees.length} employees.`)

  // 4. Seed Stations
  for (const s of stations) {
    await prisma.station.create({
      data: {
        id: s.id,
        name: s.name,
        location: s.location,
        isActive: s.isActive,
        // Map owners/employees if needed, though data.ts structure is slightly different
        // Assuming the first owner for simplicity if ownerId is missing in data.ts
        ownerId: owners[0]?.id, 
      },
    })
  }
  console.log(`Seeded ${stations.length} stations.`)

  // 5. Seed Tanks
  for (const t of tanks) {
    await prisma.tank.create({
      data: {
        id: t.id,
        name: t.name,
        fuelType: t.fuelType,
        capacity: t.capacity,
        currentLevel: t.currentLevel,
        minThreshold: t.minThreshold,
        lastRefillAt: new Date(t.lastRefillAt),
        stationId: t.stationId,
      },
    })
  }
  console.log(`Seeded ${tanks.length} tanks.`)

  // 6. Seed Pumps
  for (const p of pumps) {
    await prisma.pump.create({
      data: {
        id: p.id,
        name: p.name,
        fuelType: p.fuelType,
        status: p.status,
        index: p.index,
        totalLitersToday: p.totalLitersToday,
        stationId: p.stationId,
        tankId: p.tank_id, // Note the underscore in data.ts vs camelCase in prisma
      },
    })
  }
  console.log(`Seeded ${pumps.length} pumps.`)

  // 7. Seed Price
  await prisma.price.create({
    data: {
      id: 1,
      diesel: price.diesel,
      gasoline: price.gasoline,
    },
  })
  console.log('Seeded prices.')

  // 8. Seed Pump Readings and Entries
  for (const pr of pumpReadings) {
    const reading = await prisma.pumpReading.create({
      data: {
        id: pr.id,
        date: new Date(pr.date),
        sales: pr.sales,
      },
    })

    for (const entry of pr.pumps) {
      await prisma.pumpReadingEntry.create({
        data: {
          readingId: reading.id,
          pumpId: entry.pumpId,
          fuelType: entry.fuelType,
          index: entry.index,
          totalLitersToday: entry.totalLitersToday,
        },
      })
    }
  }
  console.log(`Seeded ${pumpReadings.length} daily readings.`)

  // 9. Seed Tank Refills
  for (const tr of tankRefills) {
    await prisma.tankRefill.create({
      data: {
        id: tr.id,
        amount: tr.amount,
        supplier: tr.supplier,
        date: new Date(tr.date),
        costPerLiter: tr.costPerLiter,
        totalliter: tr.totalliter,
        fuelType: tr.fuelType,
        createdAt: new Date(tr.createdAt),
        tankId: tr.tankId,
        // paymentEvidence is an array of strings in prisma, but File[] in type.ts
        // We'll leave it empty for now or just map to empty array
        paymentEvidence: [],
      },
    })
  }
  console.log(`Seeded ${tankRefills.length} tank refills.`)

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
