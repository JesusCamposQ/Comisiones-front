import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Package,
  Eye,
  Contact,
  DollarSign,
  X,
  Save,
  List,
  Search,
  Trash,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { obtenerEmpresas } from "@/features/Empresa/services/obternerEmpresas";
import { obtenerSucursalByEmpresa } from "@/features/Sucursal/services/obtenerSurcusal";
import { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface";
import { obtenerMarcas, registrarLlaves } from "../services/servicioMetas";
import { Datum, Marcas } from "../interfaces/marcas.interface";
import Paginador from "@/shared/components/Paginador/Paginador";
import { Llave, LlavesData } from "../interfaces/llaves.inteface";
import toast, { Toaster } from "react-hot-toast";
import formatoMoneda from "@/utils/formatoMoneda";
import { AxiosError } from "axios";


export default function MetasUIPage() {
  const [selectedMarcaMonturas, setselectedMarcaMonturas] = useState<string[]>(
    []
  );
  const [selectedMarcaGafas, setselectedMarcaGafas] = useState<string[]>([]);
  const [selectedComisionar, setSelectedComisionar] = useState<string>("");
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<string>("");
  const [cantidadMonturas, setCantidadMonturas] = useState<number>(0);
  const [precioMonturas, setPrecioMonturas] = useState<number>(0);
  const [cantidadGafas, setCantidadGafas] = useState<number>(0);
  const [precioGafas, setPrecioGafas] = useState<number>(0);
  const [cantidadLentes, setCantidadLentes] = useState<number>(0);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [llaves, setLlaves] = useState<Llave[]>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>("");

  const removeBrand = (brand: string, type: "frame" | "glasses") => {
    if (type === "frame") {
      setselectedMarcaMonturas((prev) => prev.filter((b) => b !== brand));
    } else {
      setselectedMarcaGafas((prev) => prev.filter((b) => b !== brand));
    }
  };
  const empresas = useQuery({
    queryKey: ["empresas"],
    queryFn: () => obtenerEmpresas(),
    staleTime: 60 * 1000 * 10,
  });
  const { data: marcas, refetch } = useQuery({
    queryKey: ["marcas"],
    queryFn: () => obtenerMarcas(10, page, filter) as Promise<Marcas>,
    staleTime: 60 * 1000 * 10,
  });

  const buscarSucursal = async (empresaId: string) => {
    const sucursales = await obtenerSucursalByEmpresa(empresaId);
    setSucursales(sucursales);
  };
  const addBrand = (brand: string, type: "frame" | "glasses") => {
    if (type === "frame" && !selectedMarcaMonturas.includes(brand)) {
      setselectedMarcaMonturas((prev) => [...prev, brand]);
    } else if (type === "glasses" && !selectedMarcaGafas.includes(brand)) {
      setselectedMarcaGafas((prev) => [...prev, brand]);
    }
  };
  useEffect(() => {
    refetch();
  }, [page, filter]);

  const listarLLaves = async () => {
    if(cantidadMonturas < 0){
      toast.error("Debe agregar al menos 1 montura");
      return;
    }
    if(cantidadGafas < 0){
      toast.error("Debe agregar al menos 1 gafa");
      return;
    }
    if(cantidadLentes < 0){
      toast.error("Debe agregar al menos 1 lente de contacto");
      return;
    }
    if (!sucursalSeleccionada){
      toast.error("Seleccione una sucursal");
      return;
    };
    const llave: Llave = {
      montura: Number(cantidadMonturas),
      precioMontura: Number(precioMonturas),
      gafa: Number(cantidadGafas),
      precioGafa: Number(precioGafas),
      lenteDeContacto: Number(cantidadLentes),
      marcaMonturas: selectedMarcaMonturas,
      marcaGafas: selectedMarcaGafas,
      sucursal: sucursalSeleccionada,
    };
    setLlaves((prev) => [...prev, llave]);
  };
  
  const eliminarLLave = (index: number) => {
    const newLlaves = [...llaves];
    newLlaves.splice(index, 1);
    setLlaves(newLlaves);
  };
  const registrarLLaves = async () => {
    const data: LlavesData = {
      data: llaves
    }
  try{
    const llavesRegistradas = await registrarLlaves(data);
    if(llavesRegistradas.status === 201){
      toast.success("Llaves registradas exitosamente");
      limpiarCampos();
    }
  }catch(error){
    const e = error as AxiosError;
    if(e.status === 409){
      toast.error("Error: En alguna sucursal ya se han registrado las llaves");
    }
  }

  };
  const limpiarCampos = () => {
    setLlaves([]);
    setSucursalSeleccionada("");
    setselectedMarcaGafas([]);
    setselectedMarcaMonturas([]);
    setCantidadGafas(0);
    setCantidadLentes(0);
    setCantidadMonturas(0);
    setPrecioGafas(0);
    setPrecioMonturas(0);
    setSelectedComisionar("");
    document.querySelectorAll("select").forEach((select) => {
      select.value = select.getAttribute("defaultValue") || "";
    });
    (document.getElementById("cantidadMonturas") as HTMLInputElement).value = "";
    (document.getElementById("cantidadGafas") as HTMLInputElement).value = "";
    (document.getElementById("cantidadLentes") as HTMLInputElement).value = "";
    (document.getElementById("precioMonturas") as HTMLInputElement).value = "";
    (document.getElementById("precioGafas") as HTMLInputElement).value = "";
    (document.getElementById("precioLentes") as HTMLInputElement).value = "";
  };
  useEffect(() => {
    if(selectedComisionar === "precio"){
      setselectedMarcaGafas([]);
      setselectedMarcaMonturas([]);
    }
    if(selectedComisionar === "marca"){
      setPrecioMonturas(0);
      setPrecioGafas(0);
    }
  }, [selectedComisionar]);

  const marcasList: Datum[] = marcas?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <Toaster />
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Encabezado */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase">
            Gestión de Llaves
          </h1>
          <p className="text-slate-600">
            Administra tus llaves de manera eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Formulario */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información de Empresa y Sucursal */}
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Información de Empresa y Sucursal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="empresa"
                      className="text-sm font-medium text-slate-700"
                    >
                      Empresa
                    </Label>
                    <select
                      onChange={(e) => buscarSucursal(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      <option value="" disabled selected>
                        Seleccione una empresa
                      </option>
                      {empresas?.data?.map((empresa) => (
                        <option key={empresa._id} value={empresa._id}>
                          {empresa.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="sucursal"
                      className="text-sm font-medium text-slate-700"
                    >
                      Sucursal
                    </Label>
                    <select
                      onChange={(e) => setSucursalSeleccionada(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    >
                      <option value="" disabled selected>
                        Seleccione una sucursal
                      </option>
                      {sucursales?.map((sucursal: Sucursal) => (
                        <option key={sucursal._id} value={sucursal._id}>
                          {sucursal.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de Llaves */}

            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Package className="h-5 w-5 text-green-600" />
                  Información de Llaves
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-amber-600" />
                    <h3 className="font-semibold text-slate-700">Comisionar por:</h3>
                  </div>
                  <select 
                  onChange={(e) => setSelectedComisionar(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500">
                    <option value="">Seleccione una opción</option>
                    <option value="precio">Precio</option>
                    <option value="marca">Marca</option>
                  </select>
                </div>
                {/* Sección de Monturas */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-amber-600" />
                    <h3 className="font-semibold text-slate-700">Monturas</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Cantidad
                      </Label>
                      <Input
                        id="cantidadMonturas"
                        onChange={(e) => {
                          setCantidadMonturas(Number(e.target.value));
                        }}
                        type="number"
                        placeholder="0"
                        className="border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    {selectedComisionar === "precio" ? (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Precio
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="precioMonturas"
                          onChange={(e) => {
                            setPrecioMonturas(Number(e.target.value));
                          }}
                          min={1}
                          type="number"
                          placeholder="0.00"
                          className="pl-10 border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                          disabled={selectedComisionar !== "precio"}
                        />
                      </div>
                    </div>
                    ):(
                      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <p className="text-gray-700 text-sm">
                            Para comisionar precios, activa primero 
                            <span className="font-semibold text-indigo-600 ml-1">Comisionar por precio</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    )}

                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Sección de Gafas */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-600" />
                    <h3 className="font-semibold text-slate-700">Gafas</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Cantidad
                      </Label>
                      <Input
                        id="cantidadGafas"
                        onChange={(e) => setCantidadGafas(Number(e.target.value))}
                        type="number"
                        placeholder="0"
                        className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    {selectedComisionar === "precio" ? (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Precio
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="precioGafas"
                          onChange={(e) => setPrecioGafas(Number(e.target.value))}
                          type="number"
                          placeholder="0.00"
                          className="pl-10 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                          disabled={selectedComisionar !== "precio"}
                        />
                      </div>
                    </div>
                  ):(
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <p className="text-gray-700 text-sm">
                          Para comisionar precios, activa primero 
                          <span className="font-semibold text-indigo-600 ml-1">Comisionar por precio</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  )
                }
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Sección de Lentes de Contacto */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Contact className="h-4 w-4 text-teal-600" />
                    <h3 className="font-semibold text-slate-700">
                      Lentes de Contacto
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Cantidad
                    </Label>
                    <Input
                      id="cantidadLentes"
                      onChange={(e) => setCantidadLentes(Number(e.target.value))}
                      type="number"
                      placeholder="0"
                      className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sección de Marcas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Marcas de Monturas */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-slate-700">
                    Marcas de Monturas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedMarcaMonturas.map((brand) => (
                      <Badge
                        key={brand}
                        variant="secondary"
                        className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                      >
                        {brand}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0 hover:bg-amber-200"
                          onClick={() => removeBrand(brand, "frame")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Marcas de Gafas */}
              <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-slate-700">
                    Marcas de Gafas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedMarcaGafas.map((brand) => (
                      <Badge
                        key={brand}
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {brand}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-4 w-4 p-0 hover:bg-purple-200"
                          onClick={() => removeBrand(brand, "glasses")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Columna derecha - Listas de Marcas */}
          <div className="space-y-6">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-slate-700 text-center">
                  Lista de Marcas Disponibles
                </CardTitle>
                <div className="px-4 pt-2 flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  <Input
                    type="search"
                    placeholder="Buscar marca"
                    className="w-full border-slate-200 focus:border-slate-300 focus:ring-slate-300"
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="pr-4">
                  <div className="space-y-3">
                    {selectedComisionar === "marca" && marcasList ? (
                      marcasList.map((brand) => (
                        <div
                          key={brand._id}
                          className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50"
                        >
                          <span className="font-medium text-slate-700 text-xs">
                            {brand.nombre}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
                              onClick={() => addBrand(brand.nombre, "frame")}
                              disabled={selectedMarcaMonturas.includes(
                                brand.nombre
                              )}
                            >
                              + Montura
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
                              onClick={() => addBrand(brand.nombre, "glasses")}
                              disabled={selectedMarcaGafas.includes(brand.nombre)}
                            >
                              + Gafa
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center">
                        <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-700 font-medium text-xs">
                          <strong>Recuerda</strong> que debes seleccionar la opción <strong>"Comisionar por marca"</strong> 
                          para poder ver las marcas disponibles y elegir aquellas que deseas comisionar.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedComisionar === "marca" && (
                    <>
                      <Separator className="mt-4" />
                      <div>
                        <Paginador
                          page={page}
                          setPage={setPage}
                      itemsPerPage={10}
                      filtrar={marcasList || []}
                      totalPages={marcas?.pagina}
                    />
                  </div>
                  </>
                )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-sm"
          onClick={listarLLaves}>
            <List className="mr-2 h-4 w-4" />
            Listar Llaves
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-sm"
          onClick={registrarLLaves}
          disabled={llaves.length === 0}>
            <Save className="mr-2 h-4 w-4" />
            Registrar
          </Button>
        </div>

        {/* Tabla de Datos */}
        <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-slate-700">
              Resumen de Sucursales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="font-semibold text-slate-700">
                      Sucursal
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Cant. Monturas
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Precio Monturas
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Cant. Gafas
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Precio Gafas
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Cant. Lentes
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Marcas Monturas
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Marcas Gafas
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {llaves.length === 0 ? (
                    <TableRow >
                      <TableCell colSpan={9} className="h-24 text-center bg-yellow-50 border-2 border-yellow-200 rounded-lg">
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
                        <TableCell className="font-medium text-slate-700 text-xs">
                          {sucursales.find((sucursal) => sucursal._id === llave.sucursal)?.nombre}
                        </TableCell>
                        <TableCell className="text-slate-600 text-xs">
                          {llave.montura}
                        </TableCell>
                        <TableCell className="text-slate-600 text-xs">
                          {llave.precioMontura ? formatoMoneda(llave.precioMontura, sucursales.find((sucursal) => sucursal._id === llave.sucursal)?.nombre) : 0.00}
                        </TableCell>
                        <TableCell className="text-slate-600 text-xs">
                          {llave.gafa}
                        </TableCell>
                        <TableCell className="text-slate-600 text-xs">
                          {llave.precioGafa ? formatoMoneda(llave.precioGafa, sucursales.find((sucursal) => sucursal._id === llave.sucursal)?.nombre) : 0.00}
                        </TableCell>
                        <TableCell className="text-slate-600 text-xs">
                          {llave.lenteDeContacto}
                        </TableCell>
                        <TableCell className="text-xs">
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
                            onClick={() => eliminarLLave(index)}
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
    </div>
  );
}
