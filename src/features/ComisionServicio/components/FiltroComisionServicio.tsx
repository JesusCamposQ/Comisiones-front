;import { Dispatch, SetStateAction } from "react";
import { Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Servicio } from "../interfaces/comisionServicio.interface";

interface Props {
  setFiltro: Dispatch<SetStateAction<Servicio>>;
}

export const FiltroComisionServicio = ({ setFiltro }: Props) => {
  const onChange = (field: keyof Servicio, value: string) => {
    if (!value.trim()) {
      setFiltro((prev) => {
        const newFiltro = { ...prev };
        delete newFiltro[field];
        return newFiltro;
      });
    } else {
      setFiltro((prev) => ({
        ...prev,
        [field]: value.toUpperCase(),
      }));
    }
  };
  const limpiarFiltro = () => {
    setFiltro({});
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  };
  return (
    <div className="flex items-center space-x-2 mt-2 mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar servicio..."
          onChange={(e) => onChange("nombre", e.target.value)}
          className="pl-10 w-64"
        />
      </div>
      <Button onClick={limpiarFiltro} className="">
        <Trash2/>
        Limpiar
      </Button>
    </div>
  );
};
