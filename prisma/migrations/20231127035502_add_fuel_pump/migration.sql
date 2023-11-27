/*
  Warnings:

  - Added the required column `fuelPumpId` to the `fuels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fuels" ADD COLUMN     "fuelPumpId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "fuelPumps" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "fuelPumps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fuels" ADD CONSTRAINT "fuels_fuelPumpId_fkey" FOREIGN KEY ("fuelPumpId") REFERENCES "fuelPumps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
