/*
  Warnings:

  - You are about to drop the `Accessory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseHead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseTitle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubMenuPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseHead" DROP CONSTRAINT "ExpenseHead_expenseTitleId_fkey";

-- DropForeignKey
ALTER TABLE "MenuPermission" DROP CONSTRAINT "MenuPermission_userId_fkey";

-- DropForeignKey
ALTER TABLE "SectionPermission" DROP CONSTRAINT "SectionPermission_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubMenuPermission" DROP CONSTRAINT "SubMenuPermission_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_partyId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_driverId_fkey";

-- DropTable
DROP TABLE "Accessory";

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "Driver";

-- DropTable
DROP TABLE "ExpenseHead";

-- DropTable
DROP TABLE "ExpenseTitle";

-- DropTable
DROP TABLE "MenuPermission";

-- DropTable
DROP TABLE "Party";

-- DropTable
DROP TABLE "SectionPermission";

-- DropTable
DROP TABLE "SubMenuPermission";

-- DropTable
DROP TABLE "Trip";

-- DropTable
DROP TABLE "Vehicle";

-- DropTable
DROP TABLE "VehicleModel";

-- CreateTable
CREATE TABLE "menuPermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menuPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subMenuPermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subMenuPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectionPermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sectionPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "regNo" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT,
    "vehicleValue" INTEGER,
    "driverId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "distance" INTEGER,
    "tripValue" INTEGER NOT NULL,
    "costing" BOOLEAN NOT NULL DEFAULT false,
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tripExpenses" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "expenseHeadId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tripExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenseTitles" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenseTitles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenseHeads" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "expenseTitleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenseHeads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accessories" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accessories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_label_key" ON "brands"("label");

-- CreateIndex
CREATE UNIQUE INDEX "models_label_key" ON "models"("label");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_driverId_key" ON "drivers"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vehicleId_key" ON "vehicles"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_regNo_key" ON "vehicles"("regNo");

-- CreateIndex
CREATE UNIQUE INDEX "parties_partyId_key" ON "parties"("partyId");

-- CreateIndex
CREATE UNIQUE INDEX "trips_tripId_key" ON "trips"("tripId");

-- AddForeignKey
ALTER TABLE "menuPermissions" ADD CONSTRAINT "menuPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subMenuPermissions" ADD CONSTRAINT "subMenuPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sectionPermissions" ADD CONSTRAINT "sectionPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tripExpenses" ADD CONSTRAINT "tripExpenses_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tripExpenses" ADD CONSTRAINT "tripExpenses_expenseHeadId_fkey" FOREIGN KEY ("expenseHeadId") REFERENCES "expenseHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenseHeads" ADD CONSTRAINT "expenseHeads_expenseTitleId_fkey" FOREIGN KEY ("expenseTitleId") REFERENCES "expenseTitles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
