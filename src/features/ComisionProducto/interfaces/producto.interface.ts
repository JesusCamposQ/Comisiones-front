export interface Producto {
    data:    Datum[];
    paginas: number;
}

export interface Datum {
    _id: string;
    codigoMia: string;
    tipoProducto: string;
    serie: string;
    codigoQR: string;
    importe: number;
    tipoPrecio: string;
    marca: string;
    color: string;
    tipoMontura: string;
    comisionProducto: ComisionProducto[];
}
export interface ComisionProducto {
    _id?: string;
    precio?: string;
    nombre?: string;
    monto?: number;
    producto?: string;
    diferencia?: number;
    comision?: number;
    __v?: number;
}
