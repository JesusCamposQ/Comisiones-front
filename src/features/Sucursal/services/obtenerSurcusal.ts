import api from "@/app/service/api";
import { Sucursal } from "../interfaces/sucursal.interface";

export const obtenerSucursalByEmpresa = async (empresaId: string): Promise<Sucursal[]> => {
  const resultado = await api.get(`api/sucursal/empresa/${empresaId}`);
  return resultado.data;
};