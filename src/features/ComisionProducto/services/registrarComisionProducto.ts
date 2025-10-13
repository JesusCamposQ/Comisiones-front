import api from "@/app/config/api";
import { IComisionProductoData } from "@/features/ComisionProducto/interfaces/comisionProducto.interface";

const registrarComisionProducto = async (comisionProducto: IComisionProductoData) => {
  try {
    const response = await api.post("/api/comision/producto", comisionProducto);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default registrarComisionProducto;
