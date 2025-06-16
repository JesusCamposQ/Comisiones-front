import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Datum } from "../interfaces/metas.interface";
import { Dispatch, SetStateAction } from "react";
import { editarMetas } from "../services/servicioMetas";
import toast, { Toaster } from "react-hot-toast";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: Datum;
  refetch: () => void;
}

export const ModalEditarMetas = ({ open, setOpen, data, refetch }: ModalProps) => {
  const { register, handleSubmit } = useForm<Datum>({
    defaultValues: data,
  });
  const onSubmit: SubmitHandler<Datum> = async (valores) => {
    if(!valores._id){
      toast.error("No se puede editar la meta");
      return;
    }
    const response = await editarMetas(valores);
    if(response?.status === 200){
      setOpen(false);
      toast.success("Metas editadas correctamente");
      refetch();
    }
    
    
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <Toaster position="top-right" />
      <DialogContent className="w-[500px]">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-bold">Editar Metas</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Puedes editar las metas de la sucursal seleccionada
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("_id")} />
          <div className="flex flex-col space-y-2">
            <label htmlFor="sucursal" className="text-sm font-bold">
              Sucursal
            </label>
            <p>{data.sucursal}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="monturaMasGafa" className="text-sm font-bold">
              Montura + Gafa
            </label>
            <input
              type="number"
              {...register("monturaMasGafa")}
              className="bg-white border border-gray-300 rounded-lg p-2"
              defaultValue={data.monturaMasGafa}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="lenteDeContacto" className="text-sm font-bold">
              Lente de Contacto
            </label>
            <input
              type="number"
              {...register("lenteDeContacto")}
              className="bg-white border border-gray-300 rounded-lg p-2"
              defaultValue={data.lenteDeContacto}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-700"
          >
            Guardar
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
