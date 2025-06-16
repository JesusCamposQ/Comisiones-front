import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Datum } from "../interfaces/producto.interface";
export const exportarExcelProducto = async (productos: Datum[]) => {

  const workbook = new ExcelJS.Workbook();
  const worksheetOne = workbook.addWorksheet("SinComisionProducto");
  worksheetOne.columns = [
    { header: "Id", key: "id"  },
    { header: "Codigo QR", key: "codigo_qr" },
    { header: "Tipo producto", key: "tipo_producto"  },
    { header: "Marca", key: "marca" },
    { header: "Color", key: "color"},
    { header: "Serie", key: "serie"  },
    { header: "Tipo montura", key: "tipo_montura" },
    { header: "Tipo Precio", key: "tipo_precio" },
    { header: "Importe", key: "importe" },
    { header: "Comision fija 1", key: "comision_fija_1" },
    { header: "Comision fija 2", key: "comision_fija_2" },
  ];

  console.log(productos);
  
  worksheetOne.addRows(
    productos.map((producto) => ({
      id: producto.codigoMia,
      codigo_qr: producto.codigoQR,
      tipo_producto: producto.tipoProducto,
      marca: producto.marca,
      color: producto.color,
      serie: producto.serie,
      tipo_montura: producto.tipoMontura,
      tipo_precio: producto.tipoPrecio,
      importe: producto.importe || 0,
      comision_fija_1: 0,
      comision_fija_2: 0,
    }))
  );

  worksheetOne.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `OPTICENTRO-producto`);
};
