/*
  Warnings:

  - You are about to drop the column `isActive` on the `expenseHeads` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `expenseHeads` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `uomId` on the `fuels` table. All the data in the column will be lost.
  - You are about to drop the column `costing` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the `accessories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paperTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paperWorks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tripExpenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `uoms` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accountHeadId` to the `expenseHeads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remarks` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverId` to the `fuels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `odoMeter` to the `fuels` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Workshop" AS ENUM ('InHouse', 'External', 'Others');

-- CreateEnum
CREATE TYPE "MaintenanceType" AS ENUM ('Scheduled', 'UnScheduled', 'Accidental', 'Others');

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "fuels" DROP CONSTRAINT "fuels_uomId_fkey";

-- DropForeignKey
ALTER TABLE "paperWorks" DROP CONSTRAINT "paperWorks_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "tripExpenses" DROP CONSTRAINT "tripExpenses_expenseHeadId_fkey";

-- DropForeignKey
ALTER TABLE "tripExpenses" DROP CONSTRAINT "tripExpenses_tripId_fkey";

-- AlterTable
ALTER TABLE "expenseHeads" DROP COLUMN "isActive",
DROP COLUMN "type",
ADD COLUMN     "accountHeadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "description",
DROP COLUMN "vehicleId",
ADD COLUMN     "fuelId" TEXT,
ADD COLUMN     "maintenanceId" TEXT,
ADD COLUMN     "remarks" TEXT NOT NULL,
ADD COLUMN     "tripId" TEXT;

-- AlterTable
ALTER TABLE "fuels" DROP COLUMN "uomId",
ADD COLUMN     "driverId" TEXT NOT NULL,
ADD COLUMN     "odoMeter" INTEGER NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "parties" ALTER COLUMN "mobile" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "costing";

-- DropTable
DROP TABLE "accessories";

-- DropTable
DROP TABLE "paperTypes";

-- DropTable
DROP TABLE "paperWorks";

-- DropTable
DROP TABLE "tripExpenses";

-- DropTable
DROP TABLE "uoms";

-- DropEnum
DROP TYPE "CostTitle";

-- DropEnum
DROP TYPE "TripStatus";

-- CreateTable
CREATE TABLE "accountHeads" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "isIncome" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accountHeads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomeHeads" (
    "id" TEXT NOT NULL,
    "accountHeadId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incomeHeads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomes" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "tripId" TEXT,
    "incomeHeadId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenances" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "odoMeter" INTEGER,
    "workshopType" "Workshop" NOT NULL,
    "maintenanceType" "MaintenanceType" NOT NULL,
    "serviceCharge" INTEGER NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipmentTitles" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipmentTitles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "id" TEXT NOT NULL,
    "equipmentTitleId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipmentUses" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "maintenanceId" TEXT NOT NULL,
    "equipmentTitleId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipmentUses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accountHeads_label_key" ON "accountHeads"("label");

-- CreateIndex
CREATE UNIQUE INDEX "incomeHeads_label_key" ON "incomeHeads"("label");

-- AddForeignKey
ALTER TABLE "incomeHeads" ADD CONSTRAINT "incomeHeads_accountHeadId_fkey" FOREIGN KEY ("accountHeadId") REFERENCES "accountHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenseHeads" ADD CONSTRAINT "expenseHeads_accountHeadId_fkey" FOREIGN KEY ("accountHeadId") REFERENCES "accountHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_incomeHeadId_fkey" FOREIGN KEY ("incomeHeadId") REFERENCES "incomeHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_fuelId_fkey" FOREIGN KEY ("fuelId") REFERENCES "fuels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuels" ADD CONSTRAINT "fuels_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_equipmentTitleId_fkey" FOREIGN KEY ("equipmentTitleId") REFERENCES "equipmentTitles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipmentUses" ADD CONSTRAINT "equipmentUses_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipmentUses" ADD CONSTRAINT "equipmentUses_equipmentTitleId_fkey" FOREIGN KEY ("equipmentTitleId") REFERENCES "equipmentTitles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
