-- AlterTable
ALTER TABLE "maintenances" ADD COLUMN     "driverId" TEXT;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
