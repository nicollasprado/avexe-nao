/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Topping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_OrderProductToTopping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ProductToTopping` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_OrderProductToTopping" DROP CONSTRAINT "_OrderProductToTopping_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ProductToTopping" DROP CONSTRAINT "_ProductToTopping_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ProductToTopping" DROP CONSTRAINT "_ProductToTopping_B_fkey";

-- AlterTable
ALTER TABLE "public"."OrderProduct" ALTER COLUMN "productId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "public"."Topping" DROP CONSTRAINT "Topping_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Topping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Topping_id_seq";

-- AlterTable
ALTER TABLE "public"."_OrderProductToTopping" DROP CONSTRAINT "_OrderProductToTopping_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_OrderProductToTopping_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "public"."_ProductToTopping" DROP CONSTRAINT "_ProductToTopping_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_ProductToTopping_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "public"."OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToTopping" ADD CONSTRAINT "_ProductToTopping_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToTopping" ADD CONSTRAINT "_ProductToTopping_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Topping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_OrderProductToTopping" ADD CONSTRAINT "_OrderProductToTopping_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Topping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
