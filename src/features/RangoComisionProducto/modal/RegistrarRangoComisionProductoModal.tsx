import { Empresa } from "@/features/Empresa/interfaces/empresa.interface";
import { obtenerEmpresas } from "@/features/Empresa/services/obternerEmpresas";
import { precioI } from "@/features/Precio/interface/precio";
import { listarPreciosPorScursal } from "@/features/Precio/service/precioService";
import { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface";
import { obtenerSucursalByEmpresa } from "@/features/Sucursal/services/obtenerSurcusal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registrarComisionRangoProducto } from "../service/rangoComisionProductoService";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const RegistrarRangoComisionProductoModal = ({
  reload,
  setReload,
}: {
  reload: boolean;
  setReload: (v: boolean) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [sucursal, setSucursal] = useState<string>("");
  const [empresa, setEmpresa] = useState<string>("");
  const [precios, setPrecios] = useState<precioI[]>([]);
  const [estado, setEstado] = useState<boolean>(false);
  const onClose = () => setIsModalOpen(false);

  const onSubmit = async (data: any) => {
    const detalle: any[] = [];

    const dataArray = Object.entries(data.comisiones).map(([id, comision]) => ({
      id,
      comision,
    }));

    for (const item of dataArray) {
      if (item.comision) {
        const comisionesArray = Object.entries(item.comision).map(
          ([comision1, comision2]) => ({
            comision1,
            comision2,
          })
        );
        for (const item2 of comisionesArray) {
          const bodyDetalle = {
            precio: item.id,
            comision: Number(item2.comision2),
          };
          detalle.push(bodyDetalle);
        }
      }
    }

    const body = {
      precioMinimo: data.rangoMinimo,
      precioMaximo: data.rangoMaximo,
      nombre: data.nombreRango,
      detalle: detalle,
    };
    try {
      const response = await registrarComisionRangoProducto(body);
      
      
      if (response.status == 201) {
        reset();
        setReload(!reload);
        toast.success("registrado")
      }
      
    } catch (error) {
        const e = error as AxiosError<any>   
        if(e.status == 409){
          toast.error(e.response?.data.message)
        }
    }

  };

  useEffect(() => {
    (async () => {
      try {
        const response = await obtenerEmpresas();
        setEmpresas(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isModalOpen]);

  useEffect(() => {
    (async () => {
      try {
        setSucursales([]);
        setSucursal("");
        reset((formValues) => ({
          ...formValues,
          empresa,
          sucursal: "",
          comisiones: {},
        }));
        const response = await obtenerSucursalByEmpresa(empresa);

        setEstado(!estado);
        setSucursales(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [empresa]);

  useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      empresa,
      sucursal: "",
      comisiones: {},
    }));
  }, [sucursal]);
  useEffect(() => {
    (async () => {
      try {
        let sucursalFiltrada: string[] = [];

        if (sucursal) {
          sucursalFiltrada = [sucursal];
        } else {
          sucursalFiltrada = sucursales.map((item) => item._id);
        }

        const response = await listarPreciosPorScursal(sucursalFiltrada);
        if (sucursalFiltrada.length > 2) {
          setPrecios(
            response.filter(
              (item) =>
                item.nombre != "OPT-PARAG 2" && item.nombre != "OPT-PARAG 1"
            )
          );
        } else {
          setPrecios(response);
        }
      } catch (error) {
      
      }
    })();
  }, [estado, sucursal]);
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
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xl text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-3">
              Registrar Rango de Comisión
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block font-medium mb-1">
                  Nombre del Rango
                </label>
                <input
                  {...register("nombreRango")}
                  type="text"
                  className="w-full border border-blue-600 px-2 py-1 rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-end">
                <div>
                  <label className="block mb-1 font-medium">Rango Mínimo</label>
                  <input
                    {...register("rangoMinimo", { valueAsNumber: true })}
                    defaultValue={0}
                    type="number"
                    className="w-full border border-blue-600 px-2 py-1 rounded"
                    required
                  />
                </div>
                <div className="self-end">Bs</div>
                <div>
                  <label className="block mb-1 font-medium">Rango Máximo</label>
                  <input
                    {...register("rangoMaximo", { valueAsNumber: true })}
                    defaultValue={0}
                    type="number"
                    className="w-full border border-blue-600 px-2 py-1 rounded"
                    required
                  />
                </div>
                <div className="self-end">Bs</div>
              </div>

              {/* CADENA / SUCURSAL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium mb-1">Cadena</label>
                  <select
                    name="empresa"
                    onChange={(e) => setEmpresa(e.target.value)}
                    className="w-full border border-blue-600 px-2 py-1 rounded"
                    required
                  >
                    <option value="">Selecciona una cadena</option>
                    {empresas.map((item) => (
                      <option value={item._id}>{item.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Sucursal</label>
                  <select
                    onChange={(e) => setSucursal(e.target.value)}
                    className="w-full border border-blue-600 px-2 py-1 rounded"
                  >
                    <option value="">Selecciona una sucursal</option>
                    {sucursales.map((item) => (
                      <option value={item._id}>{item.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {precios.map((item) => (
                <div>
                  <p className="text-red-600 font-semibold mb-2 text-sm">
                    {item.nombre}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-blue-900 font-medium mb-1">
                        Comisión 1
                      </label>
                      <input
                        {...register(`comisiones.${item._id}.comision1`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        step="any"
                        defaultValue={0}
                        className="w-full border border-blue-600 px-2 py-1 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-orange-600 font-medium mb-1">
                        Comisión 2
                      </label>
                      <input
                        {...register(`comisiones.${item._id}.comision2`, {
                          valueAsNumber: true,
                        })}
                        defaultValue={0}
                        type="number"
                         step="any"
                        className="w-full border border-blue-600 px-2 py-1 rounded"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* BOTONES */}
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
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
