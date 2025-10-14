import { useEffect, useState } from "react";
import { RegistrarRangoComisionProductoModal } from "../modal/RegistrarRangoComisionProductoModal";
import toast from "react-hot-toast";
import { listarRangoCOmisionProducto } from "../service/rangoComisionProductoService";
import { rangoCOmisionProductoI } from "../interface/rangoCOmisionProducto";
import { Trash2 } from "lucide-react";

export const ListarRangoComisionProductoPage = () => {
  const [data, setData] = useState<rangoCOmisionProductoI[]>([]);
    const [realod, setReload]= useState<boolean>(false)
  useEffect(() => {
    (async () => {
      try {
        const response = await listarRangoCOmisionProducto();
        setData(response);
      } catch (error) {
        toast.error("Error: " + error);
      }
    })();
  }, [realod]);

  return (
    <div className="p-4">
      {/* Título */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Rango de Comisiones para Producto
      </h1>

      <RegistrarRangoComisionProductoModal  reload={realod} setReload={setReload}/>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 ">Nombre</th>
              <th className="px-4 py-2 ">Precio</th>
              <th className="px-4 py-2 ">Precio Mínimo</th>
              <th className="px-4 py-2 ">Precio Máximo</th>
              <th className="px-4 py-2 ">Comisión</th>
              <th className="px-4 py-2 ">Accion</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No hay datos para mostrar.
                </td>
              </tr>
            ) : (
              data.map((item, _) => (
                <tr key={item._id} className="text-center">
                  <td className="px-4 py-2">{item.nombre}</td>
                  <td className="px-4 py-2">{item.nombrePrecio}</td>
                  <td className="px-4 py-2">{item.precioMinimo}</td>
                  <td className="px-4 py-2">{item.precioMaximo}</td>
                  <td className="px-4 py-2">{item.comision}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-4">
                      {/*<button className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>*/}
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
