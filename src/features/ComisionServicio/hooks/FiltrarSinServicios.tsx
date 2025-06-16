import { useEffect } from "react";
import { Datum } from "../interfaces/comisionSinServicio";
import { paginador } from "@/shared/utils/paginador";

interface Props {
    servicios: Datum[];
    filtro: Datum;
    setFiltrarServicio: React.Dispatch<React.SetStateAction<Datum[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    limite?: number;
}

export const useFiltrarSinServicios = ({ servicios, filtro, setFiltrarServicio, page, limite = 10, setPage }: Props) => {
  useEffect(() => {
    const filtrar = () => {
      const servicioFiltradas = servicios.filter((servicio) => {
        return (
          (!filtro.nombre || servicio.nombre?.toLowerCase().includes(filtro.nombre.toLowerCase())) 
        );
      });
      if (Object.keys(filtro).length === 0) {
        setFiltrarServicio(paginador(servicios, limite, page));
        return;
      }
      setFiltrarServicio(servicioFiltradas);
      setPage(1);
    };
    filtrar();
  }, [filtro, servicios, page, limite]);
}