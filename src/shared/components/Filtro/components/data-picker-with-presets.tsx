import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { es } from 'date-fns/locale';

export function DatePickerWithPresets({ label, date, setDate, className }: { label?: string; date: Date; setDate: (date: Date) => void; className?: string; locale?: any }) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            className,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "P") : <span>{label || "Seleccione una fecha"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          
          <SelectTrigger>
            <SelectValue placeholder="Seleccione" className="w-full" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Hoy</SelectItem>
            <SelectItem value="1">Mañana</SelectItem>
            <SelectItem value="3">En 3 días</SelectItem>
            <SelectItem value="7">En una semana</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="rounded-md border">
          
          <Calendar mode="single" selected={date} onSelect={(date) => setDate(date || new Date())} locale={es} />
        
        </div>
      </PopoverContent>
    </Popover>
  )
}

