export interface ComisionSinServicio {
    data:    Datum[];
    paginas: number;
}

export interface Datum {
    _id?:              string;
    codigoMia?:        string;
    nombre?:           string;
    comision?:         boolean;
    descripcion?:      string;
    comisionServicio?: any[];
    importe?:          number;
    tipoPrecio?:       string;
}

export interface ServicioSinComision {
    servicio: string;
    data:     DatumSinComision[];
}

export interface DatumSinComision {
    precio: string;
    monto:  number;
    nombre: string;
}
