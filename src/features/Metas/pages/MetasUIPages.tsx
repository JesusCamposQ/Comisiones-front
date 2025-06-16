import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Target, Plus, Edit, Trash2, Building2, Search } from "lucide-react";
import { Datum } from "../interfaces/metas.interface";
import { useQuery } from "@tanstack/react-query";
import { eliminarMetas, obtenerMetas } from "../services/servicioMetas";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ModalEditarMetas } from "../components/ModalEditarMetas";

export default function MetasUIPages() {
  const [open, setOpen] = useState(false);
  const navigator = useNavigate();
  const [data, setData] = useState<Datum>({
    _id: "",
    sucursal: "",
    monturaMasGafa: 0,
    lenteDeContacto: 0,
  });
  const { data: metas, refetch } = useQuery<Datum[]>({
    queryKey: ["metas"],
    queryFn: obtenerMetas,
  });

  const [buscarSucursal, setBuscarSucursal] = useState("");
  const filtrarMetas = metas?.filter((item) =>
    item.sucursal.toLowerCase().includes(buscarSucursal.toLowerCase())
  );
  const handleAdd = () => {
    navigator("/metas/registro");
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("No se puede eliminar la meta");
      return;
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Lista de Metas</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Asignacion de llaves de comision por sucursal
          </p>
        </div>
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Metas por Sucursal</span>
                </CardTitle>
                <CardDescription>
                  Gestiona las metas de ventas de cada sucursal
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar sucursal..."
                    value={buscarSucursal}
                    onChange={(e) => setBuscarSucursal(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button
                  className="flex items-center space-x-2"
                  onClick={() => handleAdd()}
                >
                  <Plus className="h-4 w-4" />
                  <span>Nueva Meta</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="font-semibold uppercase">Sucursal</TableHead>
                    <TableHead className="font-semibold text-center uppercase">
                      Montura + Gafa
                    </TableHead>
                    <TableHead className="font-semibold text-center uppercase">
                      Lente de Contacto
                    </TableHead>
                    <TableHead className="font-semibold text-center uppercase">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrarMetas?.map((item) => (
                    <TableRow
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-blue-500" />
                          <span>{item.sucursal}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="font-semibold text-lg">
                              {item.monturaMasGafa}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="font-semibold text-lg">
                              {item.lenteDeContacto}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          className="text-[#2B3A42] cursor-pointer hover:text-white
                                 hover:bg-[#0E9181dc] "
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          className="text-[#2B3A42] cursor-pointer hover:text-white
                                 hover:bg-[#E15353] "
                          onClick={() => handleDelete(item._id || "")}
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
          </CardContent>
        </Card>
        {open && (
          <ModalEditarMetas
            open={open}
            setOpen={setOpen}
            data={data}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
}
