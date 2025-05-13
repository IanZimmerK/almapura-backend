import { 
  IsString, 
  IsNumber, 
  IsBoolean, 
  IsOptional, 
  IsNotEmpty 
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string | null;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  destacado?: boolean;

  @IsNumber()
  @IsNotEmpty()
  categoriaId: number;

  @IsString()
  @IsOptional()
  imagenUrl?: string | null;
}