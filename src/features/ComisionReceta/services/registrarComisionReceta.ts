import api from "@/app/service/api";
import { IComisionRecetaData } from "@/features/ComisionReceta/interfaces/comisionReceta.interface";

export const registrarComisionReceta = async (comisionReceta: IComisionRecetaData) => {
  try {
    const response = await api.post("/api/comision/receta", comisionReceta);   
    return response.data;
  } catch (error) {
    throw error;
  }
};
