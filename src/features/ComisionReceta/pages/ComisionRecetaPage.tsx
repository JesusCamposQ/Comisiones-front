import { ModalRegistro } from "../components/ModalRegistro";
import { useForm, SubmitHandler } from "react-hook-form";
import { IComisionReceta, IComisionRecetaData } from "../interfaces/comisionReceta.interface";
import { useQueryClient } from "@tanstack/react-query";
import {registrarComisionReceta} from "../services/registrarComisionReceta";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { Trash2 } from "lucide-react";


interface FormValues {
  idcombinacion: string;
  codigo: string;
}

const ComisionRecetaPage = () => {
  const [comisiones, setComisiones] = useState<IComisionReceta[]>([]);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: ""
  })
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<IComisionReceta>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      precio: "",
      monto: 0,
      combinacionReceta: ""
    }
  });
  const onSubmit: SubmitHandler<IComisionReceta> = (data) => {
    if (valor.codigo === "") {
      toast.error("Debe agregar una combinacion");
      return;
    }
    data.monto = Number(data.monto);
    setComisiones((prev) => [...prev, data]);
  }
  const registrarComision = async () => {
    const dataCombinacion: IComisionRecetaData = {
      combinacionReceta: valor.idcombinacion,
      data: comisiones || []
    }
    console.log("Data Combinacion: ", dataCombinacion)
    const { status } = await registrarComisionReceta(dataCombinacion)
    if (status === 201) {
      toast.success("Comisiones registradas exitosamente");
      limpiarComisiones();
    }
    console.log("Data Combinacion: ", dataCombinacion)
    queryClient.invalidateQueries({ queryKey: ["comisiones"] });
  }
  const eliminarComision = (index: number) => {
    const filteredComisiones = comisiones.filter((_, i) => i !== index);
    setComisiones(filteredComisiones);
  }
  const limpiarComisiones = () => {
    setComisiones([]);
    setValor({
      idcombinacion: "",
      codigo: ""
    })
    reset();
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center">
        <h1 className="text-3xl uppercase">Registro de Comisiones Receta</h1>
      </div>
      <form className="mt-12 w-1/3 mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 text-left" htmlFor="email">
            Nombre de comision
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
            placeholder="Nombre de comision"
            {...register("nombre")}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-left" htmlFor="password">
            Tipo de Precio
          </label>
          <select
            {...register("precio")}
          >
            <option value="PRECIO 1">PRECIO 1</option>
            <option value="PRECIO 2">PRECIO 2</option>
            <option value="ECO 1">ECO 1</option>
            <option value="ECO 2">ECO 2</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-left" htmlFor="password">
            Monto
          </label>
          <input
            type="number"
            {...register("monto", {
              required: true,
              valueAsNumber: true
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12"
            placeholder="Monto de comision"
          />
        </div>

        <div className="space-y-2">
          <div className="flex flex-row gap-2">
            <label className="flex items-center justify-center gap-2">
              <ModalRegistro setValor={setValor} />
              <div className="mt-1 block w-full">
                <p className="text-md cursor-pointer font-medium text-gray-700 underline">{valor.codigo}</p>
              </div>
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Agregar comision
          </button>
        </div>
      </form>
      <div className="m-auto w-2/3 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Comisiones para registrar</h2>
        <p className="text-xl p-2 m-2">Combinacion de receta: {valor.codigo}</p>
        <Table className="rounded-md shadow-md">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-1/3">Nombre</TableHead>
              <TableHead className="w-1/3">Precio</TableHead>
              <TableHead className="w-1/3">Monto</TableHead>
              <TableHead className="w-1/3">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comisiones.map((comision, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4">{comision.nombre}</TableCell>
                <TableCell className="px-6 py-4">{comision.precio}</TableCell>
                <TableCell className="px-6 py-4">{comision.monto}</TableCell>
                <TableCell className="px-6 py-4">
                  <Button
                    type="button"
                    className="flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
    </>
  );
};

export default ComisionRecetaPage;
