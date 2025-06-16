import { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface";
import { TipoVenta } from "./tipoVenta.interface";

export interface FiltroI{
    empresa?: string;
    sucursal: string[];
    fechaInicio: string; 
    fechaFin: string; 
    tipoVenta?: string[]; 
    sucursales?: Sucursal[];
    tipoVentas?: TipoVenta[];
}
export interface FiltroIWithSucursal{
    empresa?: string;
    sucursal: Sucursal[];
    fechaInicio: string; 
    fechaFin: string;  
}