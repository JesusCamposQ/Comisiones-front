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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { DetalleComisionServicio } from "../components/DetalleComisionServicio";
import { Servicio } from "../interfaces/comisionServicio.interface";
import { Toaster } from "react-hot-toast";
import { Banner } from "@/shared/components/Banner/Banner";
import { FiltroComisionServicio } from "../components/FiltroComisionServicio";
import { FiltrarServicios } from "../hooks/FiltrarServicios";
import { Button } from "@/components/ui/button";
import obtenerServicios from "../services/servicios";
import { descargarServicios } from "../services/descargarServicios";

export const ComisionServicioPage = () => {
  const [page, setPage] = useState(1);
  const [filtro, setFiltro] = useState<Servicio>({});
  const [FiltrarServicio, setFiltrarServicio] = useState<Servicio[]>([]);
  const [isDownload, setIsDownload] = useState(false);
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const toggleDetalle = (index: number) => {
    setExpandedRowIndex((prev) => (prev === index ? null : index));
  };
  const { data: dataServicios } = useQuery({
    queryKey: ["comisiones-servicio", page],
    queryFn: () => obtenerServicios(20, page),
    staleTime: 60 * 60 * 1000,
  });
  const descargar = async () => {
    setIsDownload(true);
    if (dataServicios) {
      descargarServicios();
    }
    setIsDownload(false);
  };
   const servicios: Servicio[] = dataServicios?.data || [];
   FiltrarServicios({servicios, filtro, setFiltrarServicio, page, setPage});  
  return (
    <div className="flex flex-col m-auto">
      <Toaster />
      <Banner
        title="Comision por Servicio"
        subtitle="Servicios"
        handleDownload={descargar}
        isDownload={isDownload}
      />
      <FiltroComisionServicio setFiltro={setFiltro} />
      <Table className="w-[95%] m-auto p-4 rounded-lg bg-[#F5F6F8] shadow-md">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#2b4464] text-left uppercase font-bold text-md">
              Nombre
            </TableHead>
            <TableHead className="text-[#2b4464] text-left uppercase font-bold text-md">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FiltrarServicio.map((servicio: Servicio, index) => (
            <>
              <TableRow key={servicio._id}>
                <TableCell className="font-medium text-[#2b4464]">
                  {servicio.nombre}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDetalle(index)}
                    className={
                      expandedRowIndex === index
                        ? "bg-[#385780] text-white hover:bg-[#f3f3f4] hover:text-[#385780e1]"
                        : "bg-white text-[#385780] hover:bg-[#f3f3f4] hover:text-[#385780e1]"
                    }
                  >
                    {expandedRowIndex === index ? (
                      <span className="flex items-center gap-1 ">
                        <EyeOff className="w-4 h-4" />
                        Ocultar
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        Ver
                      </span>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRowIndex === index ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    {servicio.comisonServicio ? (
                      <DetalleComisionServicio
                        comisionesServicio={servicio.comisonServicio || []}
                      />
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <p className="font-medium flex items-center justify-center gap-2 text-gray-600">
                          <EyeOff className="w-5 h-5" />
                          No hay comisiones para este servicio
                        </p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ) : null}
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
    </div>
  );
};
