import { useEffect } from "react";
import { CombinacionResponse } from "../interfaces/comisionReceta.interface";
import { ComsionRecetaFiltro } from "../interfaces/comsionRecetaFiltro";
import { paginador } from "@/shared/utils/paginador";

interface Props {
    combinaciones: CombinacionResponse[];
    filtro: ComsionRecetaFiltro;
    setFiltrarCombinacion: React.Dispatch<React.SetStateAction<CombinacionResponse[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    limite?: number;
}

export const FiltrarCombinacion = ({ combinaciones, filtro, setFiltrarCombinacion, page, limite = 10, setPage }: Props) => {
  useEffect(() => {
    if(!combinaciones) return;
    const filtrar = () => {
      const combinacionesFiltradas = combinaciones.filter((combinacion) => {
        return (
          (!filtro.tipoLente || combinacion.tipoLente?.toLowerCase().includes(filtro.tipoLente.toLowerCase())) &&
          (!filtro.material || combinacion.material?.toLowerCase().includes(filtro.material.toLowerCase())) &&
          (!filtro.tratamiento || combinacion.tratamiento?.toLowerCase().includes(filtro.tratamiento.toLowerCase())) &&
          (!filtro.marcaLente || combinacion.marcaLente?.toLowerCase().includes(filtro.marcaLente.toLowerCase())) &&
          (!filtro.tipoColorLente || combinacion.tipoColorLente?.toLowerCase().includes(filtro.tipoColorLente.toLowerCase())) &&
          (!filtro.rango || combinacion.rango?.toLowerCase().includes(filtro.rango.toLowerCase()))
        );
      });
      if (Object.keys(filtro).length === 0) {
        const datosPaginados = paginador(combinaciones, limite, page);
        setFiltrarCombinacion(datosPaginados);
        return;
      }
      setFiltrarCombinacion(combinacionesFiltradas);
      setPage(1);
    };
    filtrar();
  }, [filtro, combinaciones]);
}