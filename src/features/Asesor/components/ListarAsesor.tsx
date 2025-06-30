import { useEffect, useState } from "react";
import { gestor, listarAsesor } from "../services/asesorService";
import { ListarAsesorI } from "../interface/asesor";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCaption
} from "@/components/ui/table";
import toast, { Toaster } from "react-hot-toast";
export const ListarAsesor = () => {
  const [asesores, setAsesores] = useState<ListarAsesorI[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const response = await listarAsesor();
      setAsesores(response);
    } catch (error) {
      console.error(error);
    }
  };



  const asesoresFiltrados = asesores.filter(a =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

 const asignarGestor =  async(e: React.ChangeEvent<HTMLInputElement>, id: string) => {
  const isChecked = e.target.checked;
    try {
        const response = await gestor(id, isChecked)
        if(response.status == 200) {
            toast.success('Seleccionado correactamente')
        }
    } catch (error) {
        console.log(error);
        
    }
};


  return (
    <div className="p-6 bg-white rounded-lg shadow">
         <Toaster position="top-right" />
      <h2 className="text-2xl font-semibold mb-4">Listado de Asesores</h2>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <Table>
        <TableCaption>Gestión de gestores por sucursal</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Sucursal</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-center">Gestor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asesoresFiltrados.map((a) => (
            <TableRow key={a._id.toString()}>
              <TableCell className="font-medium">{a.sucursalNombre}</TableCell>
              <TableCell>{a.nombre}</TableCell>
              <TableCell className="text-center">
                <input
                  type="checkbox"
                  checked={a.gestor}
                    onChange={(e)=> asignarGestor(e,a._id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {asesores.length === 0 && (
        <p className="mt-4 text-gray-500">Cargando asesores...</p>
      )}
    </div>
  );
};
