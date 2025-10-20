/*
  Warnings:

  - You are about to alter the column `cep` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Char(11)` to `Char(8)`.
  - Made the column `complement` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reference` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Address" ALTER COLUMN "complement" SET NOT NULL,
ALTER COLUMN "complement" SET DEFAULT '',
ALTER COLUMN "reference" SET NOT NULL,
ALTER COLUMN "reference" SET DEFAULT '',
ALTER COLUMN "cep" SET DATA TYPE CHAR(8);
