import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Check, Minus, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

// Tipos TypeScript
interface FilterOption {
  value: any;
  label: string;
  count?: number;
}

interface FilterProps<T> {
  data: T[];
  column: keyof T;
  onFilter: (filteredData: T[]) => void;
  placeholder?: string;
  maxHeight?: string;
  showCount?: boolean;
  allowSorting?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

export function SelectFilter<T extends Record<string, any>>({
  data,
  column,
  onFilter,
  placeholder = "Buscar...",
  maxHeight = "300px",
  showCount = true,
  allowSorting = true
}: FilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedValues, setSelectedValues] = useState<Set<any>>(new Set());
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<FilterOption[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Generar opciones únicas con conteo
  useEffect(() => {
    const valueCount = new Map<any, number>();
    
    data.forEach(item => {
      const value = item[column];
      const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
      valueCount.set(normalizedValue, (valueCount.get(normalizedValue) || 0) + 1);
    });

    let uniqueOptions: FilterOption[] = Array.from(valueCount.entries()).map(([value, count]) => ({
      value,
      label: String(value),
      count
    }));

    // Aplicar ordenamiento si está configurado
    if (sortDirection) {
      uniqueOptions.sort((a, b) => {
        const aVal = a.value === '(En blanco)' ? '' : a.value;
        const bVal = b.value === '(En blanco)' ? '' : b.value;
        
        if (sortDirection === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    setOptions(uniqueOptions);
    
    // Seleccionar todos por defecto solo al inicializar
    if (!isInitialized && uniqueOptions.length > 0) {
      const allValues = new Set(uniqueOptions.map(opt => opt.value));
      setSelectedValues(allValues);
      setIsInitialized(true);
    }
  }, [data, column, sortDirection, isInitialized]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Aplicar filtro cuando cambian las selecciones (solo si está inicializado)
  useEffect(() => {
    if (!isInitialized) return;
    
    const filteredData = data.filter(item => {
      const value = item[column];
      const normalizedValue = value === null || value === undefined ? '(En blanco)' : String(value);
      return selectedValues.has(normalizedValue);
    });
    
    onFilter(filteredData);
  }, [selectedValues, data, column, onFilter, isInitialized]);

  // Filtrar opciones por texto de búsqueda
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleValueToggle = (value: any) => {
    const newSelected = new Set(selectedValues);
    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }
    setSelectedValues(newSelected);
  };

  const handleSelectAll = () => {
    const allValues = filteredOptions.map(opt => opt.value);
    setSelectedValues(new Set(allValues));
  };

  const handleDeselectAll = () => {
    setSelectedValues(new Set());
  };

  const handleSort = () => {
    if (!allowSorting) return;
    
    const newDirection: SortDirection = 
      sortDirection === null ? 'asc' :
      sortDirection === 'asc' ? 'desc' : null;
    
    setSortDirection(newDirection);
  };

  const getSortIcon = () => {
    switch (sortDirection) {
      case 'asc': return <ArrowUp className="w-3 h-3" />;
      case 'desc': return <ArrowDown className="w-3 h-3" />;
      default: return <ArrowUpDown className="w-3 h-3" />;
    }
  };

  const allSelected = filteredOptions.length > 0 && filteredOptions.every(opt => selectedValues.has(opt.value));
  const someSelected = filteredOptions.some(opt => selectedValues.has(opt.value));

  return (
    <div className="relative inline-block " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1 text-sm border border-sky-300 rounded hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <span className="uppercase text-sky-800 text-sm">{String(column).replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        {selectedValues.size < options.length && (
          <div className="w-2 h-2 bg-sky-600 rounded-full ml-1"></div>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-8 pr-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-2 border-b border-gray-200 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={allSelected ? handleDeselectAll : handleSelectAll}
                className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded"
              >
                <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                  {allSelected ? (
                    <Check className="w-3 h-3 text-blue-600" />
                  ) : someSelected ? (
                    <Minus className="w-3 h-3 text-blue-600" />
                  ) : null}
                </div>
                <span>{allSelected ? 'Deseleccionar todo' : 'Seleccionar todo'}</span>
              </button>
            </div>

            {/* Ordenamiento */}
            {allowSorting && (
              <button
                onClick={handleSort}
                className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded"
              >
                {getSortIcon()}
                <span>Ordenar</span>
              </button>
            )}
          </div>
          <div 
            className="overflow-y-auto"
            style={{ maxHeight }}
          >
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-gray-500">No se encontraron opciones</div>
            ) : (
              filteredOptions.map((option) => (
                <label
                  key={String(option.value)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                    {selectedValues.has(option.value) && (
                      <Check className="w-3 h-3 text-blue-600" />
                    )}
                  </div>
                  <span className="flex-1 truncate">{option.label}</span>
                  {showCount && (
                    <span className="text-gray-500 text-xs">({option.count})</span>
                  )}
                  <input
                    type="checkbox"
                    checked={selectedValues.has(option.value)}
                    onChange={() => handleValueToggle(option.value)}
                    className="sr-only"
                  />
                </label>
              ))
            )}
          </div>
          <div className="p-2 border-t border-gray-200 text-xs text-gray-600">
            {selectedValues.size} de {options.length} seleccionados
          </div>
        </div>
      )}
    </div>
  );
}

