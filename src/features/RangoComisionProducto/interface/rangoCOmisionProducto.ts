export interface rangoCOmisionProductoI {
  _id: string;
  precioMinimo: number;
  precioMaximo: number;
  nombre: string;
  detalleRangoComisonProducto:detalleRangoComisonProducto[]
}
interface detalleRangoComisonProducto {
  _id: string;
  comision: string;
  nombrePrecio: string;
  precio: string;
}
