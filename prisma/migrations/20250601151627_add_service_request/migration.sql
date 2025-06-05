-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM (
    'LAMP_REPLACEMENT',
    'ROAD_REPAIR',
    'GARBAGE_COLLECTION',
    'STREET_CLEANING',
    'TREE_TRIMMING',
    'PARK_MAINTENANCE'
);

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED'
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" SERIAL PRIMARY KEY,
    "type" "ServiceType" NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);
