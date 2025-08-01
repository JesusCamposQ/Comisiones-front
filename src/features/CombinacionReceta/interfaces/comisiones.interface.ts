export interface CombinacionResponse {
    data:    combinacionRecetaI[];
    paginas: number;
}

export interface combinacionRecetaI {
    _id:            string;
    codigo:         string;
    comisionReceta: ComisionReceta[];
    material:       string;
    tipoLente:      string;
    rango:          string;
    colorLente:     string;
    marcaLente:     string;
    tratamiento:    string;
    tipoColorLente: string;
    fecha: string
}

export interface ComisionReceta {
    _id:               string;
    precio:            string;
    nombre:            string;
    monto:             number;
    combinacionReceta: string;
    diferencia:        number;
    comision:          number;
    __v:               number;
    flag?:             string;
}


export interface filtroCombinacionRecetaI {
    tipoLente?:      string;
    material?:       string;
    tratamiento?:    string;
    marcaLente?:     string;
    tipoColorLente?: string;
    rango?:          string;
    colorLente?:     string;
}



