import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import obtenerSinComsion, {
  descargarSinComision,
} from "../services/obtenerSinComision";
import { ComsionRecetaFiltro } from "../interfaces/comsionRecetaFiltro";
import { FiltroComision } from "../components/FiltroComision";
import { ModalRegistroSinComision } from "../components/ModalRegistroSinComision";
import toast, { Toaster } from "react-hot-toast";
import {
  CombinacionResponse,
} from "../interfaces/comisionReceta.interface";
import { Banner } from "@/shared/components/Banner/Banner";
import { BookPlus } from "lucide-react";
import Paginador from "@/shared/components/Paginador/Paginador";
import { paginador } from "@/shared/utils/paginador";

interface FormValues {
  idcombinacion: string;
  codigo: string;
}

export const RegistroSinComisionReceta = () => {
  const [filtro, setFiltro] = useState<ComsionRecetaFiltro>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filtrarCombinacion, setFiltrarCombinacion] = useState<CombinacionResponse[]>([]);
  const [isDownload, setIsDownload] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: "",
  });
  const {
    data: combinacionReceta,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery<CombinacionResponse[]>({
    queryKey: ["combinacion-receta"],
    queryFn: () => obtenerSinComsion() as any,
    staleTime: 60 * 1000 * 10, 
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
  useEffect(() => {
    if (isSuccess) {
      setTotalPages(Math.ceil(combinacionReceta?.length / 10 || 0));
    }
  }, [combinacionReceta]);

  const agregarComision = (combinacion: CombinacionResponse) => {
    const descripcion = `${combinacion.tipoLente} / ${combinacion.material} / ${combinacion.tratamiento} / ${combinacion.marcaLente} / ${combinacion.tipoColorLente} / ${combinacion.rango} / ${combinacion.colorLente}`;
    setOpen(true);
    setValor({ idcombinacion: combinacion._id!, codigo: descripcion });
  };
  const descargar = async () => {
    setIsDownload(true);
    const response = await descargarSinComision();
    if (response.status === 200) {
      setIsDownload(false);
    }
  };
useEffect(() => {
 if(!combinacionReceta) return;
    const filtrar = () => {
      const combinacionesFiltradas = combinacionReceta.filter((combinacion) => {
        return (
          (!filtro.tipoLente || combinacion.tipoLente?.toLowerCase().includes(filtro.tipoLente.toLowerCase())) &&
          (!filtro.material || combinacion.material?.toLowerCase().includes(filtro.material.toLowerCase())) &&
          (!filtro.tratamiento || combinacion.tratamiento?.toLowerCase().includes(filtro.tratamiento.toLowerCase())) &&
          (!filtro.marcaLente || combinacion.marcaLente?.toLowerCase().includes(filtro.marcaLente.toLowerCase())) &&
          (!filtro.tipoColorLente || combinacion.tipoColorLente?.toLowerCase().includes(filtro.tipoColorLente.toLowerCase())) &&
          (!filtro.rango || combinacion.rango?.toLowerCase().includes(filtro.rango.toLowerCase()))
        );
      });
      if (Object.keys(filtro).length === 0) {
        const datosPaginados = paginador(combinacionReceta, 10, page);
        setFiltrarCombinacion(datosPaginados);
        return;
      }
      setFiltrarCombinacion(combinacionesFiltradas);
      setPage(1);
    };
    filtrar();
}, [combinacionReceta, filtro, page]);
  
  return (
    <div className="mx-auto flex flex-col gap-4">
      <Toaster />
      <Banner
      title="Registro Sin Comision"
      subtitle="Recetas"
      handleDownload={descargar}
      isDownload={isDownload}
      />
      <FiltroComision setFiltro={setFiltro} />
      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] m-auto">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-blue-500 text-2xl">Cargando...</span>
        </div>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Tipo Lente</th>
              <th className="px-6 py-3">Material</th>
              <th className="px-6 py-3">Tratamiento</th>
              <th className="px-6 py-3">Marca</th>
              <th className="px-6 py-3">Tipo Color Lente</th>
              <th className="px-6 py-3">Rango</th>
              <th className="px-6 py-3">Color</th>
              <th className="px-6 py-3">Tipo precio</th>
              <th className="px-6 py-3">Importe</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtrarCombinacion?.map((combinacion: CombinacionResponse, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-6 py-4 text-xs">{combinacion.tipoLente}</td>
                <td className="px-6 py-4 text-xs">{combinacion.material}</td>
                <td className="px-6 py-4 text-xs">{combinacion.tratamiento}</td>
                <td className="px-6 py-4 text-xs">{combinacion.marcaLente}</td>
                <td className="px-6 py-4 text-xs">
                  {combinacion.tipoColorLente}
                </td>
                <td className="px-6 py-4 text-xs">{combinacion.rango}</td>
                <td className="px-6 py-4 text-xs">{combinacion.colorLente}</td>
                   <td className="px-6 py-4 text-xs">{combinacion.tipoPrecio}</td>
                       <td className="px-6 py-4 text-xs">{combinacion.importe}</td>
                <td className="px-6 py-4 text-xs">
                  <button
                    className="px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md"
                    type="button"
                    onClick={() => agregarComision(combinacion)}
                  >
                    {" "}
                    <BookPlus />
                    Agregar Comision
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {totalPages > 1 && (
            <Paginador
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              filtrar={filtrarCombinacion}
            />
          )}
        </table>
      )}
      <div className="flex items-center justify-center">
        <ModalRegistroSinComision
          valor={valor}
          setOpen={setOpen}
          open={open}
          setActualizar={setActualizar}
        />
      </div>
    </div>
  );
};
