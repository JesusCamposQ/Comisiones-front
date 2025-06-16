import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Servicio } from "../interfaces/comisionServicio.interface";

export const exportarServiciosExcel = async (servicios: Servicio[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheetOne = workbook.addWorksheet("Comision Servicios",{
    properties:{
      defaultColWidth: 15,
    }
  });
  
  worksheetOne.columns = [
    { header: "Id", key: "id" },
    { header: "Nombre", key: "nombre" },
    { header: "Tipo Precio", key: "tipo_precio" },
    { header: "Tipo Comision", key: "tipo_comision" },
    { header: "Monto", key: "monto" },
  ];

  console.log(servicios);

  const rows: any[] = [];
  
  servicios?.forEach((servicio) => {
    if (servicio.comisonServicio && servicio.comisonServicio.length > 0) {
      servicio.comisonServicio.forEach((comision) => {
        rows.push({
          id: servicio._id,
          nombre: servicio.nombre,
          tipo_precio: comision.precio,
          tipo_comision: comision.comision,
          monto: comision.monto, 
        });
      });
    } else {
      rows.push({
        id: servicio._id,
        nombre: servicio.nombre,
        tipo_precio: "",
        tipo_comision: "",
        monto: "",
      });
    }
  });

  worksheetOne.addRows(rows);
  worksheetOne.getRow(1).font = {bold:true}
  worksheetOne.getColumn('A').width = 25
  worksheetOne.getColumn('B').width = 60
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob ([buffer],{
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
  
  saveAs(blob, `OPTICENTRO-Servicios`);
};