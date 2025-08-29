/*
  Warnings:

  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToTopping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_OrderToTopping" DROP CONSTRAINT "_OrderToTopping_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_OrderToTopping" DROP CONSTRAINT "_OrderToTopping_B_fkey";

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "public"."_OrderToProduct";

-- DropTable
DROP TABLE "public"."_OrderToTopping";

-- CreateTable
CREATE TABLE "public"."OrderProduct" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_OrderProductToTopping" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrderProductToTopping_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderProductToTopping_B_index" ON "public"."_OrderProductToTopping"("B");

-- AddForeignKey
ALTER TABLE "public"."OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrderProductToTopping" ADD CONSTRAINT "_OrderProductToTopping_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."OrderProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrderProductToTopping" ADD CONSTRAINT "_OrderProductToTopping_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Topping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
