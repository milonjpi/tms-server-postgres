-- CreateTable
CREATE TABLE "externalEquipmentUses" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "maintenanceId" TEXT NOT NULL,
    "equipmentTitleId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "inHouse" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "externalEquipmentUses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "externalEquipmentUses" ADD CONSTRAINT "externalEquipmentUses_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "externalEquipmentUses" ADD CONSTRAINT "externalEquipmentUses_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "externalEquipmentUses" ADD CONSTRAINT "externalEquipmentUses_equipmentTitleId_fkey" FOREIGN KEY ("equipmentTitleId") REFERENCES "equipmentTitles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
