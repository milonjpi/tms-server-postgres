/*
  Warnings:

  - Added the required column `uomId` to the `equipmentTitles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipmentTitles" ADD COLUMN     "uomId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "uom" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "uom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipmentTitles" ADD CONSTRAINT "equipmentTitles_uomId_fkey" FOREIGN KEY ("uomId") REFERENCES "uom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
