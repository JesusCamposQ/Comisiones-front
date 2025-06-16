import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table_detalle_comision"
import { ComisionServicio } from "../interfaces/comisionServicio.interface"

export const DetalleComisionServicio = ({comisionesServicio}: {comisionesServicio: ComisionServicio[]}) => {
  return (
    <div>
        <h2 className="text-lg font-bold mb-4 text-center uppercase">Detalle de Comision por Servicio</h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>TIPO PRECIO</TableHead>
                    <TableHead>Tipo de Comision</TableHead>
                    <TableHead>Monto</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {comisionesServicio.map((comisionServicio) => (
                    <TableRow key={comisionServicio._id}>
                        <TableCell>{comisionServicio.precio}</TableCell>
                        <TableCell>{comisionServicio.nombre}</TableCell>
                        <TableCell>{comisionServicio.monto}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}
