import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Producto } from '@prisma/client';
import { CreateProductoDto } from '../dto/create-producto.dto';

@Injectable()
export class ProductoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductoDto): Promise<Producto> {
    return this.prisma.producto.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion || null,
        precio: data.precio,
        stock: data.stock,
        destacado: data.destacado,
        categoria: {
          connect: { id: data.categoriaId }
        },
        imagenUrl: data.imagenUrl || null,
      },
      include: {
        categoria: true,
      },
    });
  }

  async findAll(): Promise<Producto[]> {
    return this.prisma.producto.findMany({
      include: {
        categoria: true,
      },
    });
  }

  async findOne(id: number): Promise<Producto | null> {
    return this.prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
      },
    });
  }

  async update(id: number, data: Prisma.ProductoUpdateInput): Promise<Producto> {
    return this.prisma.producto.update({
      where: { id },
      data,
      include: {
        categoria: true,
      },
    });
  }

  async remove(id: number): Promise<Producto> {
    return this.prisma.producto.delete({
      where: { id },
    });
  }
}