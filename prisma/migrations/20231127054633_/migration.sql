/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `fuelTypes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fuelTypes_label_key" ON "fuelTypes"("label");
