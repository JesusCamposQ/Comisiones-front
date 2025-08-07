import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { listarVentasInvalidas } from "../services/ventasService";
import { VentasInvalidasI } from "../interfaces/venta.interface";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { exportarVentasInvalidas } from "../utils/exportarVentasInvalidas";

export const VentasInvalidas = () => {
    const date =  new Date()

  const [ventas, setVentas] = useState<VentasInvalidasI[]>([]);
  const [startDate, setStartDate] = useState<Date| undefined>(date);
  const [endDate, setEndDate] = useState<Date | undefined>(date);
  const formatDate = (dateStr?: string) =>
    dateStr ? format(new Date(dateStr), "dd/MM/yyyy HH:mm") : "-";
  const onclikBuscar= async()=>{
   try {
        if(startDate && endDate) {
            const response = await listarVentasInvalidas(startDate, endDate);
            setVentas(response);
        }
    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ventas Inválidas</h2>

  
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">Desde</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[200px] justify-start text-left", !startDate && "text-muted-foreground")}
              >
                {startDate ? format(startDate, "dd/MM/yyyy") : "Selecciona fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
            
          </Popover>
        </div>

        <div>
          <label className="text-sm font-medium">Hasta</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[200px] justify-start text-left", !endDate && "text-muted-foreground")}
              >
                {endDate ? format(endDate, "dd/MM/yyyy") : "Selecciona fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={onclikBuscar}>Buscar</Button>
      </div>
    <Button onClick={()=>exportarVentasInvalidas(ventas)}>Buscar</Button>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>ID Venta</TableHead>
              <TableHead>Sucursal</TableHead>
              <TableHead>Asesor</TableHead>
              <TableHead className="text-right">Gran total</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Fecha Venta</TableHead>
              <TableHead>Fecha Finalización</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ventas.map((v) => (
              <TableRow key={v._id} className="hover:bg-gray-50">
                <TableCell>{v.id_venta}</TableCell>
                <TableCell>{v.sucursal}</TableCell>
                <TableCell>{v.asesor}</TableCell>
                <TableCell className="text-right">{v.montoTotal}</TableCell>
                <TableCell className="text-right">{v.precioTotal}</TableCell>
                <TableCell>{formatDate(v.fechaVenta)}</TableCell>
                <TableCell>{formatDate(v.fechaFinalizacion)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
