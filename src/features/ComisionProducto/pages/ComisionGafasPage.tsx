import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { Datum } from "../interfaces/producto.interface";
import { obtenerComisionProductoGafa } from "../services/serviciosComisionProducto";
import { DetalleComisionProducto } from "../components/DetalleComisionProducto";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import { FiltroComisionProducto } from "../components/FiltroComisionProducto";
import { exportarProducto } from "../utils/descargarExcel";
import { Banner } from "@/shared/components/Banner/Banner";


const ComisionGafasPage = () => {
  const [filtro, setFiltro] = useState<ComsionProductoFiltro>({})
  const [isDownload, setIsDownload] = useState(false);
  const [actualizar, setActualizar] = useState(false)
  const [page, setPage] = useState(1);
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
  const { data: combinacionProducto, isLoading, refetch } = useQuery({
    queryKey: ['combinacion-gafas', page],
    queryFn: () => obtenerComisionProductoGafa(20, page, filtro),
    staleTime: 60 * 1000 * 10,
  })
  const toggleDetalle = (index: number) => {
    setExpandedRowIndex((prev) => (prev === index ? null : index));
  };
  useEffect(() => {
    refetch()
  }, [actualizar, filtro])
  const combinacion: Datum[] = combinacionProducto?.data || [];
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
        <span className="text-blue-500 text-2xl">Cargando...</span>
      </div>
    );
  }
  const handleDownload = () => {
    setIsDownload(true);
    exportarProducto('gafa')
      .then(() => {
        setIsDownload(false);
      })
      .catch(() => {
        setIsDownload(false);
      });
  };
  return (
    <div className="flex flex-col m-auto">
      <Banner
      title="Comisiones de productos"
      subtitle="Gafas"
      handleDownload={handleDownload}
      isDownload={isDownload}
      />
      <FiltroComisionProducto setFiltro={setFiltro} />
      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] m-auto">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-blue-500 text-2xl">Cargando...</span>
        </div>
      ) : (

        <Table className="w-[95%] m-auto p-2 rounded-md bg-white shadow-md">
          <TableCaption>Combinación de productos</TableCaption>
          <TableHeader className="bg-blue-100">
            <TableRow>
              <TableHead className="w-[80px]">TIPO PRODUCTO</TableHead>
              <TableHead>SERIE</TableHead>
              <TableHead>CODIGO QR</TableHead>
              <TableHead>MARCA</TableHead>
              <TableHead className="text-center">COLOR</TableHead>
              <TableHead className="text-center">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {combinacion.map((combinacion: Datum, index: number) => (
              console.log(combinacion.comisionProducto),
              <>
                <TableRow key={combinacion._id} className="border-b-indigo-100 hover:bg-indigo-50">
                  <TableCell className="font-medium">{combinacion.tipoProducto}</TableCell>
                  <TableCell>{combinacion.serie!="null" ? combinacion.serie : ""}</TableCell>
                  <TableCell>{combinacion.codigoQR!="null" ? combinacion.codigoQR : ""}</TableCell>
                  <TableCell>{combinacion.marca!="null" ? combinacion.marca : ""}</TableCell>
                  <TableCell>{combinacion.color!="null" ? combinacion.color : ""}</TableCell>
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
                {expandedRowIndex === index && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      {
                        combinacion.comisionProducto?.length > 0 ? (
                          <DetalleComisionProducto comisiones={combinacion.comisionProducto} setUpdate={setActualizar} />
                        ) : (
                          <div className="bg-gray-50 p-4 rounded-md text-center">
                            <p className="font-medium flex items-center justify-center gap-2 text-gray-600"><EyeOff className="w-5 h-5" />No hay comisiones para este producto</p>
                          </div>
                        )
                      }
                    </TableCell>
                  </TableRow>
                )}
              </>

            ))}
          </TableBody>
          <TableFooter className="border-t-blue-400">
            <TableRow className="bg-blue-50 hover:bg-indigo-50">
              <TableCell className="w-full flex items-center justify-center">
                <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md" onClick={() => setPage(page - 1)} disabled={page <= 1}>Anterior</button>
                  <span className="px-2">
                    Página {page} de {combinacionProducto?.paginas}
                  </span>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md" onClick={() => setPage(page + 1)} disabled={page >= (combinacionProducto?.paginas || 0)}>Siguiente</button>
                </nav>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default ComisionGafasPage;


