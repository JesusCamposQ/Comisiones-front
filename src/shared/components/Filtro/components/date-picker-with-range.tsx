import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DatePickerWithRangeProps {
  className?: string
  date: DateRange | undefined
  setDate: (date: DateRange) => void
}

export function DatePickerWithRange({ className, date, setDate }: DatePickerWithRangeProps) {
  const today = new Date()

  const presets = [
    {
      id: "today",
      label: "Hoy",
      dateRange: {
        from: today,
        to: today,
      },
    },
    {
      id: "yesterday",
      label: "Ayer",
      dateRange: {
        from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
        to: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
      },
    },
    {
      id: "week",
      label: "Esta semana",
      dateRange: {
        from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()),
        to: today,
      },
    },
    {
      id: "month",
      label: "Este mes",
      dateRange: {
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: today,
      },
    },
    {
      id: "year",
      label: "Este año",
      dateRange: {
        from: new Date(today.getFullYear(), 0, 1),
        to: today,
      },
    },
  ]

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: es })} - {format(date.to, "dd/MM/yyyy", { locale: es })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: es })
              )
            ) : (
              <span>Seleccionar fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Tabs defaultValue="calendar">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="calendar">Calendario</TabsTrigger>
              <TabsTrigger value="presets">Atajos</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar" className="p-4">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(range) => setDate(range as DateRange)}
                numberOfMonths={2}
                locale={es}
              />
            </TabsContent>
            <TabsContent value="presets" className="p-4">
              <div className="grid gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    className="justify-start"
                    onClick={() => setDate(preset.dateRange)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerWithRange
