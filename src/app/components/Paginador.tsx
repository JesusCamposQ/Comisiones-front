import { Dispatch, SetStateAction } from "react";

interface Props {
  filtrar: any[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  itemsPerPage?: number;
  totalPages?: number;
}

const Paginador = ({ filtrar, page, setPage, itemsPerPage = 10, totalPages }: Props) => {
  if(totalPages === undefined){
    totalPages = Math.ceil(filtrar.length / itemsPerPage);
  }
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
    {filtrar.length > 0 && (
    <div className="flex justify-center items-center gap-4 my-4">
      <nav className="flex items-center justify-center gap-2">
        <button
          className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePreviousPage}
          disabled={page <= 1}
        >
          Anterior
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs">Página</span>
          <span className="px-2 py-1 text-xs">
            {page} de {totalPages}
          </span>
        </div>
        <button
          className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNextPage}
          disabled={page >= totalPages}
        >
          Siguiente
        </button>
      </nav>
    </div>
    )}
    </>
  );
};

export default Paginador;