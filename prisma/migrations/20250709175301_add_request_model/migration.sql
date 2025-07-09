/*
  Warnings:

  - A unique constraint covering the columns `[firebaseId]` on the table `Auditor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Auditor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auditor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auditor_firebaseId_key" ON "Auditor"("firebaseId");
