/*
  Warnings:

  - You are about to drop the column `createdAt` on the `fuelTypes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `fuelTypes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `uoms` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `uoms` table. All the data in the column will be lost.
  - You are about to drop the `Fuel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fuel" DROP CONSTRAINT "Fuel_fuelTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Fuel" DROP CONSTRAINT "Fuel_uomId_fkey";

-- DropForeignKey
ALTER TABLE "Fuel" DROP CONSTRAINT "Fuel_vehicleId_fkey";

-- AlterTable
ALTER TABLE "fuelTypes" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "uoms" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Fuel";

-- CreateTable
CREATE TABLE "fuels" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fuelTypeId" TEXT NOT NULL,
    "uomId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT,
    "expenseHeadId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paperTypes" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "paperTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paperWorks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "notifyDate" TIMESTAMP(3),
    "amount" INTEGER NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paperWorks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fuels" ADD CONSTRAINT "fuels_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuels" ADD CONSTRAINT "fuels_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "fuelTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fuels" ADD CONSTRAINT "fuels_uomId_fkey" FOREIGN KEY ("uomId") REFERENCES "uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_expenseHeadId_fkey" FOREIGN KEY ("expenseHeadId") REFERENCES "expenseHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paperWorks" ADD CONSTRAINT "paperWorks_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
