import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: {
        nombre: createCategoriaDto.nombre,
      },
    });
  }

  async findAll() {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: number) {
    return this.prisma.categoria.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
