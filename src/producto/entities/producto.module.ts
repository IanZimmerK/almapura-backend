import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService, PrismaService, FilesService],
  exports: [ProductoService],
})
export class ProductoModule {}