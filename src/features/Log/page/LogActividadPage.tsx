import { useEffect, useState } from "react";
import { BuscadorLog } from "../components/BuscadorLog";
import toast from "react-hot-toast";
import { buscadorLogI, LogActividadI } from "../interface/log";
import { listarLogActividad } from "../service/LogActividadService";

export const LogActividadPage = () => {
  const [fechas, setFechas] = useState<buscadorLogI>({
    fechaFin: "",
    fechaInicio: "",
  });
  const [data, setData] = useState<LogActividadI[]>([]);

  useEffect(() => {
    if (fechas.fechaInicio && fechas.fechaFin) {
      listarLog();
    }
  }, [fechas]);

  const listarLog = async () => {
    try {
      const response = await listarLogActividad(fechas);
      setData(response);
    } catch (error) {
      toast.error("Error al listar logs");
    }
  };

  return (
    <div className="p-6">
      <BuscadorLog onFechaChange={setFechas} />

      <div className="mt-8 overflow-x-auto">
        {data.length > 0 ? (
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Acción</th>
                <th className="px-4 py-2 border">Descripción</th>
                <th className="px-4 py-2 border">Usuario</th>
                <th className="px-4 py-2 border">IP</th>
                <th className="px-4 py-2 border">Ruta</th>
                <th className="px-4 py-2 border">Esquema</th>
                <th className="px-4 py-2 border">Body</th>
                 <th className="px-4 py-2 border">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.map((log) => (
                <tr key={log._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{log.accion}</td>
                  <td className="px-4 py-2 border">{log.descripcion}</td>
                  <td className="px-4 py-2 border">{log.usuario}</td>
                  <td className="px-4 py-2 border">{log.ip}</td>
                  <td className="px-4 py-2 border">{log.path}</td>
                  <td className="px-4 py-2 border">{log.schema}</td>
                  <td className="px-4 py-2 border">
                    <pre className="whitespace-pre-wrap break-words text-xs text-gray-700">
                      {log.body}
                    </pre>
                  </td>

                     <td className="px-4 py-2 border">
                 {log.fecha.split('T')[0]} {log.fecha.split('T')[1]}                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-6">No hay resultados para mostrar.</p>
        )}
      </div>
    </div>
  );
};
