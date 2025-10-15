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

  const [dataCompleta, setDataCompleta] = useState<LogActividadI[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(dataCompleta.length / itemsPerPage);

  useEffect(() => {
    if (fechas.fechaInicio && fechas.fechaFin) {
      listarLog();
    }
  }, [fechas]);

  const listarLog = async () => {
    try {
      const response = await listarLogActividad(fechas);
      setDataCompleta(response);
      setCurrentPage(1); // Reinicia a la página 1
    } catch (error) {
      toast.error("Error al listar logs");
    }
  };

  const paginatedData = dataCompleta.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <BuscadorLog
        onFechaChange={(nuevasFechas) => {
          setFechas(nuevasFechas);
        }}
      />

      <div className="mt-8 overflow-x-auto">
        {paginatedData.length > 0 ? (
          <>
            <table className="min-w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Acción</th>
                  <th className="px-4 py-2 border">Descripción</th>
                  <th className="px-4 py-2 border">Usuario</th>
                  <th className="px-4 py-2 border">Fecha</th>
                  <th className="px-4 py-2 border">IP</th>
                  <th className="px-4 py-2 border">Ruta</th>
                  <th className="px-4 py-2 border">Esquema</th>
                  <th className="px-4 py-2 border">Body</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{log.accion}</td>
                    <td className="px-4 py-2 border">{log.descripcion}</td>
                    <td className="px-4 py-2 border">{log.usuario}</td>
                    <td className="px-4 py-2 border">
                      {log.fecha.split("T")[0]} {log.fecha.split("T")[1]}
                    </td>
                    <td className="px-4 py-2 border">{log.ip}</td>
                    <td className="px-4 py-2 border">{log.path}</td>
                    <td className="px-4 py-2 border">{log.schema}</td>
                    <td className="px-4 py-2 border">
                      <pre className="whitespace-pre-wrap break-words text-xs text-gray-700">
                        {log.body}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginador manual */}
            <div className="mt-4 flex justify-center items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Anterior
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === pageNum
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No hay resultados para mostrar.
          </p>
        )}
      </div>
    </div>
  );
};
