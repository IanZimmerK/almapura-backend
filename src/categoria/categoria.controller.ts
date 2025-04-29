import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  async findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoriaService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoriaService.remove(id);
  }
}
