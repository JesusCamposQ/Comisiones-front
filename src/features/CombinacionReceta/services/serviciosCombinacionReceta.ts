import api from "@/app/service/api";
import { CombinacionResponse, filtroCombinacionRecetaI } from "../interfaces/comisiones.interface";

export const obtenerCombinacionReceta = async (limite: number, pagina: number, filter:filtroCombinacionRecetaI): Promise<CombinacionResponse> => {
  const response = await api.get("/api/combinacion/receta", {
    params: {
      limite,
      pagina,
      ...filter
    }
  });
  return response.data;
};

export const eliminarCombinacionReceta = async (id: string) => {
  try {
    const response = await api.delete(`/api/comision/receta/${id}`);
    console.log(response);
    
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const editarCombinacionReceta = async (idComision: string, monto: number) => {
  try {
    const response = await api.patch(`/api/comision/receta/`, { monto , idComision});
    console.log(response);
    
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const cargarCombinaciones = async (formData:FormData) => {
  try {
    const response = await api.post(`/api/provider/excel/combinaciones/comisiones`, formData, {
      headers:{
       'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
   
    throw error;
  }
};


export const actualizarComisiones = async (formData:FormData) => {
  try {
    const response = await api.post(`/api/provider/excel/combinaciones/comisiones/actualizar`, formData, {
      headers:{
       'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};