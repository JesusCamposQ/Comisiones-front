import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision"
import { useQuery } from "@tanstack/react-query"
import { eliminarMetas, obtenerMetas } from "../services/servicioMetas"
import { Datum } from "../interfaces/metas.interface"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import { ModalEditarMetas } from "../components/ModalEditarMetas"

export const MetasPages = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Datum>({
    _id: "",
    sucursal: "",
    monturaMasGafa: 0,
    lenteDeContacto: 0
  });
  const { data: metas, refetch } = useQuery<Datum[]>({
    queryKey: ["metas"],
    queryFn: obtenerMetas,
  });

  const handleDelete = async (id: string) => {
    if (!id){
        toast.error("No se puede eliminar la meta");
        return;
    };
    const response = await eliminarMetas(id);
    if (response?.status === 200) {
      toast.success("Metas eliminadas correctamente");
      refetch();
    }
    console.log(response);
  };

  const handleEdit = (item: Datum) => {
    setOpen(true);
    setData(item);
  };

  return (
    <div className="flex flex-col items-center justify-center m-auto gap-4">
        <Toaster position="top-right" />
        <h2 className="text-3xl font-bold leading-tight mb-4 text-[#54A8E0]">Lista de Metas</h2>
        <Table className="overflow-x-auto text-lg">
            <TableHeader className="bg-[#54A8E0]">
                <TableRow>
                    <TableHead className="text-[#0a354d] rounded-tl-lg">Sucursal</TableHead>
                    <TableHead className="text-[#0a354d] text-right">Montura + Gafa</TableHead>
                    <TableHead className="text-[#0a354d] text-right ">Lente de Contacto</TableHead>
                    <TableHead className="w-[100px] text-center rounded-tr-lg">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {metas?.map((item: Datum) => (
                    <TableRow key={item._id}>
                        <TableCell className="text-[#0a354d]">{item.sucursal}</TableCell>
                        <TableCell className="text-[#0a354d] text-right">{item.monturaMasGafa}</TableCell>
                        <TableCell className="text-[#0a354d] text-right">{item.lenteDeContacto}</TableCell>
                        <TableCell className="text-[#0a354d] text-center gap-2 flex">
                            <Button
                                variant="outline"
                                className="text-[#2B3A42] cursor-pointer hover:text-white
                                 hover:bg-[#055902dc] "
                                onClick={() => handleEdit(item)}
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="text-[#2B3A42] cursor-pointer hover:text-white
                                 hover:bg-[#BF3434] "
                                onClick={() => handleDelete(item._id || "")}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        {open && (
            <ModalEditarMetas open={open} setOpen={setOpen} data={data} refetch={refetch} />
        )} 
    </div>
  )
}

