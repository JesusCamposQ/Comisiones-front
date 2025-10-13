import api from "@/app/config/api";
import { TipoVenta } from "../interfaces/tipoVenta.interface";

const obtenerTipoVentas = async (): Promise<TipoVenta[]> => {
    try {

        const response = await api.get("/api/tipo/venta")
        return response.data;
    } catch (error) {
        throw error
    }
};

export default obtenerTipoVentas;