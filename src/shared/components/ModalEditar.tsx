import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { editarComisionProducto } from "@/features/ComisionProducto/services/serviciosComisionProducto";


interface FormValues {
    idComision: string;
    monto: number;
    precio: string;
}

interface ModalProps {
    valor: FormValues;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setActualizar: Dispatch<SetStateAction<boolean>>;
}


export function ModalEditar({ valor, open, setOpen, setActualizar }: ModalProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: {
            monto: valor.monto,
        }
    });


    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const { status } = await editarComisionProducto(valor.idComision, Number(data.monto))
        if (status === 200) {
            toast.success("Comision editada exitosamente");
            setOpen(false)
            setActualizar(prev => !prev)
        }
    }
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange} >
            <Toaster />
            <DialogContent className="w-full h-full max-w-[400px] max-h-[300px] md:w-[400px] md:h-[300px] m-auto ">
                <DialogHeader>
                    <DialogTitle className="uppercase text-center text-lg">Editar Comision</DialogTitle>
                    <DialogDescription className="border-b p-2">
                    <label className="text-md font-medium text-gray-700" htmlFor="precio">
                            Tipo PRECIO: {valor.precio}
                        </label>
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-10 px-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 border-b border-gray-200 p-2">
                        <label className="text-md font-medium text-gray-700" htmlFor="monto">
                            Monto Comision
                        </label>
                        <Input type="number" {...register("monto", { required: "Debe ingresar un monto de comision" })} className="input-field" />
                        <p className="text-sm text-red-500">{errors.monto?.message}</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button
                            type="submit"
                            className="btn-save bg-[#3498db] hover:bg-[#2980b9] text-white font-bold py-2 px-4 rounded"
                        >
                            <Save className="mr-2 h-4 w-4" /> Guardar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}