import api from "@/app/config/api"
import { precioI } from "../interface/precio"

export async function listarPrecios():Promise<precioI[]> {
    try {
        const response = await api.get("api/precios")
        return response.data
    } catch (error) {
        throw error
    }
}


export async function listarPreciosPorScursal(sucursales:string[]):Promise<precioI[]> {
    try {
        const response = await api.post("api/precios/sucursal", {sucursal:sucursales})
        return response.data
    } catch (error) {
        throw error
    }
}