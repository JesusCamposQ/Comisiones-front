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
import obtenerSinComsion from "../services/obtenerSinComision";
import { FiltroComision } from "./FiltroComision";
import { ComsionRecetaFiltro } from "../interfaces/comsionRecetaFiltro";
import { CombinacionResponse} from "../interfaces/comisionReceta.interface";

interface FormValues {
  idcombinacion: string;
  codigo: string;
}

interface ModalProps {
  setValor: Dispatch<SetStateAction<FormValues>>
}

export function ModalRegistro({ setValor}: ModalProps) {
  const [filtro, setFiltro] = useState<ComsionRecetaFiltro>({})
  const [close, setClose] = useState(false);
  const [page, setPage] = useState(1);
  const { data: combinacionReceta, isLoading, refetch } = useQuery<CombinacionResponse[]>({
    queryKey: ['combinacion-receta', page],
    queryFn: () => obtenerSinComsion() as any,
    staleTime: 60 * 1000 * 10, // 10 minutos
  })
  const combinaciones: CombinacionResponse[] = combinacionReceta || [];
  console.log(filtro)
  const onSubmit = () => {
    setClose(false)
    setValor({idcombinacion: '', codigo: ''}) // se debe eliminar luego esta linea
    setFiltro({})
  };
  useEffect(() => {
    setTimeout(() => {
      refetch()
    }, 100)
  }, [filtro])

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
                    <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setPage(page - 1)} disabled={page <= 1 || !combinacionReceta?.length}>Anterior</button>
                    <span className="px-2 text-sm">
                      Página {page} de {combinacionReceta?.length || 0}
                    </span>
                    <button className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setPage(page + 1)} disabled={page >= (combinacionReceta?.length || 1) || !combinacionReceta?.length}>Siguiente</button>
                  </nav>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md" type="button" onClick={onSubmit}>Seleccionar</button> 
                </div>
              </div>
              <FiltroComision setFiltro={setFiltro} />
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
                    <th className="px-6 py-3">Tipo Lente</th>
                    <th className="px-6 py-3">Material</th>
                    <th className="px-6 py-3">Tratamiento</th>
                    <th className="px-6 py-3">Marca</th>
                    <th className="px-6 py-3">Tipo Color Lente</th>
                    <th className="px-6 py-3">Rango</th>
                    <th className="px-6 py-3">Color</th>
                    <th className="px-6 py-3">Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  {combinaciones.map((combinacion: CombinacionResponse) => (
                    <tr key={combinacion._id} className="border-b border-gray-200">
                      <td className="px-6 py-4 text-xs">{combinacion.tipoLente}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.material}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.tratamiento}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.marcaLente}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.tipoColorLente}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.rango}</td>
                      <td className="px-6 py-4 text-xs">{combinacion.colorLente}</td>
                      <td className="px-6 py-4">
                        <input
                          type="radio"
                          value={combinacion._id}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          //onChange={() => setValor({ idcombinacion: combinacion._id || '', codigo: combinacion.codigo || '' })}
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
