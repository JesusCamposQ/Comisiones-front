import api from "@/app/service/api";
import { Producto } from "../interfaces/producto.interface";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";

const obtenerSinComsionProducto = async (limite: number, pagina: number, filtro?: ComsionProductoFiltro): Promise<Producto> => {
  try {
    const response = await api.get("/api/producto/sinComision", {
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
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default obtenerSinComsionProducto;

export const descargarSinComisionProducto = async () => {
  try {
    const response = await api.get("/api/producto/descargar/montura/sinComsion", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "productos_sin_comision.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const descargarSinComisionProductoMontura = async () => {
  try {
    const response = await api.get("/api/producto/descargar/montura/sinComsion", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "productos_sin_comision_montura.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const descargarSinComisionProductoGafa = async () => {
  try {
    const response = await api.get("/api/producto/descargar/gafa/sinComsion", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "productos_sin_comision_gafa.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const descargarSinComisionProductoLenteContacto = async () => {
  try {
    const response = await api.get("/api/producto/descargar/lc/sinComsion", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "productos_sin_comision_lente_contacto.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const cargarSinComisionProducto = async (formData:FormData) => {
  try {
    const response = await api.post(`/api/provider/excel/producto/comisiones`, formData, {
      headers:{
       'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
   
    throw error;
  }
};
