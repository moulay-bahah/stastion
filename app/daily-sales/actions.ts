"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export async function submitDailyReading(newReading: any) {
  try {
    const dataPath = path.join(process.cwd(), "data", "data.ts");
    const content = await fs.readFile(dataPath, "utf-8");

    const newReadingStr = `  {
    id: "${newReading.id}",
    date: "${newReading.date}",
    sales: ${newReading.sales},
    pumps : [
      ${newReading.pumps.map((p: any) => `      {
        pumpId: "${p.pumpId}",
        fuelType: "${p.fuelType}",
        index: ${p.index},
        totalLitersToday: ${p.totalLitersToday},
      }`).join(",\n")}
    ]
  }`;

    const newContent = content.replace(
      /\];[\s\r\n]*export const price/,
      `${newReadingStr},\n];\n\nexport const price`
    );

    if (newContent === content) {
      throw new Error("Could not find the insertion point for pumpReadings in data.ts");
    }

    await fs.writeFile(dataPath, newContent, "utf-8");
    
    // Revalidate the dashboard explicitly so the new data appears immediately
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit daily reading:", error);
    return { success: false, error: error.message };
  }
}
