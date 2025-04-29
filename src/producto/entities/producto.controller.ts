import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';
import { FilesService } from 'src/files/files.service';

@Controller('productos')
export class ProductoController {
  constructor(
    private readonly productoService: ProductoService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(
    @Body() createProductoDto: CreateProductoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    imagen?: Express.Multer.File,
  ) {
    const imagenPath = imagen ? await this.filesService.saveFile(imagen) : null;
    
    return this.productoService.create({
      ...createProductoDto,
      imagen: imagenPath,
      categoriaId: createProductoDto.categoriaId,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  async update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    imagen?: Express.Multer.File,
  ) {
    const imagenPath = imagen ? await this.filesService.saveFile(imagen) : undefined;
    
    return this.productoService.update(Number(id), {
      ...updateProductoDto,
      ...(imagenPath && { imagen: imagenPath }),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productoService.remove(Number(id));
  }

  @Get()
  async findAll() {
    return this.prisma.producto.findMany({
      include: { categoria: true }
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const producto = await this.prisma.producto.findUnique({
      where: { id: Number(id) },
      include: { categoria: true }
    });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }
}