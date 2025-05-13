import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
import { Prisma } from '@prisma/client';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(
    @Body() createProductoDto: CreateProductoDto,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    let imagenUrl: string | undefined;
    
    if (imagen) {
      imagenUrl = 'url-de-ejemplo/imagen.jpg';
    }

    return this.productoService.create({
      nombre: createProductoDto.nombre,
      descripcion: createProductoDto.descripcion || null,
      precio: createProductoDto.precio,
      stock: createProductoDto.stock,
      destacado: createProductoDto.destacado,
      categoriaId: createProductoDto.categoriaId,
      imagenUrl: imagenUrl || null,
    });
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  async update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    let imagenUrl: string | undefined;
    
    if (imagen) {
      imagenUrl = 'url-de-ejemplo/imagen.jpg';
    }

    const updateData: Prisma.ProductoUpdateInput = {
      ...(updateProductoDto.nombre && { nombre: updateProductoDto.nombre }),
      ...(updateProductoDto.descripcion !== undefined && { descripcion: updateProductoDto.descripcion }),
      ...(updateProductoDto.precio !== undefined && { precio: updateProductoDto.precio }),
      ...(updateProductoDto.stock !== undefined && { stock: updateProductoDto.stock }),
      ...(updateProductoDto.destacado !== undefined && { destacado: updateProductoDto.destacado }),
      ...(updateProductoDto.categoriaId && { 
        categoria: {
          connect: { id: updateProductoDto.categoriaId }
        }
      }),
      ...(imagenUrl && { imagenUrl }),
    };

    return this.productoService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}