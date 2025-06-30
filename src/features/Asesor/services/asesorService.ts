import api from "@/app/service/api"
import { ListarAsesorI } from "../interface/asesor"


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