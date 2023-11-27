-- DropForeignKey
ALTER TABLE "fuels" DROP CONSTRAINT "fuels_fuelPumpId_fkey";

-- AlterTable
ALTER TABLE "fuels" ALTER COLUMN "fuelPumpId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "fuels" ADD CONSTRAINT "fuels_fuelPumpId_fkey" FOREIGN KEY ("fuelPumpId") REFERENCES "fuelPumps"("id") ON DELETE SET NULL ON UPDATE CASCADE;
