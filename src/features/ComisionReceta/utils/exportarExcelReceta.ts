import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { CombinacionResponse } from "../interfaces/comisionReceta.interface";
import dayjs from "dayjs";


export const exportarExcelReceta = async (recetas: CombinacionResponse[]) => {

  const workbook = new ExcelJS.Workbook();
  const worksheetOne = workbook.addWorksheet("SinComisionReceta");
  worksheetOne.columns = [
    { header: "Id", key: "_id" },
    { header: "Material", key: "material" },
    { header: "Tipo Lente", key: "tipoLente" },
    { header: "Tipo Color", key: "tipoColorLente" },
    { header: "Tratamiento", key: "tratamiento" },
    { header: "Rangos", key: "rango" },
    { header: "Marca", key: "marcaLente" },
    { header: "Color", key: "colorLente" },
    { header: "Tipo Precio", key: "tipoPrecio" },
    { header: "Monto", key: "importe" },
    { header: "Comision Fija 1", key: "comision_fija_1" },
    { header: "Comision Fija 2", key: "comision_fija_2" },
    { header: "Fecha", key: "fecha" },
  ];

  
  
  worksheetOne.addRows(
    recetas.map((receta) => ({
      _id: receta._id,
      material: receta.material,
      tipoLente: receta.tipoLente,
      tipoColorLente: receta.tipoColorLente,
      tratamiento: receta.tratamiento,
      rango: receta.rango,
      marcaLente: receta.marcaLente,
      colorLente: receta.colorLente,
      tipoPrecio: receta.tipoPrecio,
      importe: receta.importe || 0,
      comision_fija_1: 0,
      comision_fija_2: 0,
      fecha: dayjs().format("DD/MM/YYYY"),
    }))
  );

  worksheetOne.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `OPTICENTRO-receta`);
};
