/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "f_id" SERIAL NOT NULL,
    "f_Image" TEXT NOT NULL,
    "f_Name" TEXT NOT NULL,
    "f_Email" TEXT NOT NULL,
    "f_Designation" TEXT NOT NULL,
    "f_Gender" TEXT NOT NULL,
    "f_Course" TEXT NOT NULL,
    "f_CreateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("f_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE INDEX "Employee_f_id_idx" ON "Employee"("f_id");

-- CreateIndex
CREATE INDEX "Employee_f_Email_idx" ON "Employee"("f_Email");
