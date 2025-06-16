export interface Marcas {
    data:   Datum[];
    pagina: number;
}

export interface Datum {
    _id:    string;
    nombre: string;
    __v?:    number;
}
