interface Props {
    numeroElementos: number;
    isLoading: boolean;
    mensaje: string;
    icono?: React.ReactNode;
    className?: string;
}
export const Mensaje = ({numeroElementos, isLoading, mensaje, icono, className}: Props) => {
  return (
    numeroElementos === 0 && !isLoading && (
        <div className={`flex flex-col items-center justify-center py-8 gap-4 ${className}`}>
          {icono}
          <p className="text-center text-gray-500 font-semibold">
            {mensaje}
          </p>
        </div>
      )           
  )
}
