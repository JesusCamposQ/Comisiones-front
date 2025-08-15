import { useCallback, useEffect, useMemo, useState } from "react";
import obtenerSinComsion, {
  descargarSinComision,
} from "../services/obtenerSinComision";
import { ModalRegistroSinComision } from "../components/ModalRegistroSinComision";
import toast, { Toaster } from "react-hot-toast";
import {
  CombinacionResponse,
} from "../interfaces/comisionReceta.interface";
import { Banner } from "@/shared/components/Banner/Banner";
import { BookPlus } from "lucide-react";
import Paginador from "@/shared/components/Paginador/Paginador";
import { SelectFilter } from "@/components/Filtro/SelectFilter";

interface FormValues {
  idcombinacion: string;
  codigo: string;
}

export const RegistroSinComisionReceta = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDownload, setIsDownload] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [open, setOpen] = useState(false);
  const [valor, setValor] = useState<FormValues>({
    idcombinacion: "",
    codigo: "",
  });
  const [combinacion, setCombinacion] = useState<CombinacionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const refetch = async () => {
    setIsLoading(true);
    try {
      const response = await obtenerSinComsion();
      setCombinacion(response);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (actualizar) {
        toast.success("Comisiones actualizadas exitosamente");
        refetch();
      }
      setActualizar(false);
    }, 100);
  }, [actualizar]);

  useEffect(() => {
    if (isSuccess) {
      setTotalPages(Math.ceil(combinacion?.length / 10 || 0));
    }
  }, [combinacion]);

  const agregarComision = (combinacion: CombinacionResponse) => {
    const descripcion = `${combinacion.tipoLente} / ${combinacion.material} / ${combinacion.tratamiento} / ${combinacion.marcaLente} / ${combinacion.tipoColorLente} / ${combinacion.rango} / ${combinacion.colorLente}`;
    setOpen(true);
    setValor({ idcombinacion: combinacion._id!, codigo: descripcion });
  };
  const descargar = async () => {
    setIsDownload(true);
    const response = await descargarSinComision();
    if (response.status === 200) {
      setIsDownload(false);
    }
  };

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const filteredData = useMemo(() => {
    let result = combinacion;

    // Aplicar filtros en el orden correcto
    const filterOrder = ['tipoLente', 'material', 'colorLente', 'marcaLente', 'tratamiento', 'tipoColorLente', 'rango'];

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
  const handleTipoLenteFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.tipoLente;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('tipoLente', selectedValues);
  }, [handleFilterChange]);

  const handleMaterialFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.material;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('material', selectedValues);
  }, [handleFilterChange]);

  const handleColorLenteFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.colorLente;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('colorLente', selectedValues);
  }, [handleFilterChange]);

  const handleMarcaLenteFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.marcaLente;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('marcaLente', selectedValues);
  }, [handleFilterChange]);

  const handleTratamientoFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.tratamiento;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('tratamiento', selectedValues);
  }, [handleFilterChange]);

  const handleTipoColorLenteFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.tipoColorLente;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('tipoColorLente', selectedValues);
  }, [handleFilterChange]);

  const handleRangoFilter = useCallback((filteredByThisColumn: any[]) => {
    const selectedValues = filteredByThisColumn.map(item => {
      const value = item.rango;
      return value === null || value === undefined ? '(En blanco)' : String(value);
    });
    handleFilterChange('rango', selectedValues);
  }, [handleFilterChange]);

  // Calcular datos disponibles para cada filtro

  const dataForMaterial = useMemo(() => {
    let result = combinacion;
    if (activeFilters.material) {
      result = result.filter(item => {
        const value = item.material;
        const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
        return activeFilters.material.includes(normalizedValue);
      });
    }
    if (activeFilters.tipoLente) {
      result = result.filter(item => {
        const value = item.tipoLente;
        const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
        return activeFilters.tipoLente.includes(normalizedValue);
      });
    }
    return result;
  }, [activeFilters.material, activeFilters.tipoLente]);

  const dataForColorLente = useMemo(() => {
    let result = combinacion;
    ['tipoLente', 'material', 'colorLente'].forEach(column => {
      if (activeFilters[column]) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return activeFilters[column].includes(normalizedValue);
        });
      }
    });
    return result;
  }, [activeFilters.material, activeFilters.tipoLente, activeFilters.marcaLente, activeFilters.colorLente]);

  const dataForMarcaLente = useMemo(() => {
    let result = combinacion;
    ['tipoLente', 'material', 'colorLente', 'marcaLente'].forEach(column => {
      if (activeFilters[column]) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return activeFilters[column].includes(normalizedValue);
        });
      }
    });
    return result;
  }, [activeFilters.tipoLente, activeFilters.material, activeFilters.colorLente, activeFilters.marcaLente]);

  const dataForTratamiento = useMemo(() => {
    let result = combinacion;
    ['tipoLente', 'material', 'colorLente', 'marcaLente', 'tratamiento'].forEach(column => {
      if (activeFilters[column]) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return activeFilters[column].includes(normalizedValue);
        });
      }
    });
    return result;
  }, [activeFilters.tipoLente, activeFilters.material, activeFilters.colorLente, activeFilters.marcaLente, activeFilters.tratamiento]);

  const dataForTipoColorLente = useMemo(() => {
    let result = combinacion;
    ['tipoLente', 'material', 'colorLente', 'marcaLente', 'tratamiento', 'tipoColorLente'].forEach(column => {
      if (activeFilters[column]) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return activeFilters[column].includes(normalizedValue);
        });
      }
    });
    return result;
  }, [activeFilters.tipoLente, activeFilters.material, activeFilters.colorLente, activeFilters.marcaLente, activeFilters.tratamiento, activeFilters.tipoColorLente]);

  const dataForRango = useMemo(() => {
    let result = combinacion;
    ['tipoLente', 'material', 'colorLente', 'marcaLente', 'tratamiento', 'tipoColorLente', 'rango'].forEach(column => {
      if (activeFilters[column]) {
        result = result.filter(item => {
          const value = item[column as keyof typeof item];
          const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
          return activeFilters[column].includes(normalizedValue);
        });
      }
    });
    return result;
  }, [activeFilters.tipoLente, activeFilters.material, activeFilters.colorLente, activeFilters.marcaLente, activeFilters.tratamiento, activeFilters.tipoColorLente, activeFilters.rango]);



  return (
    <div className="mx-auto flex flex-col gap-4">
      <Toaster />
      <Banner
        title="Registro Sin Comision"
        subtitle="Recetas"
        handleDownload={descargar}
        isDownload={isDownload}
      />
      <div className="flex gap-4 justify-center items-center mx-auto p-5 bg-sky-50 rounded-lg border border-sky-300">
        <SelectFilter
          data={combinacion}
          column="tipoLente"
          onFilter={handleTipoLenteFilter}
          placeholder="Buscar tipo lente..."
          allowSorting={false}
        />
        <SelectFilter
          data={dataForMaterial}
          column="material"
          onFilter={handleMaterialFilter}
          placeholder="Buscar material..."
          allowSorting={false}
        />
        <SelectFilter
          data={dataForColorLente}
          column="colorLente"
          onFilter={handleColorLenteFilter}
          placeholder="Buscar color lente..."
          allowSorting={true}
        />
        <SelectFilter
          data={dataForMarcaLente}
          column="marcaLente"
          onFilter={handleMarcaLenteFilter}
          placeholder="Buscar marca lente..."
          allowSorting={true}
        />
        <SelectFilter
          data={dataForTratamiento}
          column="tratamiento"
          onFilter={handleTratamientoFilter}
          placeholder="Buscar tratamiento..."
          allowSorting={true}
        />
        <SelectFilter
          data={dataForTipoColorLente}
          column="tipoColorLente"
          onFilter={handleTipoColorLenteFilter}
          placeholder="Buscar tipo color lente..."
          allowSorting={true}
        />
        <SelectFilter
          data={dataForRango}
          column="rango"
          onFilter={handleRangoFilter}
          placeholder="Buscar rango..."
          allowSorting={true}
        />
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
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Tipo Lente</th>
              <th className="px-6 py-3">Material</th>
              <th className="px-6 py-3">Tratamiento</th>
              <th className="px-6 py-3">Marca</th>
              <th className="px-6 py-3">Tipo Color Lente</th>
              <th className="px-6 py-3">Rango</th>
              <th className="px-6 py-3">Color</th>
              <th className="px-6 py-3">Tipo precio</th>
              <th className="px-6 py-3">Importe</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((combinacion: CombinacionResponse, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-6 py-4 text-xs">{combinacion.tipoLente}</td>
                <td className="px-6 py-4 text-xs">{combinacion.material}</td>
                <td className="px-6 py-4 text-xs">{combinacion.tratamiento}</td>
                <td className="px-6 py-4 text-xs">{combinacion.marcaLente}</td>
                <td className="px-6 py-4 text-xs">
                  {combinacion.tipoColorLente}
                </td>
                <td className="px-6 py-4 text-xs">{combinacion.rango}</td>
                <td className="px-6 py-4 text-xs">{combinacion.colorLente}</td>
                <td className="px-6 py-4 text-xs">{combinacion.tipoPrecio}</td>
                <td className="px-6 py-4 text-xs">{combinacion.importe}</td>
                <td className="px-6 py-4 text-xs">
                  <button
                    className="px-4 py-2 flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md"
                    type="button"
                    onClick={() => agregarComision(combinacion)}
                  >
                    {" "}
                    <BookPlus />
                    Agregar Comision
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {totalPages > 1 && (
            <Paginador
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              filtrar={filteredData}
            />
          )}
        </table>
      )}
      <div className="flex items-center justify-center">
        <ModalRegistroSinComision
          valor={valor}
          setOpen={setOpen}
          open={open}
          setActualizar={setActualizar}
        />
      </div>
    </div>
  );
};
