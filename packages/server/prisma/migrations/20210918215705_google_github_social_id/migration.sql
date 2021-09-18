/*
  Warnings:

  - You are about to drop the column `socialId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[githubSocialId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleSocialId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `githubSocialId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_socialId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "socialId",
ADD COLUMN     "githubSocialId" TEXT NOT NULL,
ADD COLUMN     "googleSocialId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_githubSocialId_key" ON "User"("githubSocialId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleSocialId_key" ON "User"("googleSocialId");
