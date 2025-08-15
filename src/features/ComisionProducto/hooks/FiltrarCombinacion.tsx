import { useEffect } from "react";
import { Datum } from "../interfaces/producto.interface";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import { paginador } from "@/shared/utils/paginador";

interface PropsFiltrarCombinacion {
    combinaciones: Datum[];
    filtro: ComsionProductoFiltro;
    setCombinacionesFiltradas: React.Dispatch<React.SetStateAction<Datum[]>>;
    setPagina: React.Dispatch<React.SetStateAction<number>>;
    pagina: number;
    limite?: number;
}

export const FiltrarCombinacion = ({ combinaciones, filtro, setCombinacionesFiltradas, setPagina, pagina, limite = 10 }: PropsFiltrarCombinacion) => {
  useEffect(() => {
    const normalizar = (valor: unknown) => String(valor ?? "").toLowerCase();

    const filtrosActivos = (
      [
        ["codigoMia", filtro.codigoMia],
        ["tipoProducto", filtro.tipoProducto],
        ["serie", filtro.serie],
        ["codigoQR", filtro.codigoQR],
        ["marca", filtro.marca],
        ["color", filtro.color],
        ["tipoPrecio", filtro.tipoPrecio],
        ["importe", filtro.importe],
      ] as const
    ).filter(([, val]) => {
      const v = String(val ?? "").trim();
      return v.length > 0;
    });

    if (filtrosActivos.length === 0) {
      const datosPaginados = paginador(combinaciones, limite, pagina);
      setCombinacionesFiltradas(datosPaginados);
      return;
    }

    
    const filtrosNormalizados = filtrosActivos.map(([clave, valor]) => [clave as keyof Datum, normalizar(valor)] as const);

  
    const combinacionesFiltradas = combinaciones.filter((combinacion) =>
      filtrosNormalizados.every(([clave, valor]) => normalizar(combinacion[clave]).includes(valor))
    );

    setCombinacionesFiltradas(combinacionesFiltradas);
    if (pagina !== 1) setPagina(1);
  }, [combinaciones, filtro, pagina, limite, setCombinacionesFiltradas, setPagina]);
};
