
export interface Usuario {
    _id: string;
    nombre: string;
    apellidos: string;
    username: string;
    password?: string;
    sucursales?: dataAsesor[];
    rol: string;
    flag?: string;
    asesorUsuario?:string[]
}

export enum Role {
    ADMIN = "admin",
    USER = "user",
}


export interface ErrorUser {
    statusCode: number;
    message:    string;
    errors:     Error[];
}

export interface Error {
    propiedad: string;
    errors:    string[];
}
interface dataAsesor {
    sucursal:string, asesor:string
}