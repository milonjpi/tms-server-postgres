-- DropForeignKey
ALTER TABLE "fuels" DROP CONSTRAINT "fuels_driverId_fkey";

-- AlterTable
ALTER TABLE "fuels" ALTER COLUMN "driverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "fuels" ADD CONSTRAINT "fuels_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
