export interface ComisionServicio {
    _id?: string;
    precio?: string;
    nombre?: string;
    monto?: number;
    servicio?: string;
    diferencia?: number;
    comision?: number;
    fecha?: string;
    flag?: string;
    __v?: number;
}

export interface Servicio {
    _id?: string;
    nombre?: string;
    comisonServicio?: ComisionServicio[];
}

export interface DataResponse {
    data: Servicio[];
    paginas: number;
}
