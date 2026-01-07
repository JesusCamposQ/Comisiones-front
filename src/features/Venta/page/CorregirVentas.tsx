import { useEffect, useState } from "react";
import { actualizarMontos, BuscarVentaPorId } from "../services/ventasService";
import type { VentaI } from "../interfaces/venta.interface";
import toast, { Toaster } from "react-hot-toast";

export const CorregirVentas = () => {
  const [idVenta, setIdVenta] = useState<string>("");
  const [venta, setVenta] = useState<VentaI>();

  const [precioTotal, setPrecioTotal] = useState<number>(0);
  const [montoTotal, setMontoTotal] = useState<number>(0);
  const [descuento, setDescuento] = useState<number>(0);
  const btnBuscarVenta = async () => {
    try {
      const response = await BuscarVentaPorId(idVenta);
      const ventaData = response[0];

      setVenta(ventaData);
      setPrecioTotal(ventaData.precioTotal);
      setMontoTotal(ventaData.montoTotal);
      setDescuento(ventaData.descuento);
    } catch (error) {
      console.error("Error al buscar la venta:", error);
      toast.error("No se pudo encontrar la venta");
    }
  };


  useEffect(() => {
    const nuevoDescuento = precioTotal - montoTotal;
    setDescuento(nuevoDescuento > 0 ? nuevoDescuento : 0);
  }, [precioTotal, montoTotal]);


  const btnActualizar = async () => {
    try {
      if (!venta) return;

      const response = await actualizarMontos(
        venta._id,
        montoTotal,
        precioTotal,
        descuento
      );

      if (response.modifiedCount > 0) {
        toast.success("Venta actualizada correctamente");
      } else {
        toast("No hubo cambios");
      }
    } catch (error) {
      console.error("Error al actualizar la venta:", error);
      toast.error("Error al actualizar");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster/>
      {/* Buscador */}
      <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={idVenta}
          onChange={(e) => setIdVenta(e.target.value)}
          placeholder="Ingrese el ID de la venta"
          className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={btnBuscarVenta}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Buscar venta
        </button>
      </div>

      {venta && (
        <div className="bg-white p-6 rounded-xl shadow-lg border">

          <h2 className="text-2xl font-bold mb-4">
            Venta: {venta.id_venta}
          </h2>

          {/* Datos de venta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

            <p><span className="font-semibold">Sucursal:</span> {venta.sucursal}</p>
            <p><span className="font-semibold">Tipo de venta:</span> {venta.tipoVenta}</p>
            <p><span className="font-semibold">Precio:</span> {venta.precio}</p>

            <div className="flex items-center gap-2">
              <span className="font-semibold">Total:</span>
              <input
                type="number"
                value={precioTotal}
                onChange={(e) => setPrecioTotal(Number(e.target.value))}
                className="border px-3 py-1 rounded-lg w-32"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">Gran Total:</span>
              <input
                type="number"
                value={montoTotal}
                onChange={(e) => setMontoTotal(Number(e.target.value))}
                className="border px-3 py-1 rounded-lg w-32"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">Descuento:</span>
              <input
                type="number"
                value={descuento}
                readOnly
                className="border px-3 py-1 rounded-lg w-32 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <p>
              <span className="font-semibold">Comisiona:</span>{" "}
              {venta.comisiona ? "Sí" : "No"}
            </p>
          </div>

          {/* Botón actualizar */}
          <button
            onClick={btnActualizar}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Actualizar
          </button>

          {/* Detalle */}
          <h3 className="text-xl font-semibold mt-6 mb-3">
            Detalle de venta
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venta.detalleVenta.map((item) => (
              <div key={item._id} className="border rounded-lg p-4 bg-gray-50">
                <p className="font-semibold">{item.descripcion}</p>
                <p>Rubro: {item.rubro}</p>
                <p>Cantidad: {item.cantidad}</p>
                <p>Importe: {item.importe}</p>
                {item.marca && <p>Marca: {item.marca}</p>}
                {item.producto && <p>Producto ID: {item.producto}</p>}
                {item.combinacionReceta && <p>Combinación receta: {item.combinacionReceta}</p>}
                {item.medioPar !== undefined && (
                  <p>Medio par: {item.medioPar ? "Sí" : "No"}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
