import api from "@/app/service/api";
import { AutenticacionI } from "../interface/autenticacionI";


export const autenticacion= async(data:AutenticacionI)=>{
    try {
        const response = await api.post('api/autenticacion', data)
        return response.data
        
    } catch (error) {
        throw error
    }
}