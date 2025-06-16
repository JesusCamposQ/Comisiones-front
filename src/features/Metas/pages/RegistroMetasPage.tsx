import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table_detalle_comision";
import { useQuery } from "@tanstack/react-query";

import { Datum, Metas } from "../interfaces/metas.interface";
import { obtenerEmpresas } from "../../Empresa/services/obternerEmpresas";
import { obtenerSucursalByEmpresa } from "../../Sucursal/services/obtenerSurcusal";
import { Sucursal } from "../../Sucursal/interfaces/sucursal.interface";
import { Button } from "@/components/ui/button";
import { Building2, Download, Plus, Target, Trash2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { registrarMetas } from "../services/servicioMetas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const RegistroMetasPage = () => {
  const [datos, setDatos] = useState<Datum[]>();
  const [sucursales, setSucursales] = useState<Sucursal[]>();
  const { register, handleSubmit} = useForm<Datum>();
  const { data: empresas } = useQuery({
    queryKey: ["empresas"],
    queryFn: obtenerEmpresas,
  });
  const buscarSucursal = async (empresaId: string) => {
    const sucursales = await obtenerSucursalByEmpresa(empresaId);
    setSucursales(sucursales);
  };
  const onSubmit: SubmitHandler<Datum> = async (valores) => {
    if (!sucursales?.length) return;
    const nombre_sucursal = sucursales?.filter(
      (item) => item._id === valores.sucursal
    );
    const datos: Datum = {
      sucursal: valores.sucursal,
      nombre_sucursal: nombre_sucursal?.[0].nombre,
      monturaMasGafa: valores.monturaMasGafa,
      lenteDeContacto: valores.lenteDeContacto,
    };
    setDatos((prev) => (prev?.length ? [...prev, datos] : [datos]));
    //await registrarMetas(data);
  };
  const handleDelete = (sucursal: string) => {
    if (!datos?.length) return;
    if (!sucursal) return;
    if (sucursal.length === 0) {
      setDatos([]);
      return;
    }
    const newData = datos.filter(
      (dataValue) => dataValue.sucursal !== sucursal
    );
    setDatos(newData);
  };

  const handleExport = async () => {
    if (!datos?.length) return;
    const response: Metas = {
      data: datos.map((item: Datum) => {
        return {
          sucursal: item.sucursal,
          monturaMasGafa: Number(item.monturaMasGafa),
          lenteDeContacto: Number(item.lenteDeContacto),
        };
      }),
    };
    try {
      await registrarMetas(response);
      toast.success("Metas registradas correctamente");
    } catch (error) {
      toast.error("Error al registrar metas");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Registro de Metas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Se definen las llaves que se requieren para cada sucursal
          </p>
        </div>
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm p-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Plus className="w-5 h-5" />
              Registrar Nueva Meta
            </CardTitle>
            <CardDescription className="text-blue-100">
              Completa la información para establecer una meta específica por
              sucursal
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="company"
                    className="text-lg font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Empresa
                  </Label>
                  <select
                    onChange={(e) => buscarSucursal(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  >
                    <option value="" disabled selected>
                      Seleccione una empresa
                    </option>
                    {empresas?.map((empresa) => (
                      <option key={empresa._id} value={empresa._id}>
                        {empresa.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="branch"
                    className="text-lg font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    Sucursal
                  </Label>
                  <select
                    {...register("sucursal", { required: true })}
                    className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  >
                    {sucursales?.map((sucursal: Sucursal) => (
                      <option key={sucursal._id} value={sucursal._id}>
                        {sucursal.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  Montura + Gafa
                </label>
                <input
                  type="number"
                  {...register("monturaMasGafa", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  Lente de Contacto
                </label>
                <input
                  type="number"
                  {...register("lenteDeContacto", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 uppercase"
              >
                <Plus className="w-5 h-5 mr-2" />
                Listar Meta
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm p-0">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="w-5 h-5" />
                  Metas Listadas
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Aqui puedes ver la lista de metas para registrar por sucursal.
                </CardDescription>
              </div>
              <Button
                variant="secondary"
                onClick={handleExport}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 border-2 h-12 w-48 uppercase"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-8">
            {datos?.length === 0 ? (
              <div className="text-center py-6">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No hay metas listadas
                </h3>
                <p className="text-gray-500">
                  Comienza registrando tu primera meta usando el formulario
                  anterior
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table >
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-indigo-200 to-purple-200">
                      <TableHead className="text-lg font-semibold text-gray-700">Sucursal</TableHead>
                      <TableHead className="text-lg font-semibold text-gray-700">Montura + Gafa</TableHead>
                      <TableHead className="text-lg font-semibold text-gray-700">Lente de Contacto</TableHead>
                      <TableHead className="text-lg font-semibold text-gray-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {datos?.map((data: Datum) => (
                      <TableRow key={data.sucursal}>
                        <TableCell className="text-lg font-medium text-center">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-600" />
                            {data.nombre_sucursal}
                          </div>
                        </TableCell>
                        <TableCell className="text-lg font-medium text-center">
                          {data.monturaMasGafa}
                        </TableCell>
                        <TableCell className="text-lg font-medium text-center">
                          {data.lenteDeContacto}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            onClick={() => handleDelete(data.sucursal)}
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300"
                          >
                            <Trash2 className="w-3 h-3 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};
