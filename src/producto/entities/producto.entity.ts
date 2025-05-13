export class Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock?: number;
  destacado?: boolean;
  imagen?: string | null;  // Make sure the imagen field is defined
  categoriaId?: number | null;
  categoria?: any;
}