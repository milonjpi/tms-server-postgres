/*
  Warnings:

  - You are about to drop the column `inHouse` on the `equipmentUses` table. All the data in the column will be lost.
  - You are about to drop the column `inHouse` on the `externalEquipmentUses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "equipmentUses" DROP COLUMN "inHouse";

-- AlterTable
ALTER TABLE "externalEquipmentUses" DROP COLUMN "inHouse";
