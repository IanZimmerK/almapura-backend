import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductoService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async create(data: Prisma.ProductoCreateInput) {
    if (data.categoriaId) {
      const categoriaExists = await this.prisma.categoria.count({
        where: { id: data.categoriaId }
      });
      if (!categoriaExists) {
        throw new NotFoundException('Categoría no encontrada');
      }
    }

    return this.prisma.producto.create({
      data: {
        ...data,
        destacado: data.destacado ?? false,
        imagen: data.imagen ?? null,
        categoria: data.categoriaId ? {
          connect: { id: data.categoriaId }
        } : undefined
      },
      include: { categoria: true }
    });
  }

  async update(id: number, data: Prisma.ProductoUpdateInput) {
    const producto = await this.prisma.producto.findUnique({ where: { id } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Eliminar imagen anterior si se sube una nueva
    if (data.imagen && producto.imagen) {
      await this.filesService.deleteFile(producto.imagen);
    }

    return this.prisma.producto.update({
      where: { id },
      data: {
        ...data,
        categoria: data.categoriaId !== undefined ? {
          connect: data.categoriaId ? 
            { id: data.categoriaId as number } : 
            null
        } : undefined
      },
      include: { categoria: true }
    });
  }

  async remove(id: number) {
    const producto = await this.prisma.producto.findUnique({ where: { id } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (producto.imagen) {
      await this.filesService.deleteFile(producto.imagen);
    }

    return this.prisma.producto.delete({
      where: { id },
      include: { categoria: true }
    });
  }
}