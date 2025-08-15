import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  setFiltro: Dispatch<SetStateAction<ComsionProductoFiltro>>;
}

// Configuración de campos para hacer el código más mantenible
const FILTER_FIELDS = [
  { key: 'codigoMia' as keyof ComsionProductoFiltro, name: 'codigoMia', placeholder: 'Código MIA' },
  { key: 'tipoProducto' as keyof ComsionProductoFiltro, name: 'tipoProducto', placeholder: 'Tipo Producto' },
  { key: 'serie' as keyof ComsionProductoFiltro, name: 'serie', placeholder: 'Serie' },
  { key: 'codigoQR' as keyof ComsionProductoFiltro, name: 'codigoQR', placeholder: 'Código QR' },
  { key: 'marca' as keyof ComsionProductoFiltro, name: 'marca', placeholder: 'Marca' },
  { key: 'color' as keyof ComsionProductoFiltro, name: 'color', placeholder: 'Color' },
  { key: 'tipoPrecio' as keyof ComsionProductoFiltro, name: 'tipoPrecio', placeholder: 'Tipo Precio' },
  { key: 'importe' as keyof ComsionProductoFiltro, name: 'importe', placeholder: 'Importe' },
] as const;

export const FiltroComisionProducto = ({ setFiltro }: Props) => {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Función optimizada para manejar cambios en los filtros con useCallback
  const handleFilterChange = useCallback((field: keyof ComsionProductoFiltro, value: string) => {
    const trimmedValue = value.trim();
    
    setFiltro((prevFiltro) => {
      if (!trimmedValue) {
        // Remover la propiedad si el valor está vacío
        const { [field]: _, ...newFiltro } = prevFiltro;
        return newFiltro;
      }
      
      const upperValue = trimmedValue.toUpperCase();
      
      // Solo actualizar si realmente cambió el valor
      if (prevFiltro[field] === upperValue) {
        return prevFiltro;
      }
      
      return { ...prevFiltro, [field]: upperValue };
    });
  }, [setFiltro]);

  // Función optimizada para limpiar filtros usando refs
  const handleClearFilters = useCallback(() => {
    setFiltro({});
    
    // Limpiar todos los inputs usando las referencias
    Object.values(inputRefs.current).forEach(input => {
      if (input) {
        input.value = '';
      }
    });
  }, [setFiltro]);

  // Componente reutilizable para los inputs de filtro
  const FilterInput = ({ field, name, placeholder }: {
    field: keyof ComsionProductoFiltro;
    name: string;
    placeholder: string;
  }) => (
    <input
      ref={(el) => { inputRefs.current[name] = el; }}
      type="text"
      name={name}
      placeholder={placeholder}
      className="border rounded-md p-2 w-full hover:bg-amber-50 hover:text-black focus:outline-none hover:border-blue-200 transition-colors duration-200"
      onChange={(e) => handleFilterChange(field, e.target.value)}
    />
  );

  return (
    <Table className="w-full text-left text-sm">
      <TableBody>
        <TableRow>
          {FILTER_FIELDS.map(({ key, name, placeholder }) => (
            <TableCell key={name} className="text-left m-0 p-2">
              <FilterInput
                field={key}
                name={name}
                placeholder={placeholder}
              />
            </TableCell>
          ))}
          <TableCell className="text-left m-0 p-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2 cursor-pointer transition-colors duration-200"
              onClick={handleClearFilters}
              aria-label="Limpiar filtros"
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