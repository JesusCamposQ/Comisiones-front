
export interface buscadorLogI{
    fechaInicio:string
    fechaFin:string
}

export interface LogActividadI {
  _id: string; 
  accion:  string;
  descripcion: string;
  ip: string;
  navegador: string;
  path: string;
  schema: string;
  body: string; 
  usuario: string;
  fecha:string

  estado:string
}
