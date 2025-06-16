import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Dispatch, SetStateAction } from "react"
import { ComsionRecetaFiltro } from "../interfaces/comsionRecetaFiltro"

interface Props {
  setFiltro: Dispatch<SetStateAction<ComsionRecetaFiltro>>
}

export const FiltroComision = ({ setFiltro }: Props) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <Table className="w-full text-left text-sm">
            <TableBody>
                <TableRow>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="tipoLente" placeholder="Tipo Lente" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="material" placeholder="Material" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="tratamiento" placeholder="Tratamiento" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="marcaLente" placeholder="Marca" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="tipoColorLente" placeholder="Tipo Color Lente" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="rango" placeholder="Rango" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                    <TableCell className="text-left m-0 p-2">
                        <input type="text" name="colorLente" placeholder="Color" className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200" onChange={onChange} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
