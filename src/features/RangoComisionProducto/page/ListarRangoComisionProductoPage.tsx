import { useEffect, useState } from "react";
import { RegistrarRangoComisionProductoModal } from "../modal/RegistrarRangoComisionProductoModal";
import toast from "react-hot-toast";
import {
  descargarExcelRangoComisiones,
  eliminarComisionRangoProducto,
  listarRangoCOmisionProducto,
} from "../service/rangoComisionProductoService";
import { rangoCOmisionProductoI } from "../interface/rangoCOmisionProducto";
import { Trash2 } from "lucide-react";

export const ListarRangoComisionProductoPage = () => {
  const [data, setData] = useState<rangoCOmisionProductoI[]>([]);
  const [realod, setReload] = useState<boolean>(false);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroMinimo, setFiltroMinimo] = useState("");
  const [filtroMaximo, setFiltroMaximo] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await listarRangoCOmisionProducto(
          filtroNombre,
          filtroMinimo,
          filtroMaximo,
          filtroPrecio,
          pagina
        );
        setData(response.data);
        setTotalPaginas(response.pagina);
      } catch (error) {
        toast.error("Error: " + error);
      }
    })();
  }, [realod, filtroMinimo, filtroMaximo, filtroPrecio, filtroNombre, pagina]);

  const btnEliminar = async (id: string) => {
    try {
      const response = await eliminarComisionRangoProducto(id);
      console.log(response);

      if (response.status == 200) {
        setReload(!realod);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const btnDescargarExcel = async () => {
    try {
       await descargarExcelRangoComisiones(
        filtroNombre,
        filtroMinimo,
        filtroMaximo,
        filtroPrecio
      );
 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Rango de Comisiones para Producto
      </h1>
      {
        <div className="flex space-x-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
            onClick={() => btnDescargarExcel()}
          >
            Descargar Excel
          </button>
         {/* <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow">
            Cargar comisiones
          </button>*/}
        </div>
      }

      <RegistrarRangoComisionProductoModal
        reload={realod}
        setReload={setReload}
      />

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Buscar nombre"
                  onChange={(e) => setFiltroNombre(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  onChange={(e) => setFiltroMinimo(e.target.value)}
                  placeholder="Buscar mínimo"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Buscar máximo"
                  onChange={(e) => setFiltroMaximo(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  onChange={(e) => setFiltroPrecio(e.target.value)}
                  placeholder="Buscar por precio"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </th>
              <th className="px-4 py-2 text-center"></th>
            </tr>
          </thead>

          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 ">Nombre</th>

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
                  <td className="px-4 py-2">{item.precioMinimo}</td>
                  <td className="px-4 py-2">{item.precioMaximo}</td>
                  <td className="px-4 py-2">
                    <ul className="space-y-1">
                      {item.detalleRangoComisonProducto.map(
                        (detalle, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-800"
                          >
                            <span className="font-medium text-blue-600">
                              {detalle.nombrePrecio}
                            </span>
                            <span className="text-gray-500">-</span>
                            <span className="font-semibold">
                              {detalle.comision} bs
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-4">
                      {/*<button className="text-blue-600 hover:text-blue-800">
                        <Edit size={18} />
                      </button>*/}
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => btnEliminar(item._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className=" justify-between items-center mt-4">
          <button
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span>
            Página {pagina} de {totalPaginas}
          </span>

          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
