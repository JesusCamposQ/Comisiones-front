import { useEffect, useState } from "react";

import { BookPlus, Frown } from "lucide-react";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import { Datum } from "../interfaces/producto.interface";
import { FiltroComisionProducto } from "../components/FiltroComisionProducto";
import { ModalRegistroSinComisionProducto } from "../components/ModalRegistroSinComisionProducto";
import toast, { Toaster } from "react-hot-toast";
import { Banner } from "@/shared/components/Banner/Banner";
import { obtenerSinComisionProductoLenteContacto } from "../services/serviciosComisionProducto";
import { exportarExcelProducto } from "../utils/exportarExcelProducto";
import { FiltrarCombinacion } from "../hooks/FiltrarCombinacion";
import { useQuery } from "@tanstack/react-query";
import Paginador from "@/shared/components/Paginador/Paginador";
import { Mensaje } from "@/shared/components/Mensaje/Mensaje";

interface FormValues {
  idcombinacion: string;
  codigo: string;
  tipoPrecio: string;
}

export const SinComisionLenteContactoPage = () => {
  const [filtro, setFiltro] = useState<ComsionProductoFiltro>({});
  const [actualizar, setActualizar] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [open, setOpen] = useState(false);
  const [filtrarCombinacion, setFiltrarCombinacion] = useState<Datum[]>([]);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: "",
    tipoPrecio: "",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Número de elementos por página

  const {
    data: combinacionProducto,
    isLoading,
    refetch,
  } = useQuery<Datum[]>({
    queryKey: ["combinacion-sin-comision-producto-lente-contacto", page],
    queryFn: () => obtenerSinComisionProductoLenteContacto(),
    staleTime: 60 * 1000 * 10, // 10 minutos
  });

  useEffect(() => {
    setTimeout(() => {
      if (actualizar) {
        toast.success("Comisiones actualizadas exitosamente");
      }
      setActualizar(false);
    }, 50);
  }, [actualizar]);
  useEffect(() => {
    refetch();
  }, [filtro]);

  const agregarComision = (combinacion: Datum) => {
    const descripcion = `${combinacion.tipoProducto} / ${combinacion.serie} / ${combinacion.codigoQR} / ${combinacion.marca} / ${combinacion.color}`;
    setOpen(true);
    setValor({
      idcombinacion: combinacion._id!,
      codigo: descripcion,
      tipoPrecio: combinacion.tipoPrecio || "",
    });
  };

  const descargar = async () => {
    setIsDownload(true);
    if (!combinacionProducto) return;
    await exportarExcelProducto(combinacionProducto);
    setIsDownload(false);
  };
  const combinaciones: Datum[] = combinacionProducto || [];
  FiltrarCombinacion({ combinaciones, filtro, setFiltrarCombinacion, setPage, page });
  // Calcular datos paginados
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const datosPaginados = filtrarCombinacion.slice(startIndex, endIndex);

  return (
    <div className="mx-auto flex flex-col gap-4">
      <Toaster />
      <Banner
        title="Registro Sin Comision"
        subtitle="Lente Contacto"
        handleDownload={descargar}
        isDownload={isDownload}
      />
      <FiltroComisionProducto setFiltro={setFiltro} />
      <p className="mx-2 text-xs text-gray-500 dark:text-gray-400">
        Mostrando <span className="font-medium">{datosPaginados.length}</span>{" "}
        de <span className="font-medium">{filtrarCombinacion.length}</span>{" "}
        registros
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] m-auto">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-blue-500 text-2xl">Cargando...</span>
        </div>
      ) : (
        <>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 uppercase">Codigo MIA</th>
                <th className="px-6 py-3 uppercase">Tipo Producto</th>
                <th className="px-6 py-3 uppercase">Serie</th>
                <th className="px-6 py-3 uppercase">Codigo QR</th>
                <th className="px-6 py-3 uppercase">Marca</th>
                <th className="px-6 py-3 uppercase">Color</th>
                <th className="px-6 py-3 uppercase">Tipo Precio</th>
                <th className="px-6 py-3 uppercase">Importe</th>
                <th className="px-6 py-3 uppercase">Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {filtrarCombinacion &&
                filtrarCombinacion.map((combinacion: Datum, index: number) => (
                  <tr
                    key={combinacion._id + index}
                    className="border-b border-gray-200"
                  >
                    <td className="px-6 py-4 text-xs">
                      {combinacion.codigoMia}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {combinacion.tipoProducto}
                    </td>
                    <td className="px-6 py-4 text-xs">{combinacion.serie}</td>
                    <td className="px-6 py-4 text-xs">
                      {combinacion.codigoQR}
                    </td>
                    <td className="px-6 py-4 text-xs">{combinacion.marca}</td>
                    <td className="px-6 py-4 text-xs">{combinacion.color}</td>
                    <td className="px-6 py-4 text-xs">
                      {combinacion.tipoPrecio}
                    </td>
                    <td className="px-6 py-4 text-xs">{combinacion.importe}</td>
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
          </table>

          {/* Paginación mejorada */}
          {Object.keys(filtro).length == 0 && (
          <Paginador
            filtrar={filtrarCombinacion}
            page={page}
            setPage={setPage}
          />)}
          {/* Mensaje cuando no hay datos */}
          <Mensaje
            numeroElementos={filtrarCombinacion.length}
            isLoading={isLoading}
            mensaje="No se encontraron registros con los filtros aplicados"
            icono={<Frown className="w-12 h-12 text-gray-500" />}
            className="bg-gray-50 rounded-md mx-auto px-10 py-8 shadow-md border border-gray-100"
          />
        </>
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
