import api from "@/app/service/api";
import { Datum, Metas } from "../interfaces/metas.interface";
import { Marcas } from "../interfaces/marcas.interface";

export const registrarMetas = async (data: Metas) => {
  console.log("Esta es la Data: "+data)
  try{
    const response = await api.post("/api/metas/producto/vip", 
      data
    );
    return response.data;	
  }catch(error){
    console.log(error)
  }
};
 
export const obtenerMetas = async () => {
  try {
    const response = await api.get("/api/metas/producto/vip");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editarMetas = async (data: Datum) => {
  console.log(data)
  console.log("Esta es la MonturaMasGafa: "+data.monturaMasGafa)
  console.log("Esta es la LenteDeContacto: "+data.lenteDeContacto)

  try{
    const response = await api.patch(`/api/metas/producto/vip/${data._id}`, 
      {
        monturaMasGafa: Number(data.monturaMasGafa),
        lenteDeContacto: Number(data.lenteDeContacto)
      }
    );
    console.log(response);
    return response;
  }catch(error){
    console.log(error)
  }
};

export const eliminarMetas = async (id: string) => {
  console.log("Esta es la Data: "+id)
  try{
    const response = await api.delete(`/api/metas/producto/vip/${id}`);
    return response;
  }catch(error){
    console.log(error)
  }
};

export const obtenerMarcas = async (limite: number, pagina: number, filter:string): Promise<Marcas> => {
    const response = await api.get("/api/marca", {
    params: {
      limite,
      pagina,
      nombre: filter
    }
  });
  console.log(response.data)
  return response.data;
};