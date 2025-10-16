/*
  Warnings:

  - Added the required column `cep` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Address" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL;
