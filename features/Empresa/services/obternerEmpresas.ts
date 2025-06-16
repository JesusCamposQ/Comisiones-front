import type { Empresa } from "../interfaces/empresa.interface"

// Simulación de servicio para obtener empresas
export async function obtenerEmpresas(): Promise<Empresa[]> {
  // En un caso real, esto sería una llamada a API
  return [
    { _id: "1", nombre: "OPTICENTRO" },
    { _id: "2", nombre: "OTRA CADENA" },
  ]
}
