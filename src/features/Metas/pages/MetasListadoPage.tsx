import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { eliminarLlave, obtenerLlaves } from "../services/servicioMetas";
import type { Llave } from "../interfaces/llaves.inteface";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export const MetasListadoPage = () => {

  const { data: llaves = [], refetch } = useQuery<Llave[]>({
    queryKey: ["llaves"],
    queryFn: () => obtenerLlaves(),
  });
  async function eliminarLLave(id: string): Promise<void> {
    const response = await eliminarLlave(id);
    if(response.status === 200){
      toast.success("Llave eliminada exitosamente");
      refetch();
    }else{
      toast.error("Error al eliminar llave");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <Toaster />
      <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-slate-700">
            Resumen de Llaves
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    Sucursal
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    {"Cant. Monturas >="}
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    {"Precio Monturas >="}
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    {"Cant. Gafas >="}
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    {"Precio Gafas >="}
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    {"Cant. Lentes Contacto >="}
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    Marcas Monturas
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    Marcas Gafas
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 whitespace-pre-wrap break-words text-center">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {llaves.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="h-24 text-center bg-yellow-50 border-2 border-yellow-200 rounded-lg"
                    >
                      <p className="text-yellow-700 font-medium text-sm">
                        Aun no hay llaves listadas
                      </p>
                      <p className="text-yellow-500 text-xs">
                        Comienza agregando llaves para cada sucursal
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  llaves.map((llave, index) => (
                    <TableRow key={index} className="border-slate-200">
                      <TableCell className="font-medium text-slate-700 text-xs text-center">
                        {llave.sucursal}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs text-center">
                        {llave.montura}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs text-center">
                        {llave.precioMontura}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs text-center">
                        {llave.gafa}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs text-center">
                        {llave.precioGafa}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs text-center">
                        {llave.lenteDeContacto}
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        <div className="flex flex-wrap gap-1">
                          {llave.marcaMonturas.map((brand) => (
                            <Badge
                              key={brand}
                              variant="secondary"
                              className="text-xs bg-amber-100 text-amber-800"
                            >
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 text-xs">
                          {llave.marcaGafas.map((brand) => (
                            <Badge
                              key={brand}
                              variant="secondary"
                              className="text-xs bg-purple-100 text-purple-800"
                            >
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center justify-center text-xs">
                        <Button
                          variant="outline"
                          className="text-xs border-red-200 text-red-700 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition duration-300 ease-in-out flex items-center justify-center"
                          onClick={() => llave._id && eliminarLLave(llave._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
