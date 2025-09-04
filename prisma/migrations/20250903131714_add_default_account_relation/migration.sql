/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `UserSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `UserSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."UserSettings" ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_accountId_key" ON "public"."UserSettings"("accountId");

-- AddForeignKey
ALTER TABLE "public"."UserSettings" ADD CONSTRAINT "UserSettings_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
