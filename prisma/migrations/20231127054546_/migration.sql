/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `fuelPumps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fuelPumps_label_key" ON "fuelPumps"("label");
