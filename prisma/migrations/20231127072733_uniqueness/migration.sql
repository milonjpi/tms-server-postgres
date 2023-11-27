/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `equipmentTitles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `uom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "equipmentTitles_label_key" ON "equipmentTitles"("label");

-- CreateIndex
CREATE UNIQUE INDEX "uom_label_key" ON "uom"("label");
