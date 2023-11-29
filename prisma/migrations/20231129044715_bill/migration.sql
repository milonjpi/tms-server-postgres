/*
  Warnings:

  - A unique constraint covering the columns `[billNo]` on the table `maintenances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billNo` to the `maintenances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maintenances" ADD COLUMN     "billNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "maintenances_billNo_key" ON "maintenances"("billNo");
