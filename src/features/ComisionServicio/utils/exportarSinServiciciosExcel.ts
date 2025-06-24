import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import {ComisionSinServicio} from "../interfaces/comisionSinServicio";


export const exportarSinServiciosExcel = async (servicios: ComisionSinServicio) => {
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
    { header: "comision1", key: "comision1" },
    { header: "comision2", key: "comision2" },
  ];

  const rows: any[] = [];
  
    if (servicios.data && servicios.data.length > 0) {
      servicios.data.forEach((comision) => {
        rows.push({
          id: comision.codigoMia,
          nombre: comision.nombre,
          tipo_precio: comision.tipoPrecio,
          monto: comision.importe, 
          comision1: "",
          comision2: "",
        });
      });
    } else {
      servicios.data.forEach((comision) => {
        rows.push({
          id: comision.codigoMia,
          nombre: comision.nombre,
          tipo_precio: "",
          monto: "",
          comision1: "",
          comision2: "",
        });
      });
    }

  worksheetOne.addRows(rows);
  worksheetOne.getRow(1).font = {bold:true}
  worksheetOne.getColumn('A').width = 25
  worksheetOne.getColumn('B').width = 60
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob ([buffer],{
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
  
  saveAs(blob, `comisionesSinServicios`);
};