import { Producto } from "./producto";
import { Venta } from "./venta";

export class DetalleVenta {
  id!: number;
  producto!: Producto;
  venta!: Venta;
  cantidad!:number;
}
