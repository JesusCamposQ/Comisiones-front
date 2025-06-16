import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface PropsOrdenar {
 setDatos: Dispatch<SetStateAction<any[]>> | (() => void)
 datos: any[]
 title: string
 rename?: string
}

export const Ordenar = ({setDatos,datos,title,rename}: PropsOrdenar) => {
      const [sortConfig, setSortConfig] = useState<{
        key: keyof any | null 
        direction: "ascending" | "descending"
      }>({
        key: null,
        direction: "ascending",
      })
    const requestSort = (key: keyof any | string) => {
        let direction: "ascending" | "descending" = "ascending"
    
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
          direction = "descending"
        }
    
        setSortConfig({ key, direction })
    
        const sortedData = [...datos].sort((a, b) => {
          const aValue = a[key] ?? 0;
          const bValue = b[key] ?? 0;
          if (aValue < bValue) {
            return direction === "ascending" ? -1 : 1
          }
          if (aValue > bValue) {
            return direction === "ascending" ? 1 : -1
          }
          return 0
        })
    
        setDatos(sortedData)
      }
  return (
    <Button
      variant="ghost"
      onClick={() => requestSort(title as keyof any)}
      className="p-0 h-auto font-bold text-black hover:bg-transparent hover:text-black cursor-pointer"
    >
      {rename?.toUpperCase() || title.toUpperCase()}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
