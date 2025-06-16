import api from "@/app/service/api";
import { DataResponse } from "../interfaces/comisionServicio.interface";
import { ComisionSinServicio, ServicioSinComision } from "../interfaces/comisionSinServicio";


const obtenerServicios = async (limite: number, pagina: number): Promise<DataResponse> => {
    try {
        const response = await api.get("/api/servicio", {
            params: {
                limite,
                pagina,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const obtenerServiciosSinComision = async (limite: number, pagina: number): Promise<ComisionSinServicio> => {
    try {
        const response = await api.get("/api/servicio/sinComision", {
            params: {
                limite,
                pagina,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const registrarComisionServicio = async (data: ServicioSinComision) => {
    try {
        const response = await api.post("/api/comision/servicio", data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default obtenerServicios;
