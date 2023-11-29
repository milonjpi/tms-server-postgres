/*
  Warnings:

  - You are about to drop the column `fuelId` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `maintenanceId` on the `expenses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_fuelId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_maintenanceId_fkey";

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "fuelId",
DROP COLUMN "maintenanceId";

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "remarks" TEXT;
