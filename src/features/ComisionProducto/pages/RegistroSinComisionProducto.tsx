import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { BookPlus} from "lucide-react";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import obtenerSinComsionProducto, {
  descargarSinComisionProducto,
} from "../services/obtenerSinComsionProducto";
import { Datum, Producto } from "../interfaces/producto.interface";
import { FiltroComisionProducto } from "../components/FiltroComisionProducto";
import { ModalRegistroSinComisionProducto } from "../components/ModalRegistroSinComisionProducto";
import toast, { Toaster } from "react-hot-toast";
import { Banner } from "@/shared/components/Banner/Banner";

interface FormValues {
  idcombinacion: string;
  codigo: string;
}

export const RegistroSinComisionProducto = () => {
  const [filtro, setFiltro] = useState<ComsionProductoFiltro>({});
  const [actualizar, setActualizar] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: "",
  });
  const [page, setPage] = useState(1);
  const {
    data: combinacionProducto,
    isLoading,
    refetch,
  } = useQuery<Producto>({
    queryKey: ["combinacion-sin-comision-producto", page],
    queryFn: () => obtenerSinComsionProducto(10, page, filtro),
    staleTime: 60 * 1000 * 10, // 10 minutos
  });
  useEffect(() => {
    setTimeout(() => {
      if (actualizar) {
        toast.success("Comisiones actualizadas exitosamente");
        refetch();
      }
      setActualizar(false);
    }, 100);
  }, [actualizar]);
  useEffect(() => {
    refetch();
  }, [filtro]);

  const agregarComision = (combinacion: Datum) => {
    const descripcion = `${combinacion.tipoProducto} / ${combinacion.serie} / ${combinacion.codigoQR} / ${combinacion.marca} / ${combinacion.color}`;
    setOpen(true);
    setValor({ idcombinacion: combinacion._id!, codigo: descripcion });
  };
  const descargar = async () => {
    setIsDownload(true);
    const response = await descargarSinComisionProducto();
    if (response.status === 200) {
      setIsDownload(false);
    }
  };

  const combinaciones: Datum[] = combinacionProducto?.data || [];
  return (
    <div className="mx-auto flex flex-col gap-4">
      <Toaster />
      <Banner
      title="Registro Sin Comision"
      subtitle="Productos"
      handleDownload={descargar}
      isDownload={isDownload}
      />
      <FiltroComisionProducto setFiltro={setFiltro} />
      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] m-auto">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-blue-500 text-2xl">Cargando...</span>
        </div>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 uppercase">Tipo Producto</th>
              <th className="px-6 py-3 uppercase">Serie</th>
              <th className="px-6 py-3 uppercase">Codigo QR</th>
              <th className="px-6 py-3 uppercase">Marca</th>
              <th className="px-6 py-3 uppercase">Color</th>
              <th className="px-6 py-3 uppercase">Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {combinaciones.map((combinacion: Datum) => (
              <tr key={combinacion._id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-xs">
                  {combinacion.tipoProducto}
                </td>
                <td className="px-6 py-4 text-xs">{combinacion.serie}</td>
                <td className="px-6 py-4 text-xs">{combinacion.codigoQR}</td>
                <td className="px-6 py-4 text-xs">{combinacion.marca}</td>
                <td className="px-6 py-4 text-xs">{combinacion.color}</td>
                <td className="px-6 py-4 text-xs">
                  <button
                    className="px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md cursor-pointer"
                    type="button"
                    onClick={() => agregarComision(combinacion)}
                  >
                    <BookPlus />
                    Agregar Comision
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center justify-center my-4">
                <nav className="flex items-center justify-center gap-1">
                  <button
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1 || !combinacionProducto?.paginas}
                  >
                    Anterior
                  </button>
                  <span className="px-2 text-sm">
                    Página {page} de {combinacionProducto?.paginas || 0}
                  </span>
                  <button
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setPage(page + 1)}
                    disabled={
                      page >= (combinacionProducto?.paginas || 1) ||
                      !combinacionProducto?.paginas
                    }
                  >
                    Siguiente
                  </button>
                </nav>
              </div>
            </div>
          </tfoot>
        </table>
      )}
      <ModalRegistroSinComisionProducto
        valor={valor}
        setOpen={setOpen}
        open={open}
        setActualizar={setActualizar}
      />
    </div>
  );
};
