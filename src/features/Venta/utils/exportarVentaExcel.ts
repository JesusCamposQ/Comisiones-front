import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Venta } from "../interfaces/venta.interface";
import { calcularComision, calcularComisionTotal, porcentaje, totalImporte } from "./ventaUtils";
export const exportarVentaExcel = async (ventas: Venta[], fechaI:string,fechaF:string) => {

  const workbook = new ExcelJS.Workbook();
  const worksheetOne = workbook.addWorksheet("Total ventas");
  const worksheetTwo = workbook.addWorksheet("Comisiones");
  worksheetOne.columns = [
    { header: "Sucursal", key: "sucursal"  },
    { header: "Asesor", key: "asesor"  },
    { header: "Tickets", key: "tickets"  },
    { header: "Importe Total", key: "importe_total" },
    { header: "Descuento", key: "descuento" },
    { header: "Gran Total", key: "gran_total"},
    { header: "Total comisión", key: "total_comisión" },
  ];

  worksheetTwo.columns = [
    { header: "Sucursal", key: "sucursal" },
    { header: "Asesor", key: "asesor" },
    { header: "ID Venta", key: "id_Venta" },
    { header: "Tipo precio", key: "tipo_precio"},
    { header: "Importe Total", key: "importeTotal" },
    { header: "Descuento", key: "descuento" },
    { header: "% Descuento", key: "porcentaje_descuento" },
    { header: "Gran Total", key: "gran_total" },
        { header: "Rubro", key: "rubro" },
    { header: "Descripcion", key: "descripcion"},
    { header: "Importe", key: "importe" },
    { header: "comision", key: "comision" },
    { header: "Porcentaje", key: "porcentaje"},
      { header: "llave desbloqueda", key: "llave"},
        { header: "fecha de  finalizacion", key: "fecha"},
  ];

  console.log(ventas);
  
  for (const venta of ventas) {
    const gafaVip = venta.gafaVip
    let monturaVip= venta.monturaVip
    const lenteDeContacto = venta.lenteDeContacto
    const metaProductosVip= venta.metaProductosVip
    const empresa = venta.empresa
    worksheetOne.addRow({
      sucursal: venta.sucursal,
      asesor: venta.asesor,
      tickets: venta.ventas.length,
      importe_total: totalImporte(venta.ventas),
      descuento: venta.totalDescuento,
      gran_total: venta.montoTotal,

      total_comisión: calcularComisionTotal(
        venta.ventas,
        venta.metaProductosVip,
        venta.gafaVip,
        venta.monturaVip,
        venta.lenteDeContacto,
        venta.empresa,
       venta.sucursal
      ),
    });
    for (const detalle of venta.ventas) {

        
      for (const item of detalle.detalle) {
        const comision = calcularComision(item.comisiones, gafaVip, monturaVip, lenteDeContacto, metaProductosVip, empresa, porcentaje(detalle.detalle.reduce((acc, item) => acc + item.importe, 0), detalle.descuento), venta.sucursal)
       const comision1=   calcularComision(item.comisiones, gafaVip, monturaVip, lenteDeContacto, metaProductosVip, empresa, porcentaje(detalle.detalle.reduce((acc, item) => acc + item.importe, 0), detalle.descuento), venta.sucursal)
        worksheetTwo.addRow({
          sucursal: venta.sucursal,
          asesor: venta.asesor,
          id_Venta: detalle.idVenta,
          tipo_precio: detalle.precio,
          importeTotal: detalle.detalle.reduce(
            (acc, item) => acc + item.importe,
            0
          ),
          descuento: detalle.descuento,
          porcentaje_descuento: porcentaje(
            detalle.detalle.reduce((acc, item) => acc + item.importe, 0),
            detalle.descuento
          ),
          gran_total: detalle.montoTotal,
          rubro:item.producto
            ? `${item.producto.tipo}`
            : item.combinacion
            ? `${item.combinacion.tipo}`
            : item.servicios
            ? `${item.servicios.tipo}`
            : item.otros
            ? `${item.otros.tipo}`
            : "Información no disponible",
          descripcion: item.producto
            ? `${item.producto.descripcion}`
            : item.combinacion
            ? `${item.combinacion.descripcion}`
            : item.servicios
            ? `${item.servicios.descripcion}`
            : item.otros
            ? `${item.otros.descripcion}`
            : "Información no disponible",
          importe:item.importe,
          comision: comision.comison,
          porcentaje: porcentaje(item.importe,comision1.comison).toFixed(2),
          llave:comision1.llave ? 'si':'no',
          fecha: detalle.fechaFinalizacion,
        })
        
        
      }
    }
  }

  worksheetOne.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `OFEROPTICA-${fechaI}_${fechaF})`);
};
