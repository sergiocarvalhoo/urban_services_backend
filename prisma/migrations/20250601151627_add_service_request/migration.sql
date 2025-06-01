-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
