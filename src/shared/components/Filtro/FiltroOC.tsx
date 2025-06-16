import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import { Filter, TriangleAlert, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { obtenerEmpresas } from "@/features/Empresa/services/obternerEmpresas"
import type { Empresa } from "@/features/Empresa/interfaces/empresa.interface"
import type { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface"
import { obtenerSucursalByEmpresa } from "@/features/Sucursal/services/obtenerSurcusal"
import type { FiltroI } from "@/features/Venta/interfaces/filtro.interface"
import { formatDate } from "@/shared/utils/formatDate"
import { DatePickerWithPresets } from "./components/data-picker-with-presets"
import obtenerTipoVentas from "@/features/Venta/services/obternerTipoVenta"
import type { TipoVenta } from "@/features/Venta/interfaces/tipoVenta.interface"
import toast, { Toaster } from "react-hot-toast"

interface FiltroProps {
    setFiltros: Dispatch<SetStateAction<FiltroI>>
    initialFilters: FiltroI
}

export default function FiltroOC({ setFiltros, initialFilters }: FiltroProps) {

    const { data: empresas = [] } = useQuery<Empresa[]>({
        queryKey: ["empresas"],
        queryFn: () => obtenerEmpresas(),
    })

    const { data: tipoVentas = [] } = useQuery<TipoVenta[]>({
        queryKey: ["tipoventas"],
        queryFn: () => obtenerTipoVentas(),
    })
    const definirFecha = (fecha: string/*"2025-05-11"*/): Date => {
        const [year, month, day] = fecha.split("-").map(Number)
        return new Date(year, month - 1, day)
    }

    const [filtro, setFiltro] = useState<{
        empresaId: string
        sucursalesIds: string[]
        tipoVentasIds: string[]
        fechaInicio: Date
        fechaFin: Date
        sucursalesList: Sucursal[]
    }>({
        empresaId: initialFilters?.empresa || "",
        sucursalesIds: initialFilters?.sucursal || [],
        tipoVentasIds: initialFilters?.tipoVenta || [],
        fechaInicio: initialFilters?.fechaInicio ? definirFecha(initialFilters.fechaInicio) : new Date(),
        fechaFin: initialFilters?.fechaFin ? definirFecha(initialFilters.fechaFin) : new Date(),
        sucursalesList: []
    })

    useEffect(() => {
        if (filtro.empresaId) {
            obtenerSucursalByEmpresa(filtro.empresaId)
                .then((sucursales) => {
                    setFiltro(prev => ({
                        ...prev,
                        sucursalesList: sucursales
                    }))
                })
                .catch((error) => {
                    console.error("Error fetching sucursales:", error)
                })
        } else {

            setFiltro(prev => ({
                ...prev,
                sucursalesList: [],
                sucursalesIds: []
            }))
        }
    }, [filtro.empresaId])

    const handleEmpresaChange = (value: string) => {
        removeFilterSucursales()
        setFiltro(prev => ({ ...prev, empresaId: value }))
    }

    const handleSucursalChange = (value: string) => {
        if (value === "todoLasSucursales") {
            setFiltro(prev => ({
                ...prev,
                sucursalesIds: prev.sucursalesList.map((sucursal: Sucursal) => sucursal._id)
            }))
            return
        }
        if (!filtro.sucursalesIds.includes(value)) {
            setFiltro(prev => ({
                ...prev,
                sucursalesIds: [...prev.sucursalesIds, value]
            }))
        }
    }

    const handleTipoVentaChange = (value: string) => {
        if (!filtro.tipoVentasIds.includes(value)) {
            setFiltro(prev => ({
                ...prev,
                tipoVentasIds: [...prev.tipoVentasIds, value]
            }))
        }
    }

    const removeFilterSucursal = (sucursalId: string) => {
        setFiltro(prev => ({
            ...prev,
            sucursalesIds: prev.sucursalesIds.filter(id => id !== sucursalId)
        }))
    }
    const removeFilterSucursales = () => {
        setFiltro(prev => ({
            ...prev,
            sucursalesIds: []
        }))
    }

    const removeFilterTipoVenta = (tipoVentaId: string) => {
        setFiltro(prev => ({
            ...prev,
            tipoVentasIds: prev.tipoVentasIds.filter(id => id !== tipoVentaId)
        }))
    }

    const clearAllFilters = () => {
        setFiltro({
            empresaId: "",
            sucursalesIds: [],
            tipoVentasIds: [],
            fechaInicio: new Date(),
            fechaFin: new Date(),
            sucursalesList: []
        })
    }

    const onClickBuscar = () => {
        if (filtro.empresaId === "") {
            toast((t) => (
                <div className="flex items-center justify-between bg-orange-100 border border-orange-300 rounded p-4">
                    <div className="flex items-center gap-4">
                        <TriangleAlert className="text-orange-500 h-8 w-8" />
                        <p className="text-orange-800 font-semibold">Debe seleccionar una empresa</p>
                    </div>
                    <button onClick={() => toast.dismiss(t.id)}>
                        <X className="text-orange-500 hover:text-orange-700 h-5 w-5" />
                    </button>
                </div>
            ))
            return
        }
        if (filtro.sucursalesIds.length === 0) {
            toast((t) => (
                <div className="flex items-center justify-between bg-orange-100 border border-orange-300 rounded p-4">
                    <div className="flex items-center gap-4">
                        <TriangleAlert className="text-orange-500 h-8 w-8" />
                        <p className="text-orange-800 font-semibold">Debe seleccionar al menos una sucursal</p>
                    </div>
                    <button onClick={() => toast.dismiss(t.id)}>
                        <X className="text-orange-500 hover:text-orange-700 h-5 w-5" />
                    </button>
                </div>
            ))
        }

        const sucursalesFiltradas = filtro.sucursalesIds
            .map(id => filtro.sucursalesList.find(s => s._id === id))
            .filter((s): s is Sucursal => s !== undefined)


        const tipoVentasFiltrados = filtro.tipoVentasIds
            .map(id => tipoVentas.find(tv => tv._id === id))
            .filter((tv): tv is TipoVenta => tv !== undefined)


        const datosFiltro: FiltroI = {
            empresa: filtro.empresaId || undefined,
            sucursal: filtro.sucursalesIds,
            fechaInicio: formatDate(filtro.fechaInicio.toLocaleDateString()),
            fechaFin: formatDate(filtro.fechaFin.toLocaleDateString()),
            sucursales: sucursalesFiltradas,
            tipoVenta: filtro.tipoVentasIds,
            tipoVentas: tipoVentasFiltrados,
        }

        setFiltros(datosFiltro)
    }


    const sucursalesFiltradas = filtro.sucursalesIds
        .map(id => filtro.sucursalesList.find(s => s._id === id))
        .filter((s): s is Sucursal => s !== undefined)


    const tipoVentasFiltrados = filtro.tipoVentasIds
        .map(id => tipoVentas.find(tv => tv._id === id))
        .filter((tv): tv is TipoVenta => tv !== undefined)


    const isFilterActive =
        filtro.empresaId !== "" ||
        filtro.sucursalesIds.length > 0 ||
        filtro.tipoVentasIds.length > 0 ||
        (filtro.fechaInicio &&
            filtro.fechaFin &&
            (formatDate(filtro.fechaInicio.toLocaleDateString()) !== formatDate(new Date().toLocaleDateString()) ||
                formatDate(filtro.fechaFin.toLocaleDateString()) !== formatDate(new Date().toLocaleDateString())))

    return (
        <div className="p-4 md:p-8">
            <Toaster position="top-right" />
            <Card className="w-full max-w-6xl mx-auto shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl font-medium">Filtros de Ventas</CardTitle>
                    <div className="text-sm text-muted-foreground">
                        Actualizado al:{" "}
                        {new Date().toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                        <div className="space-y-2">
                            <Label htmlFor="chain" className="text-sm font-medium">
                                Cadena
                            </Label>
                            <Select value={filtro.empresaId} onValueChange={handleEmpresaChange}>
                                <SelectTrigger id="chain" className="w-full">
                                    <SelectValue placeholder="Seleccione una cadena" />
                                </SelectTrigger>
                                <SelectContent>
                                    {empresas.map((empresa: Empresa) => (
                                        <SelectItem key={empresa._id} value={empresa._id}>
                                            {empresa.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="branch" className="text-sm font-medium">
                                Sucursal
                            </Label>
                            <Select
                                value={filtro.sucursalesIds.length === 1 ? filtro.sucursalesIds[0] : ""}
                                onValueChange={handleSucursalChange}
                                disabled={!filtro.empresaId || filtro.sucursalesList.length === 0}
                            >
                                <SelectTrigger id="branch" className="w-full">
                                    {sucursalesFiltradas.length > 0 ? (
                                        `${sucursalesFiltradas.length} sucursales seleccionadas`
                                    ) : (
                                        <SelectValue placeholder="Seleccione una sucursal" />
                                    )}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todoLasSucursales">Todos</SelectItem>
                                    {filtro.sucursalesList.map((sucursal: Sucursal) => (
                                        <SelectItem key={sucursal._id} value={sucursal._id}>
                                            {sucursal.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tipoVenta" className="text-sm font-medium">
                                Tipo de Venta
                            </Label>
                            <Select
                                value={filtro.tipoVentasIds.length === 1 ? filtro.tipoVentasIds[0] : ""}
                                onValueChange={handleTipoVentaChange}
                                disabled={!filtro.empresaId}
                            >
                                <SelectTrigger id="tipoVenta" className="w-full">
                                    {tipoVentasFiltrados.length > 0 ? (
                                        `${tipoVentasFiltrados.length} tipos de ventas seleccionados`
                                    ) : (
                                        <SelectValue placeholder="Seleccione un tipo de venta" />
                                    )}
                                </SelectTrigger>
                                <SelectContent>
                                    {tipoVentas.map((tipoVenta: TipoVenta) => (
                                        <SelectItem key={tipoVenta._id} value={tipoVenta._id}>
                                            {tipoVenta.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Rango de Fechas</Label>
                            <div className="w-full space-y-4 sm:space-y-0 sm:flex items-center sm:gap-4">
                                <div className="flex flex-col w-full sm:w-auto">
                                    <span className="text-sm text-gray-500 mb-1 sm:hidden">De:</span>
                                    <DatePickerWithPresets
                                        label="Fecha de Inicio"
                                        date={filtro.fechaInicio}
                                        setDate={(date: Date) => setFiltro(prev => ({ ...prev, fechaInicio: date }))}
                                        className="w-full text-gray-500"
                                    />
                                </div>
                                <div className="flex flex-col w-full sm:w-auto">
                                    <span className="text-sm text-gray-500 mb-1 sm:hidden">al:</span>
                                    <DatePickerWithPresets
                                        label="Fecha de Fin"
                                        date={filtro.fechaFin}
                                        setDate={(date: Date) => setFiltro(prev => ({ ...prev, fechaFin: date }))}
                                        className="w-full text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mostrar Filtros Activos */}
                    {isFilterActive && (
                        <>
                            <Separator className="my-4" />
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <div className="flex items-center">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <span className="text-sm font-medium">Sucursales seleccionadas:</span>
                                </div>
                                {sucursalesFiltradas.map((sucursal) => (
                                    <Badge key={sucursal._id} variant="secondary" className="flex items-center gap-1">
                                        {sucursal.nombre}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilterSucursal(sucursal._id)} />
                                    </Badge>
                                ))}
                            </div>
                            {tipoVentasFiltrados.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex items-center">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <span className="text-sm font-medium">Tipos de ventas seleccionados:</span>
                                    </div>
                                    {tipoVentasFiltrados.map((tipoVenta) => (
                                        <Badge key={tipoVenta._id} variant="secondary" className="flex items-center gap-1">
                                            {tipoVenta.nombre}
                                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilterTipoVenta(tipoVenta._id)} />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            {(filtro.sucursalesIds.length > 0 || filtro.tipoVentasIds.length > 0) && (
                                <div>
                                    <Separator className="my-4" />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={clearAllFilters}
                                        className="text-xs font-medium rounded-full px-4 py-1 bg-orange-500 hover:bg-orange-600 border-2 border-orange-500 hover:border-orange-600 text-white hover:text-white transition duration-300 ease-in-out"
                                    >
                                        <span className="text-white hover:text-white">Limpiar</span> todos los filtros
                                    </Button>
                                </div>
                            )}
                        </>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button className="px-8" onClick={onClickBuscar}>
                            Buscar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}