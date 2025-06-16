import api from "@/app/service/api";
import { CombinacionResponse } from "../interfaces/comisionReceta.interface";

const obtenerSinComsion = async (): Promise<CombinacionResponse[]> => {
  try {
    const response = await api.get("/api/combinacion/receta/sinComision");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default obtenerSinComsion;

export const listarTipoPrecio = async (combinacion:string) => {
  try {
    const response = await api.get(`/api/precios/combinacion/${combinacion}`)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const descargarSinComision = async () => {
  try {
    const response = await api.get("/api/combinacion/receta/descargar/sinComision", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "combinaciones_sin_comision.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

