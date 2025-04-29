import { Rol } from '@prisma/client';  // Importa el enum Rol desde Prisma Client
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  localidad?: string;

  @IsOptional()
  @IsEnum(Rol)  
  rol?: Rol;
}
