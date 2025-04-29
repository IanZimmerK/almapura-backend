import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsBoolean()
  @IsOptional()
  destacado?: boolean;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;
}