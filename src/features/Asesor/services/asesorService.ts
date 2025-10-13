import api from "@/app/config/api"
import { ListarAsesorI } from "../interface/asesor"
import { AsesorSinUsuario } from "../interfaces/asesor.interface"


export const listarAsesor=async():Promise<ListarAsesorI[]>=> {
    try {
        const response = await  api.get('api/asesor')
        return response.data
    } catch (error) {
        throw error
    }
}


export const gestor=async(id:string, gestor:boolean):Promise<{status:number}>=> {
    try {
        const response = await  api.patch(`api/asesor/${id}`,
            {
                gestor:gestor
            }
        )
        return response.data
    } catch (error) {
        throw error
    }
}


export const listarAsesorSinUsuario=async():Promise<AsesorSinUsuario[]>=> {
    try {
        const response = await  api.get(`api/asesor/sin/usuario`)
        return response.data
    } catch (error) {
        throw error
    }
}