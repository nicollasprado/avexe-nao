/*
  Warnings:

  - A unique constraint covering the columns `[stripePriceId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripePriceId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "stripePriceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_stripePriceId_key" ON "public"."Product"("stripePriceId");
