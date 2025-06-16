import { useEffect } from "react";
import { Servicio } from "../interfaces/comisionServicio.interface";
import { paginador } from "@/shared/utils/paginador";

interface Props {
    servicios: Servicio[];
    filtro: Servicio;
    setFiltrarServicio: React.Dispatch<React.SetStateAction<Servicio[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    limite?: number;
}

export const FiltrarServicios  = ({ servicios, filtro, setFiltrarServicio, page, limite = 10, setPage }: Props) => {
  useEffect(() => {
    const filtrar = () => {
      const servicioFiltradas = servicios.filter((servicio) => {
        return (
          (!filtro.nombre || servicio.nombre?.toLowerCase().includes(filtro.nombre.toLowerCase())) 
        );
      });
      console.log('Filtro', filtro);
      console.log('Here', Object.keys(filtro).length === 0);
      if (Object.keys(filtro).length === 0) {
        const datosPaginados = paginador(servicios, limite, page);
        setFiltrarServicio(datosPaginados);
        return;
      }
      setFiltrarServicio(servicioFiltradas);
      setPage(1);
    };
    filtrar();
  }, [filtro, servicios]);
}