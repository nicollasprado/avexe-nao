/*
  Warnings:

  - Added the required column `logoUrl` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Store" ADD COLUMN     "logoUrl" TEXT NOT NULL;
