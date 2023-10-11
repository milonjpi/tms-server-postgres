/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `VehicleModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Brand_label_key" ON "Brand"("label");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModel_label_key" ON "VehicleModel"("label");
