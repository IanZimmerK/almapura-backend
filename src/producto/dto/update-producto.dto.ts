import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  precio?: number;

  @IsBoolean()
  @IsOptional()
  destacado?: boolean;

  @IsString()
  @IsOptional()
  imagen?: string | null;

  @IsNumber()
  @IsOptional()
  categoriaId?: number | null;
}