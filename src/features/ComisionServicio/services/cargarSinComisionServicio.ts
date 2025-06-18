import api from "@/app/service/api";

export const cargarSinComisionServicio = async (formData:FormData) => {
    try {
      const response = await api.post(`/api/provider/excel/servicio/comisiones`, formData, {
        headers:{
         'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
     
      throw error;
    }
  };
  