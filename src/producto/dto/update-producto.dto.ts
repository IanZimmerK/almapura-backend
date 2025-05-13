import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number) // Transform string to number
  precio?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean) // Transform string to boolean
  destacado?: boolean;

  @IsString()
  @IsOptional()
  imagen?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number) // Transform string to number
  categoriaId?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number) // Transform string to number
  stock?: number;
}