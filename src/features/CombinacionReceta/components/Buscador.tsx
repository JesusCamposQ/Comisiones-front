import React from 'react';
import { filtroCombinacionRecetaI } from '../interfaces/comisiones.interface';

export const Buscador = ({
  setFiltro,
  className
}: {
  setFiltro: (data: filtroCombinacionRecetaI | ((prev: filtroCombinacionRecetaI) => filtroCombinacionRecetaI)) => void;
  className?: string;
}) => {
  if(!className){
    className = "flex flex-row gap-2";
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltro((prev: filtroCombinacionRecetaI) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className={className}>
      <input
        name="tipoLente"
        className='rounded-md border py-2 px-2 text-black focus:outline-none border-blue-200'
        placeholder="Tipo Lente"
        onChange={onChange}
      />
      <input
        name="material"
        className='rounded-md border py-2 px-2 text-black focus:outline-none border-blue-200'
        placeholder="Material"
        onChange={onChange}
      />
      <input
        name="tratamiento"
        className='rounded-md border py-2 px-2 text-black focus:outline-none border-blue-200'
        placeholder="Tratamiento"
        onChange={onChange}
      />
      <input
        name="marcaLente"
        className='rounded-md border py-2 px-2 text-black focus:outline-none border-blue-200'
        placeholder="Marca"
        onChange={onChange}
      />
      <input
        name="tipoColorLente"
        className='rounded-md border py-2 px-2 text-black focus:outline-none border-blue-200'
        placeholder="Tipo Color Lente"
        onChange={onChange}
      />
      <input
        name="rango"
        className='rounded-md border py-2 px-2 text-black focus:outline-none border-blue-200'
        placeholder="Rango"
        onChange={onChange}
      />
      <input
        name="colorLente"
        className='rounded-md border py-2 px-2 text-black focus:outline-none border-blue-200'
        placeholder="Color"
        onChange={onChange}
      />
    </form>
  );
};
