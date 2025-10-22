import api from "@/app/config/api";
import { rangoCOmisionProductoI } from "../interface/rangoCOmisionProducto";
import { AxiosResponse } from "axios";
import { v4 } from "uuid";

export async function listarRangoCOmisionProducto(
  filtroNombre: string,
  filtroMinimo: string,
  filtroMaximo: string,
  filtroPrecio: string,
  pagina: number
): Promise<{ data: rangoCOmisionProductoI[]; pagina: number }> {
  try {
    const response = await api.get("api/rango/comision/producto", {
      params: {
        nombre: filtroNombre,
        precioMinimo: filtroMinimo,
        precioMaximo: filtroMaximo,
        precio: filtroPrecio,
        pagina: pagina,
        limite: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function registrarRangoCOmisionProducto(
  data: rangoCOmisionProductoI
): Promise<AxiosResponse<rangoCOmisionProductoI>> {
  try {
    const response = await api.post("api/rango/comision/producto", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function eliminarComisionRangoProducto(
  id: string
): Promise<AxiosResponse> {
  try {
    const response = await api.delete(`api/rango/comision/producto/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function registrarComisionRangoProducto(
  data: any
): Promise<AxiosResponse> {
  try {
    const response = await api.post(`api/rango/comision/producto`, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function descargarExcelRangoComisiones(
  filtroNombre: string,
  filtroMinimo: string,
  filtroMaximo: string,
  filtroPrecio: string
) {
  try {
    const blob = await api.get(`api/rango/comision/producto/excel/descargar`, {
      params: {
        nombre: filtroNombre,
        precioMinimo: filtroMinimo,
        precioMaximo: filtroMaximo,
        precio: filtroPrecio,
      },

      responseType: "blob",
    });

    if (blob.data instanceof Blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob.data);
      link.download = `${v4()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log(
        "No se pudo descargar la combinación de receta, la respuesta no es un blob"
      );
    }
  } catch (error) {
    throw error;
  }
}
