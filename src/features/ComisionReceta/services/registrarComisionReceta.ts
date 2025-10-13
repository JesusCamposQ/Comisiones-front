import api from "@/app/config/api";
import { IComisionRecetaData } from "@/features/ComisionReceta/interfaces/comisionReceta.interface";

export const registrarComisionReceta = async (comisionReceta: IComisionRecetaData) => {
  try {
    const response = await api.post("/api/comision/receta", comisionReceta);   
    return response.data;
  } catch (error) {
    throw error;
  }
};
