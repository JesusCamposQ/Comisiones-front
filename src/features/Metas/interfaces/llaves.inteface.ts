export interface Llave {
    _id?: string;
    montura: number;
    precioMontura?: number;
    gafa: number;
    precioGafa?: number;
    lenteDeContacto: number;
    marcaMonturas: string[];
    marcaGafas: string[];
    sucursal: string;
}

export interface LlavesData {
    data: Llave[];
}
