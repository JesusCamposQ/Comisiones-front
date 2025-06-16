import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  setFiltro: Dispatch<SetStateAction<ComsionProductoFiltro>>;
}

export const FiltroComisionProducto = ({ setFiltro }: Props) => {
  const onChange = (field: keyof ComsionProductoFiltro, value: string) => {
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
    <Table className="w-full text-left text-sm">
      <TableBody>
        <TableRow>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="codigoMia"
              placeholder="Codigo MIA"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("codigoMia", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="tipoProducto"
              placeholder="Tipo Producto"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("tipoProducto", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="serie"
              placeholder="Serie"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("serie", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="codigoQR"
              placeholder="Codigo QR"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("codigoQR", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("marca", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="color"
              placeholder="Color"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("color", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="tipoPrecio"
              placeholder="Tipo Precio"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("tipoPrecio", e.target.value)}
            />
          </TableCell>
          <TableCell className="text-left m-0 p-2">
            <input
              type="text"
              name="importe"
              placeholder="Importe"
              className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200"
              onChange={(e) => onChange("importe", e.target.value)}
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
