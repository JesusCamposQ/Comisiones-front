import { VentasInvalidasI } from "../interfaces/venta.interface";
import ExcelJS from "exceljs";
export const exportarVentasInvalidas = async (data: VentasInvalidasI[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("ventas invalidas");
  worksheet.columns = [
    { header: "ID Venta", key: "id_venta" },
    { header: "sucursal", key: "sucursal" },
    { header: "asesor", key: "asesor" },
    { header: "gran total", key: "gran_total" },
    { header: "Total", key: "total" },
    { header: "fecha venta", key: "fecha_venta" },
    { header: "fecha finalizacion", key: "fecha_finalizacion" },
  ];

  for (const venta of data) {
      worksheet.addRow({
          id_venta:venta.id_venta,
          sucursal:venta.sucursal,
          asesor:venta.asesor,
          gran_total:venta.montoTotal,
          total:venta.precioTotal,
          fecha_venta:venta.fechaVenta,
          fecha_finalizacion:venta.fechaFinalizacion
        
      })
  } 

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Fichas Invalidas.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
