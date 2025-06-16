import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Venta,
} from "./interfaces/venta.interface";
import obtenerVentas from "./services/obtenerVentas";
import { DetalleVenta } from "./components/DetalleVenta";
import { FiltroI } from "./interfaces/filtro.interface";
import { formatDate } from "@/shared/utils/formatDate";
import FiltroOC from "@/shared/components/Filtro/FiltroOC";
import { calcularComisionTotal,  totalImporte } from "./utils/ventaUtils";
import { Totales } from "./interfaces/totales.interface";
import formatoMoneda from "@/utils/formatoMoneda";
import { exportarVentaExcel } from "./utils/exportarVentaExcel";
import { Ordenar } from "@/shared/components/Ordenar/Ordenar";
import { ButtonDescarga } from "@/components/buttonDescarga";

const crearDatosConCamposCalculados = (datosBase: Venta[]) => {
  return datosBase.map((item) => ({
    ...item,
    importeTotal: totalImporte(item.ventas),
    totalComision: calcularComisionTotal(item.ventas, item.metaProductosVip, item.gafaVip,item.monturaVip, item.lenteDeContacto, item.empresa, item.sucursal),
  }))
}

const VentaPage = () => {
  const [ventas, setVentas]=useState<Venta[]>([])
  const [isLoading, setIsloading]=useState<boolean>(false)
  const [totales, setTotales]=useState<Totales>({
    totalTickets: 0,
    totalImporte: 0,
    totalDescuento: 0,
    totalGranTotal: 0,
    totalComision: 0,
    totalVentas: 0,
  })
  const [filtro, setFiltro] = useState<FiltroI>({
    empresa: '',
    sucursal: [],
    fechaInicio: formatDate(new Date().toLocaleDateString()),
    fechaFin: formatDate(new Date().toLocaleDateString()),
    sucursales: [],
    tipoVenta: [],
  });
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  useEffect(()=>{
     fetch() 
  },[filtro])

  useEffect(()=>{
    setTotales({
      totalTickets: ventas.reduce((acc, venta) => acc + venta.ventas.length, 0),
      totalImporte: Number(ventas.reduce((acc, venta) => acc + totalImporte(venta.ventas), 0).toFixed(2)),
      totalDescuento: Number(ventas.reduce((acc, venta) => acc + venta.totalDescuento, 0).toFixed(2)),
      totalGranTotal: Number(ventas.reduce((acc, venta) => acc + venta.montoTotal, 0).toFixed(2)),
      totalComision: Number(ventas.reduce((acc, venta) => acc + calcularComisionTotal(venta.ventas, venta.metaProductosVip, venta.gafaVip,venta.monturaVip, venta.lenteDeContacto, venta.empresa, venta.sucursal), 0).toFixed(2)),
      totalVentas: ventas.length,
    })
  },[ventas])

  const fetch =  async()=>{
    try {
      setIsloading(true)
      const { empresa, sucursales, ...rest } = filtro;
      const response = await obtenerVentas(rest)
      setVentas(response)      
      setVentas(() => crearDatosConCamposCalculados(response))
      setIsloading(false)
    } catch (error) {
      setIsloading(false)
      console.log(error);
    
    }
   }



  if(isLoading){
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
        <span className="text-blue-500 text-2xl">Cargando...</span>
      </div>
    );
  }

  const toggleDetalle = (index: number) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 min-h-screen bg-gradient-to-br from-gray-50 to-neutral-50 p-4">
      
      <FiltroOC setFiltros={setFiltro} initialFilters={filtro} />


      <div className="flex justify-end mb-2 mx-10">
        <ButtonDescarga handleDownload={() => exportarVentaExcel(ventas,filtro.fechaInicio, filtro.fechaFin )} isDownload={isLoading} />
      </div>
      <div className=" flex flex-col w-full h-full gap-4">
      <Table className="w-[95%] m-auto p-2 rounded-md bg-white shadow-md">
        <TableCaption>Lista de ventas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Ordenar setDatos={setVentas} datos={ventas} title="sucursal"/>
            </TableHead>
            <TableHead className="text-center">
              <Ordenar setDatos={setVentas} datos={ventas} title="asesor"/>
            </TableHead>
            <TableHead className="text-center">
              <Ordenar setDatos={setVentas} datos={ventas} title="ventas" rename="tickets"/>
            </TableHead>
            <TableHead className="text-center">
            <Ordenar setDatos={setVentas} datos={ventas} title="importeTotal" rename="Importe Total" />
            </TableHead>

            <TableHead className="text-center">
            <Ordenar setDatos={setVentas} datos={ventas} title="totalDescuento" rename="Descuento" />
            </TableHead>
           
            <TableHead className="text-center">
            <Ordenar setDatos={setVentas} datos={ventas} title="montoTotal" rename="Gran Total" />
            </TableHead>
            <TableHead className="text-center">
            <Ordenar setDatos={setVentas} datos={ventas} title="totalComision" rename="Total comisión" />
            </TableHead>
             
            <TableHead className="text-center">VENTAS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ventas?.map((venta: Venta, index: number) => (
            <>
              <TableRow key={index}>
                <TableCell className="font-medium">{venta.sucursal}</TableCell>
                <TableCell>{venta.asesor}</TableCell>
                <TableCell className="text-right">{venta.ventas.length}</TableCell>
                <TableCell className="text-right">{formatoMoneda(totalImporte(venta.ventas), venta.sucursal)}</TableCell>
                <TableCell className="text-right">{formatoMoneda(venta.totalDescuento, venta.sucursal)}</TableCell>
                <TableCell className="text-right">{formatoMoneda(venta.montoTotal, venta.sucursal)}</TableCell>
        
                <TableCell className="text-right">
                 {formatoMoneda(calcularComisionTotal(venta.ventas, venta.metaProductosVip, venta.gafaVip,venta.monturaVip, venta.lenteDeContacto, venta.empresa, venta.sucursal), venta.sucursal)}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => toggleDetalle(index)}
                  >
                    {expandedRowIndex === index ? "Ocultar" : "Ver"}
                  </button>
                </TableCell>
              </TableRow>
              {expandedRowIndex === index && (
                <TableRow className="text-center mx-auto">
                  <TableCell colSpan={9}>
                    <DetalleVenta ventas={venta.ventas} 
                    metaProductosVip={venta.metaProductosVip} 
                      empresa={venta.empresa}
                      gafaVip={venta.gafaVip}
                      lenteDeContacto={venta.lenteDeContacto}
                      monturaVip={venta.monturaVip} 
                      sucursal={venta.sucursal}
                    />
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>

            <TableCell className="text-right">{totales.totalTickets}</TableCell>
            <TableCell className="text-right">{formatoMoneda(totales.totalImporte)}</TableCell>
            <TableCell className="text-right">{formatoMoneda(totales.totalDescuento)}</TableCell>
            <TableCell className="text-right">{formatoMoneda(totales.totalGranTotal)}</TableCell>
            <TableCell className="text-right">{formatoMoneda(totales.totalComision)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </div>
    </div>
  );
};

export default VentaPage;





