import type { Sucursal } from "@/features/Sucursal/interfaces/sucursal.interface"
import type { TipoVenta } from "@/features/Venta/interfaces/tipoVenta.interface"

export interface FiltroI {
  empresa?: string
  sucursal: string[]
  fechaInicio: string
  fechaFin: string
  sucursales: Sucursal[]
  tipoVenta: string[]
  tipoVentas: TipoVenta[]
}
