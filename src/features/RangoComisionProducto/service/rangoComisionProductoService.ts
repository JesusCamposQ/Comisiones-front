import api from "@/app/config/api";
import { rangoCOmisionProductoI } from "../interface/rangoCOmisionProducto";
import { AxiosResponse } from "axios";
export async function  listarRangoCOmisionProducto():Promise<rangoCOmisionProductoI[]> {
  try {
    const response = await api.get("api/rango/comision/producto")
    return response.data
  } catch (error) {
    throw error;
  }
}


export async function  registrarRangoCOmisionProducto(data:rangoCOmisionProductoI):Promise<AxiosResponse<rangoCOmisionProductoI>> {
  try {
    const response = await api.post("api/rango/comision/producto", data)
    return response.data
  } catch (error) {
    throw error;
  }
  
}

export async function eliminarComisionRangoProducto(id:string):Promise<AxiosResponse> {
    try {      
    const response = await api.delete(`api/rango/comision/producto/${id}`)
    return response
  } catch (error) {
    throw error;
  }
}
