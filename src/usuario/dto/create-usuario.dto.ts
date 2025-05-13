import { Rol } from '@prisma/client';
import { 
  IsEmail, 
  IsEnum, 
  IsOptional, 
  IsString, 
  MinLength, 
  MaxLength, 
  Matches 
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nombre: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  apellido: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
  })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  direccion?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
    message: 'Número de teléfono inválido'
  })
  telefono?: string;

  @IsOptional()
  @IsEnum(Rol)
  rol?: Rol;
}