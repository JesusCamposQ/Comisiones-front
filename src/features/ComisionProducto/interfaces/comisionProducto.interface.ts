export interface IComisionProducto {
  nombre?: string;
  precio?: string;
  monto?: number;
  combinacionProducto?: string;
  tipoComision?: string;
}

export interface IComisionProductoData {
  producto?: string
  data?: IComisionProducto[];
}