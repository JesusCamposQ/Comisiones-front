import { useCallback, useEffect, useMemo, useState } from "react";

import { BookPlus, Frown } from "lucide-react";
import { Datum } from "../interfaces/producto.interface";
import { ModalRegistroSinComisionProducto } from "../components/ModalRegistroSinComisionProducto";
import toast, { Toaster } from "react-hot-toast";
import { Banner } from "@/app/components/Banner";
import { obtenerSinComisionProductoMontura } from "../services/serviciosComisionProducto";
import { exportarExcelProducto } from "../utils/exportarExcelProducto";
import Paginador from "@/app/components/Paginador";
import { Mensaje } from "@/app/components/Mensaje";
import { paginador } from "@/app/utils/paginador";
import { SelectFilter } from "@/app/components/SelectFilter";

interface FormValues {
  idcombinacion: string;
  codigo: string;
  tipoPrecio?: string;
}


export const SinComisionMonturaPage = () => {
  const [actualizar, setActualizar] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [open, setOpen] = useState(false);
  const [filtrarCombinacion, setFiltrarCombinacion] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [combinacionProducto, setCombinacionProducto] = useState<Datum[]>([]);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: "",
    tipoPrecio: "",
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    obtenerCombinaciones();
  }, []);
  const obtenerCombinaciones = async () => {
    setIsLoading(true);
    const datos = await obtenerSinComisionProductoMontura();
    setCombinacionProducto(datos);
    setIsLoading(false);
  };
  const refetch = () => {
    obtenerCombinaciones();
  };
  useEffect(() => {
    if (combinacionProducto) {
      const datosPaginados = paginador(combinacionProducto, 10, page);
      setFiltrarCombinacion(datosPaginados);
    }
  }, [combinacionProducto, page]);
  useEffect(() => {
    setTimeout(() => {
      if (actualizar) {
        toast.success("Comisiones actualizadas exitosamente");
        refetch();
      }
      setActualizar(false);
    }, 50);
  }, [actualizar]);
  useEffect(() => {
    refetch();
  }, []);

  const agregarComision = (combinacion: Datum) => {
    const descripcion = `${combinacion.tipoProducto} / ${combinacion.serie} / ${combinacion.codigoQR} / ${combinacion.marca} / ${combinacion.color}`;
    setOpen(true);
    setValor({ idcombinacion: combinacion._id!, codigo: descripcion, tipoPrecio: combinacion.tipoPrecio });
  };
  const descargar = async () => {
    setIsDownload(true);
    if (filteredData) {
      exportarExcelProducto(filteredData);
    }
    setIsDownload(false);
  };
  const combinaciones: Datum[] = combinacionProducto || [];
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const filteredData = useMemo(() => {
    let result = combinaciones;

    // Aplicar filtros en el orden correcto
    const filterOrder = ['tipoPrecio', 'marca', 'color', 'tipoMontura', 'serie', 'importe'];

    filterOrder.forEach(column => {
      const filterValues = activeFilters[column];
      if (filterValues && filterValues.length > 0) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return filterValues.includes(normalizedValue);
        });
      }
    });

    return result;
  }, [activeFilters]);
  // Función optimizada para manejar cambios de filtro
  const handleFilterChange = useCallback((column: string, selectedValues: string[]) => {
    setActiveFilters(prev => {
      // Si no hay cambio, no actualizar
      const currentValues = prev[column] || [];
      if (JSON.stringify(currentValues.sort()) === JSON.stringify(selectedValues.sort())) {
        return prev;
      }

      const newFilters = { ...prev };

      if (selectedValues.length === 0) {
        delete newFilters[column];
      } else {
        newFilters[column] = selectedValues;
      }

      return newFilters;
    });
  }, []);

  // Funciones específicas para cada filtro
  const handleTipoPrecioFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.tipoPrecio;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('tipoPrecio', selectedValues);
  }, [handleFilterChange]);

  const handleMarcaFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.marca;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('marca', selectedValues);
  }, [handleFilterChange]);

  const handleColorFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.color;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('color', selectedValues);
  }, [handleFilterChange]);

  const handleTipoMonturaFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.tipoMontura;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('tipoMontura', selectedValues);
  }, [handleFilterChange]);

  const handleImporteFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.importe;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('importe', selectedValues);
  }, [handleFilterChange]);

  const handleSerieFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.serie;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('serie', selectedValues);
  }, [handleFilterChange]);

  // Calcular datos disponibles para cada filtro
  const dataForMarca = useMemo(() => {
    let result = combinaciones;
    if (activeFilters.tipoPrecio) {
      result = result.filter(item => {
        const value = item.tipoPrecio;
        const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
        return activeFilters.tipoPrecio.includes(normalizedValue);
      });
    }
    return result;
  }, [activeFilters.tipoPrecio]);

  const dataForColor = useMemo(() => {
    let result = combinaciones;
    if (activeFilters.tipoPrecio) {
      result = result.filter(item => {
        const value = item.tipoPrecio;
        const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
        return activeFilters.tipoPrecio.includes(normalizedValue);
      });
    }
    if (activeFilters.marca) {
      result = result.filter(item => {
        const value = item.marca;
        const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
        return activeFilters.marca.includes(normalizedValue);
      });
    }
    return result;
  }, [activeFilters.tipoPrecio, activeFilters.marca]);

  const dataForTipoMontura = useMemo(() => {
    let result = combinaciones;
    ['tipoPrecio', 'marca', 'color'].forEach(column => {
      if (activeFilters[column]) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return activeFilters[column].includes(normalizedValue);
        });
      }
    });
    return result;
  }, [activeFilters.tipoPrecio, activeFilters.marca, activeFilters.color]);

  const dataForSerie = useMemo(() => {
    let result = combinaciones;
    ['tipoPrecio', 'marca', 'color', 'tipoMontura'].forEach(column => {
      if (activeFilters[column]) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return activeFilters[column].includes(normalizedValue);
        });
      }
    });
    return result;
  }, [activeFilters.tipoPrecio, activeFilters.marca, activeFilters.color, activeFilters.tipoMontura]);

  const dataForImporte = useMemo(() => {
    let result = combinaciones;
    ['tipoPrecio', 'marca', 'color', 'tipoMontura', 'serie'].forEach(column => {
      if (activeFilters[column]) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return activeFilters[column].includes(normalizedValue);
        });
      }
    });
    return result;
  }, [activeFilters.tipoPrecio, activeFilters.marca, activeFilters.color, activeFilters.tipoMontura, activeFilters.serie]);

  return (
    <div className="mx-auto flex flex-col gap-4">

      <Toaster />
      <Banner
        title="Registro Sin Comision"
        subtitle="Montura"
        handleDownload={descargar}
        isDownload={isDownload}
      />
      <div className="flex gap-4 justify-center items-center mx-auto p-5 bg-sky-50 rounded-lg border border-sky-300">
        <SelectFilter
          data={combinaciones}
          column="tipoPrecio"
          onFilter={handleTipoPrecioFilter}
          placeholder="Buscar tipo precio..."

          allowSorting={false}
        />
        <SelectFilter
          data={dataForMarca}
          column="marca"
          onFilter={handleMarcaFilter}
          placeholder="Buscar marca..."
          allowSorting={false}
        />
        <SelectFilter
          data={dataForColor}
          column="color"
          onFilter={handleColorFilter}
          placeholder="Buscar color..."
          allowSorting={true}
        />
        <SelectFilter
          data={dataForTipoMontura}
          column="tipoMontura"
          onFilter={handleTipoMonturaFilter}
          placeholder="Buscar tipo montura..."
          allowSorting={true}
        />
        <SelectFilter
          data={dataForSerie}
          column="serie"
          onFilter={handleSerieFilter}
          placeholder="Buscar serie..."
          allowSorting={true}
        />
        <SelectFilter
          data={dataForImporte}
          column="importe"
          onFilter={handleImporteFilter}
          placeholder="Buscar importe..."
          allowSorting={true}
        />
        {/* <FiltroProducto campos={campos} setFiltro={setFiltro} /> */}
      </div>
        <p className="mx-2 text-xs text-gray-500 dark:text-gray-400">
          Mostrando <span className="font-medium">{filteredData.length}</span>{" "}
          de <span className="font-medium">{filteredData.length}</span>{" "}
          registros
        </p>
      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] m-auto">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-blue-500 text-2xl">Cargando...</span>
        </div>
      ) : (
        <>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 uppercase">Codigo MIA</th>
                <th className="px-6 py-3 uppercase">Tipo Producto</th>
                <th className="px-6 py-3 uppercase">Serie</th>
                <th className="px-6 py-3 uppercase">Codigo QR</th>
                <th className="px-6 py-3 uppercase">Marca</th>
                <th className="px-6 py-3 uppercase">Color</th>
                <th className="px-6 py-3 uppercase">Tipo Precio</th>
                <th className="px-6 py-3 uppercase">Importe</th>
                <th className="px-6 py-3 uppercase">Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((combinacion: Datum, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4 text-xs">
                    {combinacion.codigoMia}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {combinacion.tipoProducto}
                  </td>
                  <td className="px-6 py-4 text-xs">{combinacion.serie}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.codigoQR}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.marca}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.color}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.tipoPrecio}</td>
                  <td className="px-6 py-4 text-xs">{combinacion.importe || 0}</td>
                  <td className="px-6 py-4 text-xs">
                    <button
                      className="px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md cursor-pointer"
                      type="button"
                      onClick={() => agregarComision(combinacion)}
                    >
                      <BookPlus />
                      Agregar Comision
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {Object.keys(activeFilters).length == 0 && (
              <tfoot>
                <Paginador filtrar={combinaciones} page={page} setPage={setPage} />
              </tfoot>
            )}
          </table>
          <Mensaje
            numeroElementos={filtrarCombinacion.length}
            isLoading={isLoading}
            mensaje="No se encontraron registros con los filtros aplicados"
            icono={<Frown className="w-12 h-12 text-gray-500" />}
            className="bg-gray-50 rounded-md mx-auto px-10 py-8 shadow-md border border-gray-100"
          />
        </>
      )}
      <ModalRegistroSinComisionProducto
        valor={valor}
        setOpen={setOpen}
        open={open}
        setActualizar={setActualizar}
      />
    </div>
  );
};
