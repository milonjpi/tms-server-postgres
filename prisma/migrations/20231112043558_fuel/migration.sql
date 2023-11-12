-- CreateTable
CREATE TABLE "fuelTypes" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuelTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uoms" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fuel" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fuelTypeId" TEXT NOT NULL,
    "uomId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "remarks" TEXT,

    CONSTRAINT "Fuel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fuel" ADD CONSTRAINT "Fuel_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fuel" ADD CONSTRAINT "Fuel_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "fuelTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fuel" ADD CONSTRAINT "Fuel_uomId_fkey" FOREIGN KEY ("uomId") REFERENCES "uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
