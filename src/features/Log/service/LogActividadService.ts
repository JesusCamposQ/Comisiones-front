import api from "@/app/config/api"
import { buscadorLogI } from "../interface/log"

export async function listarLogActividad(fechas:buscadorLogI) {
    try {
        const response = await api.post("api/log/listar",fechas )
        return response.data
    } catch (error) {
        throw error
    }
}

export async function listarLogUsuario(fechas:buscadorLogI) {
    try {
        const response = await api.post("api/log/listar/usuario",fechas )
        return response.data
    } catch (error) {    
        throw error
    }
}