import api from "@/app/service/api";
interface TipoPrecio {
    id:string
    nombre:string
}
const obtenerTipoPrecio = async (id:string): Promise<TipoPrecio[]> => {
  try {
    const response = await api.get(`/api/precios/combinacion/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default obtenerTipoPrecio;
