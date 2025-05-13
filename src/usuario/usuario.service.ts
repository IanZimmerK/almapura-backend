import { 
  Injectable, 
  ConflictException, 
  NotFoundException 
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  private readonly SALT_ROUNDS = 10;
  
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto) {
    // Verificar si el email ya existe
    const existeEmail = await this.prisma.usuario.findUnique({
      where: { email: data.email }
    });
    
    if (existeEmail) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);

    return this.prisma.usuario.create({
      data: {
        ...data,
        password: hashedPassword,
        rol: data.rol || 'CLIENTE'
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        createdAt: true
      }
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        createdAt: true
      }
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        direccion: true,
        telefono: true,
        createdAt: true
      }
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: number, data: UpdateUsuarioDto) {
    // Verificar si el usuario existe
    await this.findOne(id);

    const updateData: any = { ...data };

    // Hashear nueva contraseña si se proporciona
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, this.SALT_ROUNDS);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        createdAt: true
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.usuario.delete({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true
      }
    });
  }
}