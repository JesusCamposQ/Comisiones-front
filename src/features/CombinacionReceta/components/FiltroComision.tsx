import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";
import { filtroCombinacionRecetaI } from "../interfaces/comisiones.interface";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  setFiltro: Dispatch<SetStateAction<filtroCombinacionRecetaI>>;
  className?: string;
}

export const FiltroComision = ({ setFiltro, className = "w-full text-left text-sm" }: Props) => {
  const onChange = (field: keyof filtroCombinacionRecetaI, value: string) => {
    if (!value.trim()) {
      setFiltro((prev) => {
        const newFiltro = { ...prev };
        delete newFiltro[field];
        return newFiltro;
      });
    } else {
      setFiltro((prev) => ({
        ...prev,
        [field]: value.toUpperCase(),
      }));
    }
  };
  const limpiarFiltro = () => {
    setFiltro({});
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  };
  return (
    <Table className={className}>
      <TableBody>
        <TableRow>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="tipoLente"
              placeholder="Tipo Lente"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("tipoLente", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="material"
              placeholder="Material"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("material", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="tratamiento"
              placeholder="Tratamiento"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("tratamiento", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="marcaLente"
              placeholder="Marca Lente"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("marcaLente", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="tipoColorLente"
              placeholder="Tipo Color Lente"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("tipoColorLente", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="rango"
              placeholder="Rango"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("rango", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="colorLente"
              placeholder="Color Lente"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("colorLente", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <Button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
               focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700
               dark:focus:ring-blue-800 flex items-center gap-2 cursor-pointer"
              onClick={limpiarFiltro}
            >
              <Trash2 className="w-4 h-4" />
              Limpiar
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
