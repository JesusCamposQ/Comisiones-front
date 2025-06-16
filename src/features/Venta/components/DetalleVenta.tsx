import {
  MetaProductosVip,
  VentaElement,
} from "../interfaces/venta.interface";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calcularComision, porcentaje } from "../utils/ventaUtils";

export const DetalleVenta = ({
  ventas,
  metaProductosVip,
  empresa,
  gafaVip,
  lenteDeContacto,
  monturaVip,
  sucursal,
}: {
  ventas: VentaElement[];
  metaProductosVip: MetaProductosVip | null;
  gafaVip: number;
  monturaVip: number;
  lenteDeContacto: number;
  empresa: string;
  sucursal: string;

}) => {
  return (
    <div className="w-[98%] m-auto p-4 my-4 bg-gray-50 rounded-lg shadow-md">
      <Table>
        <TableCaption>Detalle de ventas del asesor</TableCaption>
        <TableHeader>
          <TableRow >
            <TableHead className="text-center" colSpan={2}>ID Venta</TableHead>
            <TableHead className="text-center">Tipo precio</TableHead>
            <TableHead className="text-center">Importe Total</TableHead>
            <TableHead className="text-center">Descuento</TableHead>
            <TableHead className="text-center">% Descuento</TableHead>
            <TableHead className="text-center">Gran total</TableHead>
            <TableHead className="text-center" >Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ventas.map((venta, index) => (
            <TableRow key={index}>
              <TableCell className="text-center" colSpan={2}>{venta.idVenta}</TableCell>
              <TableCell>{venta.precio}</TableCell>
              <TableCell className="text-right">{venta.detalle.reduce((acc, item) => acc + item.importe, 0)}</TableCell>
              <TableCell className="text-right">{venta.descuento}</TableCell>
              <TableCell className="text-right">{porcentaje(venta.detalle.reduce((acc, item) => acc + item.importe, 0), venta.descuento)} %</TableCell>
              <TableCell className="text-right font-semibold">{venta.montoTotal}</TableCell>
              <TableCell>
                {venta.detalle && venta.detalle.length > 0 ? (
                  <Table className="table-fixed m-auto text-sm border rounded-md bg-gray-50">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="px-2 py-1 text-left font-bold bg-gray-100" colSpan={2}>Descripción</TableHead>
                        <TableHead className="px-2 py-1 text-right font-bold bg-gray-100">Importe</TableHead>
                        <TableHead className="px-2 py-1 text-right font-bold bg-gray-100">Comision</TableHead>
                        <TableHead className="px-2 py-1 text-right font-bold bg-gray-100">Porcentaje</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {

                        venta.detalle.map((item, i) => {
                          const comision = calcularComision(item.comisiones, gafaVip, monturaVip, lenteDeContacto, metaProductosVip, empresa, porcentaje(venta.detalle.reduce((acc, item) => acc + item.importe, 0), venta.descuento), sucursal)

                          return <TableRow key={i} className="border-t border-zinc-300">
                            <TableCell className="px-2 py-1 bg-gray-100 text-left w-[500px] whitespace-pre-wrap break-words text-xs font-semibold" colSpan={2} >
                              {
                                item.producto
                                  ? `${item.producto.tipo} ${item.producto.descripcion}`
                                  : item.combinacion
                                    ? `${item.combinacion.descripcion}`
                                    : item.servicios
                                      ? `${item.servicios.tipo} - ${item.servicios.descripcion}`
                                      : item.otros
                                        ? `${item.otros.tipo} - ${item.otros.descripcion}`
                                        : "Información no disponible"
                              }
                            </TableCell>
                            <TableCell className="px-2 py-1 text-right">{item.importe}</TableCell>
                            <TableCell className="px-4 py-1 text-right">{comision.comison}</TableCell>
                            <TableCell className="px-4 py-1 text-right">{porcentaje(item.importe, calcularComision(item.comisiones, gafaVip, monturaVip, lenteDeContacto, metaProductosVip, empresa, porcentaje(venta.detalle.reduce((acc, item) => acc + item.importe, 0), venta.descuento),sucursal).comison).toFixed(2)} %</TableCell>
                          </TableRow>
                        })

                      }
                    </TableBody>
                  </Table>
                ) : (
                  <span className="text-gray-500">Sin detalle</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};





