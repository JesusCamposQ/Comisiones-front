  export interface Venta {
  _id: string;
  metaProductosVip: MetaProductosVip | null;
  sucursal:         string;
  empresa:          string
  asesor:           string;
  gestor:           boolean;
  gafaVip:          number;
  monturaVip:       number;
  lenteDeContacto:  number;
  montoTotal:        number;
  totalDescuento:     number;
  ventas:           VentaElement[];
  importeTotal?:     number;
  totalComision?:    number;
}

export interface MetaProductosVip {
  _id:string
   montura: number;
 

   precioMontura: number;
 

   gafa: number;

   precioGafa: number;

   marcaMonturas: string[];
 
   
   marcaGafas: string[];
 
  
   lenteDeContacto: number;
 
 
   sucursal:string;
}

export interface VentaElement {
    precioTotal: number
  idVenta:       string;
  precio:    string
  descuento:     number;
  montoTotal:    number;
  comisiona:     boolean;
  tipo:          string;
  tipo2:         string;
  tipoDescuento: string | null;
  detalle:       Detalle[];
  fechaFinalizacion: string
}

export interface Detalle {
  producto?:    Producto;
  importe:      number;
  comisiones:   Comision[];
  combinacion?: Combinacion;
  rubro:string
  servicios?:ServiciosI,
  otros :otrosI
}

export interface Combinacion {
  id:             string;
  descripcion:       string;
  tipo:       string;
     medioPar: boolean
}

export interface Comision {
  id:     string;
  nombre: string;
  monto:  number;
  base:   boolean;
}

export interface Producto {
  id:        string;
  tipo:      string;
  marca:     string;
  categoria: string | null;
  descripcion:       string;
}

interface ServiciosI {
  id: string;
  tipo: string;
  descripcion:       string;
}


interface otrosI {
  id: string;
  tipo: string;
  descripcion:       string;
}


export interface VentasInvalidasI {
  _id:string,
  id_venta:string
  montoTotal:number
  precioTotal:number
  fechaVenta:string
  fechaFinalizacion:string
  asesor:string
  sucursal:string
}
