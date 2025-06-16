import { useEffect } from "react";
import { Datum } from "../interfaces/producto.interface";
import { ComsionProductoFiltro } from "../interfaces/comsionProductoFiltro";
import { paginador } from "@/shared/utils/paginador";

interface Props {
    combinaciones: Datum[];
    filtro: ComsionProductoFiltro;
    setFiltrarCombinacion: React.Dispatch<React.SetStateAction<Datum[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    limite?: number;
}

export const FiltrarCombinacion = ({ combinaciones, filtro, setFiltrarCombinacion, page, limite = 10, setPage }: Props) => {
  useEffect(() => {
    const filtrar = () => {
      const combinacionesFiltradas = combinaciones.filter((combinacion) => {
        return (
          (!filtro.codigoMia || combinacion.codigoMia?.toLowerCase().includes(filtro.codigoMia.toLowerCase())) &&
          (!filtro.tipoProducto || combinacion.tipoProducto?.toLowerCase().includes(filtro.tipoProducto.toLowerCase())) &&
          (!filtro.serie || combinacion.serie?.toLowerCase().includes(filtro.serie.toLowerCase())) &&
          (!filtro.codigoQR || combinacion.codigoQR?.toLowerCase().includes(filtro.codigoQR.toLowerCase())) &&
          (!filtro.marca || combinacion.marca?.toLowerCase().includes(filtro.marca.toLowerCase())) &&
          (!filtro.color || combinacion.color?.toLowerCase().includes(filtro.color.toLowerCase())) &&
          (!filtro.tipoPrecio || combinacion.tipoPrecio?.toLowerCase().includes(filtro.tipoPrecio.toLowerCase())) &&
          (!filtro.importe || combinacion.importe?.toString().includes(filtro.importe.toString()))
        );
      });
      console.log('Filtro', filtro);
      console.log('Here', Object.keys(filtro).length === 0);
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