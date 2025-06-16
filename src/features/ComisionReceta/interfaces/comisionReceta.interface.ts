export interface IComisionReceta {
  nombre?: string;
  precio?: string;
  monto?: number;
  combinacionReceta?: string;
  tipoComision?: string;
}

export interface IComisionRecetaData {
  combinacionReceta: string
  data: IComisionReceta[];
}


export interface CombinacionResponse {
  _id: string;
  material: string;
  tipoLente: string;
  rango: string;
  colorLente: string;
  marcaLente: string;
  tratamiento: string;
  tipoColorLente: string;
    tipoPrecio: string;
        importe: number;
}


