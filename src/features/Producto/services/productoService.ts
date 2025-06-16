import api from "@/app/service/api";

export const descargaMontura = async ()=> {
    try {
        const response = await api.get("/api/producto/descargar/montura",{
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const descargaGafa = async ()=> {
    try {
        const response = await api.get("/api/producto/descargar/gafa",{
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const descargaLc = async ()=> {
    try {
        const response = await api.get("/api/producto/descargar/lc",{
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

