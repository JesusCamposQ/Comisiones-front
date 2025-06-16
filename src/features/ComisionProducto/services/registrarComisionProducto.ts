import api from "@/app/service/api";
import { IComisionProductoData } from "@/features/ComisionProducto/interfaces/comisionProducto.interface";

const registrarComisionProducto = async (comisionProducto: IComisionProductoData) => {
  console.log(comisionProducto)
  try {
    const response = await api.post("/api/comision/producto", comisionProducto);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default registrarComisionProducto;
