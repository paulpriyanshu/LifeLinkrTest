/*
  Warnings:

  - Added the required column `f_MobileNo` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "f_MobileNo" TEXT NOT NULL;
