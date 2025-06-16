import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import obtenerSinComsionProducto from "../services/obtenerSinComsionProducto";
import { Datum, Producto } from "../interfaces/producto.interface";
import { FiltroComisionProducto } from "./FiltroComisionProducto";

interface FormValues {
  idcombinacion: string;
  codigo: string;
}

interface ModalProps {
  setValor: Dispatch<SetStateAction<FormValues>>
  refrescar: boolean
}

export function ModalRegistro({ setValor, refrescar }: ModalProps) {
  const [filtro, setFiltro] = useState<ComsionProductoFiltro>({})
  const [close, setClose] = useState(false);
  const [page, setPage] = useState(1);
  const { data: combinacionProducto, isLoading, refetch } = useQuery<Producto>({
    queryKey: ['combinacion-producto', page],
    queryFn: () => obtenerSinComsionProducto(10, page, filtro),
    staleTime: 60 * 1000 * 10, // 10 minutos
  })
  const combinaciones: Datum[] = combinacionProducto?.data || [];
  console.log(filtro)
  const onSubmit = () => {
    setClose(false)
    setFiltro({})
  };
  useEffect(() => {
    setTimeout(() => {
      refetch()
    }, 100)
  }, [filtro, refrescar])
  return (
    <Dialog open={close} onOpenChange={setClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Combinaciones</Button>
      </DialogTrigger>
      <DialogContent className="w-[1200px] h-[800px]">
        <DialogHeader>
          <DialogTitle>Combinaciones</DialogTitle>
          <DialogDescription className="border-b p-2">
          <div className="flex justify-between items-center gap-4">
                <div className="flex items-center justify-center my-4">
                  <nav className="flex items-center justify-center gap-1">
                    <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setPage(page - 1)} disabled={page <= 1 || !combinacionProducto?.paginas}>Anterior</button>
                    <span className="px-2 text-sm">
                      Página {page} de {combinacionProducto?.paginas || 0}
                    </span>
                    <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setPage(page + 1)} disabled={page >= (combinacionProducto?.paginas || 1) || !combinacionProducto?.paginas}>Siguiente</button>
                  </nav>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md" type="button" onClick={onSubmit}>Seleccionar</button> 
                </div>
              </div>
              <FiltroComisionProducto setFiltro={setFiltro} />
          </DialogDescription>
        </DialogHeader>
        {
          isLoading ? (
            <div className="flex items-center justify-center h-[600px] m-auto">
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
              <span className="text-blue-500 text-2xl">Cargando...</span>
            </div>
          ) : (
            <form className="overflow-x-auto">
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
                      <td className="px-6 py-4 text-xs">{combinacion.tipoProducto}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.serie}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.codigoQR}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.marca}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.color}</td>
                      <td className="px-6 py-4">
                        <input
                          type="radio"
                          value={combinacion._id}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          onChange={() => setValor({ idcombinacion: combinacion._id, codigo: combinacion.codigoMia })}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          )}
      </DialogContent>
    </Dialog>
  )
}