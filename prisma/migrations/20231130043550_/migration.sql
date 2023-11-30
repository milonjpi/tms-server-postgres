/*
  Warnings:

  - The values [UnScheduled] on the enum `MaintenanceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MaintenanceType_new" AS ENUM ('Scheduled', 'Unscheduled', 'Accidental', 'Others');
ALTER TABLE "maintenances" ALTER COLUMN "maintenanceType" TYPE "MaintenanceType_new" USING ("maintenanceType"::text::"MaintenanceType_new");
ALTER TYPE "MaintenanceType" RENAME TO "MaintenanceType_old";
ALTER TYPE "MaintenanceType_new" RENAME TO "MaintenanceType";
DROP TYPE "MaintenanceType_old";
COMMIT;
