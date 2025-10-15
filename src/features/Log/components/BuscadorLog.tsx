import { useEffect, useState } from 'react';

type BuscadorLogProps = {
  onFechaChange: (fechas: { fechaInicio: string; fechaFin: string }) => void;
};

export const BuscadorLog = ({ onFechaChange }: BuscadorLogProps) => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    const hoy = new Date().toISOString().split('T')[0];
    setFechaInicio(hoy);
    setFechaFin(hoy);
  }, []);


  const handleBuscar = () => {
  

    onFechaChange({ fechaInicio, fechaFin });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Buscar Logs por Fecha</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="fechaInicio">
            Fecha de Inicio
          </label>
          <input
            type="date"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="fechaFin">
            Fecha de Fin
          </label>
          <input
            type="date"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleBuscar}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};
