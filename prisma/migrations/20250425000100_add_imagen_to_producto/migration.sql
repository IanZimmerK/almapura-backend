/*
  Warnings:

  - You are about to drop the column `destacado` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "destacado",
DROP COLUMN "stock";
