import api from "@/app/config/api"
import { Empresa } from "../interfaces/empresa.interface";

export const obtenerEmpresas = async (): Promise<Empresa[]> => {
    const resultado = await api.get("api/empresa")
    return resultado.data;
};
