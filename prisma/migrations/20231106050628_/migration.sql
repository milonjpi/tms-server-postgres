/*
  Warnings:

  - You are about to drop the column `expenseTitleId` on the `expenseHeads` table. All the data in the column will be lost.
  - You are about to drop the `expenseTitles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[label]` on the table `expenseHeads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `expenseHeads` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CostTitle" AS ENUM ('general', 'trip');

-- DropForeignKey
ALTER TABLE "expenseHeads" DROP CONSTRAINT "expenseHeads_expenseTitleId_fkey";

-- AlterTable
ALTER TABLE "expenseHeads" DROP COLUMN "expenseTitleId",
ADD COLUMN     "type" "CostTitle" NOT NULL;

-- DropTable
DROP TABLE "expenseTitles";

-- CreateIndex
CREATE UNIQUE INDEX "expenseHeads_label_key" ON "expenseHeads"("label");
