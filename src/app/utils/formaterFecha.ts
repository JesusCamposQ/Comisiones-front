import { format } from "date-fns";

export const formatearFecha = (dateStr?: string) =>
    dateStr ? format(new Date(dateStr), "dd/MM/yyyy HH:mm") : "-";