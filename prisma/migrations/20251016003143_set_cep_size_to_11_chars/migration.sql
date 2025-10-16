/*
  Warnings:

  - You are about to alter the column `cep` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(11)`.

*/
-- AlterTable
ALTER TABLE "public"."Address" ALTER COLUMN "cep" SET DATA TYPE CHAR(11);
