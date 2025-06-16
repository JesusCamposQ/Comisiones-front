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
import { useState } from "react";
import { Datum } from "./interfaces/producto.interface";
import { obtenerComisionProductoMontura } from "./services/serviciosComisionProducto";


const CombinacionProductoPage = () => {
  const [page, setPage] = useState(1);
  const { data: combinacionProducto, isLoading } = useQuery({
    queryKey: ['combinacion-producto', page],
    queryFn: () => obtenerComisionProductoMontura(20, page),
    staleTime: 60 * 1000 * 10,
  })
  console.log(combinacionProducto);
  const combinacion: Datum[] = combinacionProducto?.data || [];
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
        <span className="text-blue-500 text-2xl">Cargando...</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col m-auto">
      <h1 className="text-2xl font-bold text-center m-4 text-blue-500 uppercase">Combinación de productos Montura</h1>
      
      <Table className="w-[95%] m-auto p-2 rounded-md bg-white shadow-md">
        <TableCaption>Combinación de productos</TableCaption>
        <TableHeader className="bg-blue-100">
          <TableRow>
            <TableHead className="w-[80px]">TIPO PRODUCTO</TableHead>
            <TableHead>SERIE</TableHead>
            <TableHead>CODIGO QR</TableHead>
            <TableHead>MARCA</TableHead>
            <TableHead className="text-center">COLOR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {combinacion.map((combinacion: Datum) => (
            <>
              <TableRow key={combinacion._id} className="border-b-indigo-100 hover:bg-indigo-50">
                <TableCell className="font-medium">{combinacion.tipoProducto}</TableCell>
                <TableCell>{combinacion.serie}</TableCell>
                <TableCell>{combinacion.codigoQR}</TableCell>
                <TableCell>{combinacion.marca}</TableCell>
                <TableCell>{combinacion.color}</TableCell>
              </TableRow>
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
    </div>
  );
};

export default CombinacionProductoPage;


