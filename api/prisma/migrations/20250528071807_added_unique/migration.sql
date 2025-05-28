/*
  Warnings:

  - A unique constraint covering the columns `[f_Email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_f_Email_key" ON "Employee"("f_Email");
