"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerWithPresetsProps {
  date: Date
  setDate: (date: Date) => void
  label?: string
  className?: string
}

export function DatePickerWithPresets({
  date,
  setDate,
  label = "Seleccionar fecha",
  className,
}: DatePickerWithPresetsProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const presets = [
    {
      name: "Hoy",
      date: new Date(),
    },
    {
      name: "Ayer",
      date: addDays(new Date(), -1),
    },
    {
      name: "Hace una semana",
      date: addDays(new Date(), -7),
    },
    {
      name: "Hace un mes",
      date: addDays(new Date(), -30),
    },
  ]

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: es }) : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) => {
            setDate(new Date(value))
            setIsOpen(false)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent position="popper">
            {presets.map((preset) => (
              <SelectItem key={preset.name} value={preset.date.toISOString()}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              if (date) {
                setDate(date)
                setIsOpen(false)
              }
            }}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
