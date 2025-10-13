import api from "@/app/config/api";
import { Sucursal } from "../interfaces/sucursal.interface";

export const obtenerSucursalByEmpresa = async (empresaId: string): Promise<Sucursal[]> => {
  const resultado = await api.get(`api/sucursal/empresa/${empresaId}`);
  return resultado.data;
};

export const obtenerSucursal = async (): Promise<Sucursal[]> => {
  const resultado = await api.get(`api/sucursal`);
  return resultado.data;
};