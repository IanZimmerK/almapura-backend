/*
  Warnings:

  - You are about to drop the column `precio` on the `DetallePedido` table. All the data in the column will be lost.
  - You are about to drop the column `direccion` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `metodoPago` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `retiro` on the `Pedido` table. All the data in the column will be lost.
  - The `estado` column on the `Pedido` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `imagen` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `actualizadoEn` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `localidad` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Carrito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CarritoItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioUnitario` to the `DetallePedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `DetallePedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DetallePedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoriaId` on table `Producto` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `apellido` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_categoriaId_fkey";

-- DropIndex
DROP INDEX "Carrito_usuarioId_key";

-- DropIndex
DROP INDEX "Categoria_nombre_key";

-- AlterTable
ALTER TABLE "Carrito" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CarritoItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DetallePedido" DROP COLUMN "precio",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "precioUnitario" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "direccion",
DROP COLUMN "fecha",
DROP COLUMN "metodoPago",
DROP COLUMN "retiro",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaEntrega" TIMESTAMP(3),
ADD COLUMN     "fechaPedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "estado",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'pendiente';

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "imagen",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imagenUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "descripcion" DROP NOT NULL,
ALTER COLUMN "categoriaId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "actualizadoEn",
DROP COLUMN "creadoEn",
DROP COLUMN "localidad",
ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "EstadoPedido";

-- DropEnum
DROP TYPE "MetodoPago";

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
