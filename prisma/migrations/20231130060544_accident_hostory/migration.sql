-- CreateEnum
CREATE TYPE "AccidentAmountStatus" AS ENUM ('Paid', 'Received');

-- CreateTable
CREATE TABLE "accidentHistories" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "amountStatus" "AccidentAmountStatus" NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "odoMeter" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accidentHistories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accidentHistories" ADD CONSTRAINT "accidentHistories_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accidentHistories" ADD CONSTRAINT "accidentHistories_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
