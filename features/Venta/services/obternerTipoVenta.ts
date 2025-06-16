import type { TipoVenta } from "../interfaces/tipoVenta.interface"

// Simulación de servicio para obtener tipos de venta
export default async function obtenerTipoVentas(): Promise<TipoVenta[]> {
  // En un caso real, esto sería una llamada a API
  return [
    { _id: "1", nombre: "PRODUCTOS Y/O INSUMOS", descripcion: "Venta de productos físicos e insumos" },
    { _id: "2", nombre: "SERVICIOS", descripcion: "Servicios de optometría y relacionados" },
    { _id: "3", nombre: "CONSULTAS", descripcion: "Consultas médicas y diagnósticos" },
  ]
}
