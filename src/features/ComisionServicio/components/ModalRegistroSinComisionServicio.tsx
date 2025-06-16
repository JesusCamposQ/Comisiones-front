import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Glasses, Plus, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision";
import formatoMoneda from "@/utils/formatoMoneda";
import { Datum, DatumSinComision, ServicioSinComision } from "../interfaces/comisionSinServicio";
import { registrarComisionServicio } from "../services/servicios";


interface FormValues {
  idcombinacion: string;
  codigo: string;
  tipoPrecio?: string;
}

interface ModalProps {
  valor: FormValues;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setActualizar: Dispatch<SetStateAction<boolean>>;
}
interface TipoPrecio {
  id: string
  nombre: string
}
const tipoComision = [
  { id: "comision1", nombre: "Comision 1" },
  { id: "comision2", nombre: "Comision 2" },
]
export function ModalRegistroSinComisionServicio({ valor, open, setOpen, setActualizar }: ModalProps) {
  const [comisiones, setComisiones] = useState<Datum[]>([])
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Datum>({
    mode: "onChange",
    defaultValues: {
      _id: "",
      codigoMia: "",
      nombre: "",
      comision: false,
      descripcion: "",
      comisionServicio: [],
      importe: 0,
      tipoPrecio: ""
    }
  });
  const onSubmit: SubmitHandler<Datum> = (data) => {
    if (valor.codigo === "") {
      toast.error("Debe agregar una combinacion");
      return;
    }
    data.importe = Number(data.importe);
    const existeTipoPrecio = comisiones.filter((comision) => comision.tipoPrecio === data.tipoPrecio).length >=2
    const existeTipoComision = comisiones.filter((comision) => comision.nombre === data.nombre).length >= 1
    if (existeTipoPrecio) {
      return toast.error("Solo se pueden listar 2 comisiones por tipo de precio")
    }
    if (existeTipoComision) {
      return toast.error("El tipo de comision ya fue listado")
    }
    setComisiones((prev) => [...prev, data]);
  }

  const eliminarComision = (index: number) => {
    const filteredComisiones = comisiones.filter((_, i) => i !== index);
    setComisiones(filteredComisiones);
  }
  const registrarComision = async () => {
    const data: DatumSinComision[] = []
    console.log("Comisiones 54355: ",comisiones);
    
    comisiones.forEach((comision: Datum) => {
      const { importe, tipoPrecio, nombre } = comision
      data.push({
        precio: tipoPrecio!, monto: importe!, nombre: nombre!
      })
    })
    const dataCombinacion: ServicioSinComision = {
      servicio: valor.idcombinacion,
      data: data
    }
    const { status } = await registrarComisionServicio(dataCombinacion)
    if (status === 200) {
      //toast.success("Comisiones registradas exitosamente");
      limpiarComisiones();
      setOpen(false)
      setActualizar(true)
    }
  }
  const limpiarComisiones = () => {
    setComisiones([]);
    reset();
  }
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      limpiarComisiones();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} >
      <Toaster />
      <DialogContent className="w-full h-full max-w-[750px] max-h-[700px] md:w-[750px] md:h-[610px] m-auto ">
        <DialogHeader>
          <DialogTitle className="uppercase text-center text-sm">Formulario Combinacion</DialogTitle>
          <DialogDescription className="border-b p-2">
            <h2 className="flex items-center justify-center gap-2 text-[12px] text-blue-600">< Glasses /> {valor.codigo}</h2>

          </DialogDescription>
        </DialogHeader>
          <form className=" w-2/3 mx-auto space-y-2" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-left text-[12px] mb-1" htmlFor="tipoPrecio">
                Tipo de Precio
              </label>
              <select {...register("tipoPrecio", { required: "Debe seleccionar un tipo de precio" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-[12px] dark:bg-gray-700 dark:border-gray-600
                                                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected disabled>Seleccione un tipo de precio</option>
                <option >{valor.tipoPrecio}</option>
              </select>
              {errors.tipoPrecio && <p className="text-red-500 text-xs mt-1">{errors.tipoPrecio.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left text-[12px] mb-1" htmlFor="tipoComision">
                Tipo de Comision
              </label>
              <select {...register("nombre", { required: "Debe seleccionar un tipo de comision" })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-[12px] dark:bg-gray-700 dark:border-gray-600
                                                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected disabled>Seleccione un tipo de comision</option>
                {tipoComision?.map((tipoComision: TipoPrecio) => (
                  <option key={tipoComision.id} value={tipoComision.nombre}>
                    {tipoComision.nombre}
                  </option>
                ))}
              </select>
              {errors.comision && <p className="text-red-500 text-xs mt-1">{errors.comision?.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left text-[12px] mb-1" htmlFor="importe">
                Monto
              </label>
              <input
                type="number"
                {...register("importe", {
                  required: "El monto debe ser mayor a cero",
                  min: 0.01,
                  pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: "El monto debe ser mayor a cero"
                  }
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
                                                     focus:ring-indigo-500 sm:text-sm h-[38px] text-[12px] dark:text-white dark:bg-gray-700 dark:border-gray-600
                                                      dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
                placeholder="Monto de comision"
              />
              {errors.importe && <p className="text-red-500 text-xs mt-1">{errors.importe?.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Plus className="mr-2 h-4 w-4" /> Listar comision
              </button>
            </div>
          </form>
        <div className="m-auto w-2/3 flex flex-col">
          <p className="text-md font-bold mb-2 text-center uppercase">Comisiones listadas</p>
          <div className="overflow-y-auto max-h-[150px]">
          <Table className="rounded-md shadow-md">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-1/4 text-center text-[12px]">Tipo Precio</TableHead>
                <TableHead className="w-1/4 text-center text-[12px]">Comision</TableHead>
                <TableHead className="w-1/4 text-center text-[12px]">Monto</TableHead>
                <TableHead className="w-1/4 text-center text-[12px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comisiones.map((comision, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="text-center text-[12px]">{comision.tipoPrecio}</TableCell>
                  <TableCell className="text-center text-[12px]">{comision.nombre}</TableCell>
                  <TableCell className="text-center text-[12px]">{formatoMoneda(comision.importe || 0)}</TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Button
                      type="button"
                      className="flex items-center justify-center rounded-md bg-red-500 
                      px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => eliminarComision(index)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              className="flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={registrarComision}
            >
              Registrar comisiones
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}