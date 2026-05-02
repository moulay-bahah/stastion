"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitDailyReading(newReading: any) {
  try {
    const { date, sales, pumps } = newReading;

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

    // Revalidate the dashboard and the daily-sales page
    revalidatePath("/");
    revalidatePath("/daily-sales");
    
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Failed to submit daily reading:", error);
    return { success: false, error: error.message };
  }
}
