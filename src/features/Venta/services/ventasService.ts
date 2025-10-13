import api from "@/app/config/api";
import {  VentasInvalidasI} from "../interfaces/venta.interface";

export async function listarVentasInvalidas(fechaInicio:Date, fechaFin:Date):Promise<VentasInvalidasI[]>{    
    try {   
        const response = await api.post('/api/venta/invalidas',{
            fechaInicio:fechaInicio.toISOString().split('T')[0],
            fechaFin:fechaFin.toISOString().split('T')[0]
        })
        return response.data
    } catch (error) {   
         throw  error;
         
    }
}