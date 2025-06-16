import api from "@/app/service/api";
import { Datum, Producto } from "../interfaces/producto.interface";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";

const obtenerComisionProductoMontura = async (limite: number, pagina: number, filtro?: ComsionProductoFiltro): Promise<Producto> => {

  try {
    const response = await api.get("/api/producto/montura", {
      params: {
        limite,
        pagina,
        tipoProducto: filtro?.tipoProducto?.toUpperCase(),
        serie: filtro?.serie?.toUpperCase(),
        codigoQR: filtro?.codigoQR?.toUpperCase(),
        marca: filtro?.marca?.toUpperCase(),
        color: filtro?.color?.toUpperCase()
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de lente de montura:", error);
    throw error;
  }
};
const obtenerComisionProductoGafa = async (limite: number, pagina: number, filtro?: ComsionProductoFiltro): Promise<Producto> => {

  try {
    const response = await api.get("/api/producto/gafa", {
      params: {
        limite,
        pagina,
        tipoProducto: filtro?.tipoProducto?.toUpperCase(),
        serie: filtro?.serie?.toUpperCase(),
        codigoQR: filtro?.codigoQR?.toUpperCase(),
        marca: filtro?.marca?.toUpperCase(),
        color: filtro?.color?.toUpperCase()
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de gafa:", error);
    throw error;
  }
};
const obtenerComisionProductoLenteContacto = async (limite: number, pagina: number, filtro?: ComsionProductoFiltro): Promise<Producto> => {

  try {
    const response = await api.get("/api/producto/lente/contacto", {
      params: {
        limite,
        pagina,
        tipoProducto: filtro?.tipoProducto?.toUpperCase(),
        serie: filtro?.serie?.toUpperCase(),
        codigoQR: filtro?.codigoQR?.toUpperCase(),
        marca: filtro?.marca?.toUpperCase(),
        color: filtro?.color?.toUpperCase()
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de lente contacto:", error);
    throw error;
  }
};

const eliminarComisionProducto = async (id: string) => {

  try {
    const response = await api.delete(`/api/comision/producto/${id}`);
    return response;
  } catch (error) {
    console.error("Error al eliminar la combinación de lente contacto:", error);
    throw error;
  }
};
const editarComisionProducto = async (idComision: string, monto: number) => {
  try {
    const response = await api.patch('/api/comision/producto', { idComision, monto });
    return response;
  } catch (error) {
    console.error("Error al editar la combinación de lente contacto:", error);
    throw error;
  }
};
const obtenerSinComisionProductoMontura = async (): Promise<Datum[]> => {

  try {
    const response = await api.get("/api/producto/sinComision/montura");
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("Error al obtener la combinación de lente de montura:", error);
    throw error;
  }
};
const obtenerSinComisionProductoGafa = async (): Promise<Datum[]> => {

  try {
    const response = await api.get("/api/producto/sinComision/gafa");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de gafa:", error);
    throw error;
  }
};
const obtenerSinComisionProductoLenteContacto = async (): Promise<Datum[]> => {

  try {
    const response = await api.get("/api/producto/sinComision/lente/contacto");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la combinación de lente de montura:", error);
    throw error;
  }
};


export{
  obtenerComisionProductoMontura,
  obtenerComisionProductoGafa,
  obtenerComisionProductoLenteContacto,
  eliminarComisionProducto,
  editarComisionProducto,
  obtenerSinComisionProductoMontura,
  obtenerSinComisionProductoGafa,
  obtenerSinComisionProductoLenteContacto
};