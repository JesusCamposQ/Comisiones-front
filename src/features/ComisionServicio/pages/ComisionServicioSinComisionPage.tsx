import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BookPlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Banner } from "@/shared/components/Banner/Banner";
import { exportarServiciosExcel } from "../utils/exportarServiciciosExcel";
import { FiltroComisionServicio } from "../components/FiltroComisionServicio";
import { useFiltrarSinServicios } from "../hooks/FiltrarSinServicios";
import { Datum } from "../interfaces/comisionSinServicio";
import { ModalRegistroSinComisionServicio } from "../components/ModalRegistroSinComisionServicio";
import { obtenerServiciosSinComision } from "../services/servicios";

interface FormValues {
  idcombinacion: string;
  codigo: string;
  tipoPrecio?: string;
}

export const ComisionServicioSinComisionPage = () => {
  const [page, setPage] = useState(1);
  const [filtro, setFiltro] = useState<Datum>({});
  const [FiltrarServicio, setFiltrarServicio] = useState<Datum[]>([]);
  const [isDownload, setIsDownload] = useState(false);
  const [open, setOpen] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: "",
    tipoPrecio: "",
  });

  const { data: dataServicios, refetch } = useQuery({
    queryKey: ["comisiones-servicio", page],
    queryFn: () => obtenerServiciosSinComision(20, page),
    staleTime: 60 * 60 * 1000,
  });
  const descargar = async () => {
    setIsDownload(true);
    if (dataServicios) {
      exportarServiciosExcel(dataServicios?.data);
    }
    setIsDownload(false);
  };
  const agregarComision = (servicio: Datum) => {
    const descripcion = `${servicio.nombre}`;
    setOpen(true);
    setValor({ idcombinacion: servicio._id!, codigo: descripcion, tipoPrecio: servicio.tipoPrecio});
  };
  useEffect(() => {
    setTimeout(() => {
      if (actualizar) {
        toast.success("Comisiones actualizadas exitosamente");
        refetch();
      }
      setActualizar(false);
    }, 50);
  }, [actualizar]);

   const servicios: Datum[] = dataServicios?.data || [];
   useFiltrarSinServicios({servicios, filtro, setFiltrarServicio, page, setPage});  
  return (
    <div className="flex flex-col m-auto">
      <Toaster />
      <Banner
        title="Comision Sin Comision"
        subtitle="Servicios"
        handleDownload={descargar}
        isDownload={isDownload}
      />
      <FiltroComisionServicio setFiltro={setFiltro} />
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 dark:bg-slate-800">
            <TableHead className="font-bold">
              Nombre
            </TableHead>
            <TableHead className="font-bold">
              Tipo Precio
            </TableHead>
            <TableHead className="font-bold">
              Importe
            </TableHead>
            <TableHead className="font-bold text-right">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FiltrarServicio.map((servicio: Datum) => (
            <>
              <TableRow key={servicio._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                <TableCell className="font-medium text-[#2b4464]">
                  {servicio.nombre}
                </TableCell>
                <TableCell className="font-medium text-[#2b4464]">
                  {servicio.tipoPrecio}
                </TableCell>
                <TableCell className="font-medium text-[#2b4464]">
                  {servicio.importe}
                </TableCell>
                <TableCell>
                <button
                    className="px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md cursor-pointer"
                    type="button"
                    onClick={() => agregarComision(servicio)}
                  >
                    <BookPlus />
                    Agregar Comision
                  </button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <TableFooter className="border-[#385780]">
        <TableRow className="bg-[#F5F6F8] hover:bg-[#F5F6F8]">
          <TableCell className="w-full flex items-center justify-center">
            <nav
              className="flex items-center justify-center gap-2"
              aria-label="Pagination"
            >
              <button
                className="px-4 py-2 bg-[#385780] hover:bg-[#385780a2] text-white rounded-md shadow-md"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              >
                Anterior
              </button>
              <span className="px-2">
                Página {page} de {dataServicios?.paginas}
              </span>
              <button
                className="px-4 py-2 bg-[#385780] hover:bg-[#385780a2] text-white rounded-md shadow-md"
                onClick={() => setPage(page + 1)}
                disabled={page >= (dataServicios?.paginas || 1)}
              >
                Siguiente
              </button>
            </nav>
          </TableCell>
        </TableRow>
      </TableFooter>
      <ModalRegistroSinComisionServicio
        valor={valor}
        setOpen={setOpen}
        open={open}
        setActualizar={setActualizar}
      />
    </div>
  );
};
