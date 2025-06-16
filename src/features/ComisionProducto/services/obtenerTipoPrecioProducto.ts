import api from "@/app/service/api";
interface TipoPrecio {
    id:string
    nombre:string
}
const obtenerTipoPrecioProducto = async (id:string): Promise<TipoPrecio[]> => {
  try {
    const response = await api.get(`/api/precios/producto/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default obtenerTipoPrecioProducto;
