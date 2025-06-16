import { TableBody, TableRow, TableCell } from "@/components/ui/table"
import { CombinacionResponse } from "@/features/ComisionReceta/interfaces/comisionReceta.interface"

export const TableCombinacion = ({combinacion}: {combinacion: CombinacionResponse[]}) => {
  return (
    <TableBody>
    {combinacion.map((combinacion:CombinacionResponse) => (
      <TableRow key={combinacion._id}>
        <TableCell className="font-medium">{combinacion.tipoLente}</TableCell>
        <TableCell>{combinacion.material}</TableCell>
        <TableCell>{combinacion.tratamiento}</TableCell>
        <TableCell>{combinacion.marcaLente}</TableCell>
        <TableCell>{combinacion.tipoColorLente}</TableCell>
        <TableCell>{combinacion.rango}</TableCell>
        <TableCell>{combinacion.colorLente}</TableCell>
        <TableCell className="text-right">{combinacion.tipoLente}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  )
}
