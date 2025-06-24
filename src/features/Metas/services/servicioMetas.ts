import api from "@/app/service/api";
import { Datum, Metas } from "../interfaces/metas.interface";
import { Marcas } from "../interfaces/marcas.interface";
import { Llave, LlavesData } from "../interfaces/llaves.inteface";

export const registrarMetas = async (data: Metas) => {
  try {
    const response = await api.post("/api/metas/producto/vip", data);
    return response.data;
  } catch (error) {
    console.log(error);
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
  try {
    const response = await api.patch(`/api/metas/producto/vip/${data._id}`, {
      monturaMasGafa: Number(data.monturaMasGafa),
      lenteDeContacto: Number(data.lenteDeContacto),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarMetas = async (id: string) => {
  try {
    const response = await api.delete(`/api/metas/producto/vip/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerMarcas = async (
  limite: number,
  pagina: number,
  filter: string
): Promise<Marcas> => {
  const response = await api.get("/api/marca", {
    params: {
      limite,
      pagina,
      nombre: filter,
    },
  });
  return response.data;
};

export const registrarLlaves = async (data: LlavesData) => {
  try {
    const response = await api.post("/api/metas/producto/vip", data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const obtenerLlaves = async (): Promise<Llave[]> => {
  try {
    const response = await api.get("/api/metas/producto/vip");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const eliminarLlave = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`/api/metas/producto/vip/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
