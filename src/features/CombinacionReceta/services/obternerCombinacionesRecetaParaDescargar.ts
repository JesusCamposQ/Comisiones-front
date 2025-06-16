import api from "@/app/service/api";

const obtenerCombinacionRecetaParaDescargar = async ()=> {
    try {
        const response = await api.get("/api/combinacion/receta/descargar",{
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener la combinación de receta:", error);
        throw error;
    }
};

export default obtenerCombinacionRecetaParaDescargar;