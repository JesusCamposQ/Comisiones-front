import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

import { obtenerCombinacionReceta } from "../services/serviciosCombinacionReceta";
import { Fragment, useEffect, useState } from "react";
import {
  CombinacionResponse,
  ComisionReceta,
  filtroCombinacionRecetaI,
} from "../interfaces/comisiones.interface";
import { DetalleComision } from "../components/DetalleComision";
import descargarCombinacionReceta from "../services/descargaCombinacionReceta";
import { Buscador } from "../components/Buscador";
import { Banner } from "@/shared/components/Banner/Banner";
//import Londing from "@/shared/components/Londing";

const CombinacionRecetaPage = () => {
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<filtroCombinacionRecetaI>({
    colorLente: "",
    marcaLente: "",
    material: "",
    rango: "",
    tipoColorLente: "",
    tipoLente: "",
    tratamiento: "",
  });
  const [showDetalle, setShowDetalle] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [combinacionReceta, setCombinacionReceta] =
    useState<CombinacionResponse>();
  const [isDownload, setIsDownload] = useState(false);

  useEffect(() => {
    listar();
  }, [page, filter, update]);

  const listar = async () => {
    try {
      //setIsLoading(true);
      const response = await obtenerCombinacionReceta(20, page, filter);
      if (response.data) {
        setCombinacionReceta(response);
        //  setIsLoading(false);
      }
      return;
    } catch (error) {}
  };

  const handleDownload = () => {
    setIsDownload(true);
    descargarCombinacionReceta()
      .then(() => {
        setIsDownload(false);
      })
      .catch(() => {
        setIsDownload(false);
      });
  };

  return (
    <div className="flex flex-col m-auto p-10 w-full h-full gap-4">
      <Banner
        title="Comisiones"
        subtitle="Combinación de recetas"
        handleDownload={handleDownload}
        isDownload={isDownload}
      />
      <Buscador
        setFiltro={setFilter}
        className="grid grid-cols-7 grid-rows-1 gap-2"
      />
      <Table className="m-auto p-2 rounded-xl bg-white shadow-md">
        <TableCaption>Combinación de recetas</TableCaption>
        <TableHeader className="bg-blue-100">
          <TableRow>
            <TableHead>TIPO LENTE</TableHead>
            <TableHead>MATERIAL</TableHead>
            <TableHead>TRATAMIENTO</TableHead>
            <TableHead>MARCA</TableHead>
            <TableHead>TIPO COLOR LENTE</TableHead>
            <TableHead>RANGOS</TableHead>
            <TableHead>COLOR</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className="text-center">DETALLE COMISION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {combinacionReceta?.data.map((combinacion) => (
            <Fragment key={combinacion._id}>
              <TableRow
                key={`${combinacion._id}-fila`}
                className="border-b-indigo-100 hover:bg-indigo-50"
              >
                <TableCell className="font-medium">
                  {combinacion.tipoLente}
                </TableCell>
                <TableCell>{combinacion.material}</TableCell>
                <TableCell>{combinacion.tratamiento}</TableCell>
                <TableCell>{combinacion.marcaLente}</TableCell>
                <TableCell>{combinacion.tipoColorLente}</TableCell>
                <TableCell
                  className="text-left text-xs whitespace-pre-wrap break-words"
                >
                  {combinacion.rango}
                </TableCell>

                <TableCell className="text-right">
                  {combinacion.colorLente}
                </TableCell>
                <TableCell className="font-medium">
                  {combinacion._id.slice(-6).toUpperCase()}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 m-1"
                    onClick={() =>
                      setShowDetalle((c) =>
                        c !== combinacion._id ? combinacion._id : null
                      )
                    }
                  >
                    {showDetalle === combinacion._id
                      ? "Ocultar Detalle"
                      : "Mostrar Detalle"}
                  </button>
                </TableCell>
              </TableRow>
              {showDetalle === combinacion._id && (
                <TableRow key={`${combinacion._id}-detalle`}>
                  <TableCell colSpan={9} className="text-center mx-auto">
                    <DetalleComision
                      key={`${combinacion._id}-detalle`}
                      comisiones={
                        (combinacion.comisionReceta as ComisionReceta[]) || []
                      }
                      setUpdate={setUpdate}
                    />
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
        <TableFooter className="border-t-blue-400">
          <TableRow className="bg-blue-50 hover:bg-indigo-50">
            <TableCell className="w-full flex items-center justify-center">
              <nav
                className="flex items-center justify-center gap-2"
                aria-label="Pagination"
              >
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                >
                  Anterior
                </button>
                <span className="px-2">
                  Página {page} de {combinacionReceta?.paginas}
                </span>
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= (combinacionReceta?.paginas || 0)}
                >
                  Siguiente
                </button>
              </nav>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CombinacionRecetaPage;
