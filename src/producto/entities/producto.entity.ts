export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string | null;  // Campo de imagen (opcional)
    categoriaId: number;
  }