import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Servicio } from "../interfaces/comisionServicio.interface";

export const exportarServiciosExcel = async (servicios: Servicio[]) => {
  console.log(servicios);
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
    { header: "Monto", key: "monto" },
    { header: "Comision 1", key: "comision1" },
    { header: "Comision 2", key: "comision2" },
  ];

  console.log(servicios);

  const rows: any[] = [];
  
  servicios?.forEach((servicio) => {
    if (servicio.comisonServicio && servicio.comisonServicio.length > 0) {
      const comision1 = servicio.comisonServicio[0].monto;
      const comision2 = servicio.comisonServicio[1].monto;
      const precio = servicio.comisonServicio[0].precio;
      rows.push({
        id: servicio._id,
        nombre: servicio.nombre,
        tipo_precio: precio,
        monto: "", 
        comision1: comision1,
        comision2: comision2,
      });
    } else {
      rows.push({
        id: servicio._id,
        nombre: servicio.nombre,
        tipo_precio: "",
        monto: "",
        comision1: "",
        comision2: "",
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