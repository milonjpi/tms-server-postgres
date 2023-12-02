/*
  Warnings:

  - The `daysToRemind` column on the `paperWorks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "paperWorks" DROP COLUMN "daysToRemind",
ADD COLUMN     "daysToRemind" INTEGER;
