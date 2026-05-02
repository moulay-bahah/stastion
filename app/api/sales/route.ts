import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET /api/sales
 * Fetches all daily pump readings, including detailed pump entries.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeMeta = searchParams.get("meta") === "true";

  try {
    const readings = await prisma.pumpReading.findMany({
      include: {
        entries: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    // Format readings to match the frontend expectations (entries -> pumps)
    const formattedReadings = readings.map((r) => ({
      ...r,
      date: r.date.toISOString().split("T")[0],
      pumps: r.entries.map((e) => ({
        pumpId: e.pumpId,
        fuelType: e.fuelType,
        index: e.index,
        totalLitersToday: e.totalLitersToday,
      })),
    }));

    if (includeMeta) {
      const pumps = await prisma.pump.findMany();
      const priceRecord = await prisma.price.findFirst();
      const price = priceRecord || { diesel: 0, gasoline: 0 };
      return NextResponse.json({ readings: formattedReadings, pumps, price });
    }

    return NextResponse.json(formattedReadings);
  } catch (error: any) {
    console.error("Error fetching sales:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sales
 * Records a new daily reading and updates corresponding pump indices and tank levels.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, sales, pumps } = body;

    if (!date || sales === undefined || !Array.isArray(pumps)) {
      return NextResponse.json(
        { error: "Missing required fields: date, sales, or pumps" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the main PumpReading record
      const reading = await tx.pumpReading.create({
        data: {
          date: new Date(date),
          sales: parseFloat(sales),
        },
      });

      // 2. Process each pump entry
      for (const p of pumps) {
        // Create the individual reading entry
        await tx.pumpReadingEntry.create({
          data: {
            readingId: reading.id,
            pumpId: p.pumpId,
            fuelType: p.fuelType,
            index: parseInt(p.index),
            totalLitersToday: parseFloat(p.totalLitersToday),
          },
        });

        // Update the Pump's current index and today's total
        const updatedPump = await tx.pump.update({
          where: { id: p.pumpId },
          data: {
            index: parseInt(p.index),
            totalLitersToday: parseFloat(p.totalLitersToday),
          },
          select: { tankId: true },
        });

        // Update the associated Tank's current level
        if (updatedPump.tankId) {
          await tx.tank.update({
            where: { id: updatedPump.tankId },
            data: {
              currentLevel: {
                decrement: parseFloat(p.totalLitersToday),
              },
            },
          });
        }
      }

      return reading;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Error recording sales:", error);
    return NextResponse.json(
      { error: "Failed to record sales data: " + error.message },
      { status: 500 }
    );
  }
}
