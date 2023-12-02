-- CreateEnum
CREATE TYPE "PaperType" AS ENUM ('Registration', 'Tax', 'Fitness', 'Route');

-- CreateTable
CREATE TABLE "paperWorks" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "certificateNo" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "daysToRemind" TIMESTAMP(3),
    "odoMeter" TEXT NOT NULL,
    "paperType" "PaperType" NOT NULL,
    "fee" INTEGER NOT NULL,
    "otherAmount" INTEGER,
    "totalAmount" INTEGER NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paperWorks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "paperWorks" ADD CONSTRAINT "paperWorks_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
