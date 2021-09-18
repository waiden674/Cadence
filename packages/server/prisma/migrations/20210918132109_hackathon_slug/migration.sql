/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Hackathon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Hackathon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hackathon" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hackathon_slug_key" ON "Hackathon"("slug");
