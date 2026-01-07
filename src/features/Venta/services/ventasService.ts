import api from "@/app/config/api";
import {  VentaI, VentasInvalidasI} from "../interfaces/venta.interface";

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

export async function BuscarVentaPorId(idVenta:string):Promise<VentaI[]>{    
    try {   
        const response = await api.get(`/api/venta/${idVenta}`)
        return response.data
    } catch (error) {   
         throw  error;
         
    }
}

export async function actualizarMontos(id:string, montoTotal:number, precioTotal:number, descuento:number):Promise<any>{    
    try {   
        const response = await api.patch(`/api/venta/${id}`, {
            montoTotal:montoTotal,
            precioTotal:precioTotal,
            descuento:descuento
        })
        return response.data
    } catch (error) {   
         throw  error;
         
    }
}