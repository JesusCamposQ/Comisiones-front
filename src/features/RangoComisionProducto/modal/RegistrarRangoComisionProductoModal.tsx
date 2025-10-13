import { precioI } from "@/features/Precio/interface/precio";
import { listarPrecios } from "@/features/Precio/service/precioService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { rangoCOmisionProductoI } from "../interface/rangoCOmisionProducto";
import { registrarRangoCOmisionProducto } from "../service/rangoComisionProductoService";
import { AxiosError } from "axios";

export const RegistrarRangoComisionProductoModal = ({reload,setReload}:{reload:boolean, setReload:(v:boolean)=> void}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => setIsModalOpen(false);
  const [precios, setPrecios] = useState<precioI[]>([]);
  const { register, handleSubmit } = useForm<rangoCOmisionProductoI>();
  useEffect(() => {
    (async () => {
      try {
        const response = await listarPrecios();

        setPrecios(response);
      } catch (error) {
        toast.error("Error" + error);
      }
    })();
  }, [isModalOpen]);

  const onSubmit = async (data: rangoCOmisionProductoI) => {
    try {
      const response = await registrarRangoCOmisionProducto(data);

      if (response) {
        toast.success("Registrado");
        setReload(!reload)
      }
    } catch (error) {
      console.log(error);

      const e = error as AxiosError<any>;
      if (e.status == 400 && Array(e.response?.data.errors)) {
        for (const v of e.response?.data.errors) {
          toast.error(v.errors[0]);
        }
      }
  
      
      if (e.status == 409) {
        toast.error(e.response?.data.message);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-fit"
        >
          Registrar
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              Registrar Rango de Comisión
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium">Precio</label>
                <select
                  {...register("precio")}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Seleccione un precio</option>
                  {precios.map((item) => (
                    <option value={item._id}>{item.nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Comisión</label>
                <select
                  {...register("nombre")}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Seleccione una comisión</option>
                  <option value="COMISION 1">Comisión 1</option>
                  <option value="COMISION 2">Comisión 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Precio Mínimo
                </label>
                <input
                  {...register("precioMinimo", {
                    valueAsNumber: true,
                    value: 0,
                  })}
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Precio Máximo
                </label>
                <input
                  {...register("precioMaximo", {
                    valueAsNumber: true,
                    value: 0,
                  })}
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Comisión</label>
                <input
                  {...register("comision", { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
