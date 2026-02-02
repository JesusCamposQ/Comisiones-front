import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Venta } from "../interfaces/venta.interface";
import {
  calcularComision,
  calcularComisionTotal,
  extraerLlave,
  porcentaje,
  totalImporte,
} from "./ventaUtils";
import { calcularComision1, calcularComisionTotal1 } from "./ventaComision1";
export const exportarVentaExcel = async (
  ventas: Venta[],
  fechaI: string,
  fechaF: string
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheetOne = workbook.addWorksheet("Total ventas");
  const worksheetTwo = workbook.addWorksheet("Comisiones");
  worksheetOne.columns = [
    { header: "Sucursal", key: "sucursal" },
    { header: "Asesor", key: "asesor" },
    { header: "Puesto", key: "puesto" },
    { header: "Tickets", key: "tickets" },
    { header: "Importe Total", key: "importe_total" },
    { header: "Descuento", key: "descuento" },
    { header: "Gran Total", key: "gran_total" },
    { header: "Total comisión", key: "total_comisión" },
    { header: "Llave", key: "llave" },
  ];

  worksheetTwo.columns = [
    { header: "Sucursal", key: "sucursal" },
    { header: "Asesor", key: "asesor" },
    { header: "Puesto", key: "puesto" },
    { header: "ID Venta", key: "id_Venta" },
    { header: "Tipo precio", key: "tipo_precio" },
    { header: "Importe Total", key: "importeTotal" },
    { header: "Descuento", key: "descuento" },
    { header: "% Descuento", key: "porcentaje_descuento" },
    { header: "Gran Total", key: "gran_total" },
    { header: "Rubro", key: "rubro" },
    { header: "Descripcion", key: "descripcion" },
    { header: "Importe", key: "importe" },
    { header: "comision", key: "comision" },
    { header: "Porcentaje", key: "porcentaje" },
    { header: "llave desbloqueda", key: "llave" },
    { header: "Medio par", key: "medioPar" },
    { header: "fecha de venta", key: "fechaVenta" },
    { header: "fecha de  finalizacion", key: "fechaFinalizacion" },
  ];

  for (const venta of ventas) {
    const gafaVip = venta.gafaVip;
    let monturaVip = venta.monturaVip;
    const lenteDeContacto = venta.lenteDeContacto;
    const metaProductosVip = venta.metaProductosVip;
    const empresa = venta.empresa;
    worksheetOne.addRow({
      sucursal: venta.sucursal,
      asesor: venta.asesor,
      puesto: venta.gestor ? "Gestor" : "Asesor",
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
        venta.sucursal,
        venta.gestor
      ),
      llave: extraerLlave(
        venta.ventas,
        venta.metaProductosVip,
        venta.gafaVip,
        venta.monturaVip,
        venta.lenteDeContacto,
        venta.empresa,
        venta.sucursal,
        venta.gestor
      )
        ? "SI"
        : "NO",
    });
    for (const detalle of venta.ventas) {
      for (const item of detalle.detalle) {
        const comision = calcularComision(
          item.comisiones,
          gafaVip,
          monturaVip,
          lenteDeContacto,
          metaProductosVip,
          empresa,
          porcentaje(
            detalle.detalle.reduce((acc, item) => acc + item.importe, 0),
            detalle.descuento
          ),
          venta.sucursal,
          venta.gestor
        );
        const comision1 = calcularComision(
          item.comisiones,
          gafaVip,
          monturaVip,
          lenteDeContacto,
          metaProductosVip,
          empresa,
          porcentaje(
            detalle.detalle.reduce((acc, item) => acc + item.importe, 0),
            detalle.descuento
          ),
          venta.sucursal,
          venta.gestor
        );
        const llave = comision1.llave ? "SI" : "NO";

        worksheetTwo.addRow({
          sucursal: venta.sucursal,
          asesor: venta.asesor,
          puesto: venta.gestor ? "Gestor" : "Asesor",
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
          rubro: item.producto
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
          importe: item.importe,
          comision: comision.comison,
          porcentaje: porcentaje(item.importe, comision1.comison).toFixed(2),
          llave: llave,
          medioPar: item.combinacion
            ? item.combinacion.medioPar
              ? "SI"
              : "NO"
            : "",
          fechaVenta: detalle.fechaVenta,
          fechaFinalizacion: detalle.fechaFinalizacion,
        });
      }
    }
  }

  worksheetOne.getRow(1).font = { bold: true };
  worksheetTwo.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `Comisiones-${fechaI}_${fechaF})`);
};


export const exportarVentaComision1Excel = async (
  ventas: Venta[],
  fechaI: string,
  fechaF: string
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheetOne = workbook.addWorksheet("Total ventas");
  const worksheetTwo = workbook.addWorksheet("Comisiones");
  worksheetOne.columns = [
    { header: "Sucursal", key: "sucursal" },
    { header: "Asesor", key: "asesor" },
    { header: "Puesto", key: "puesto" },
    { header: "Tickets", key: "tickets" },
    { header: "Importe Total", key: "importe_total" },
    { header: "Descuento", key: "descuento" },
    { header: "Gran Total", key: "gran_total" },
    { header: "Total comisión", key: "total_comisión" },
  ];

  worksheetTwo.columns = [
    { header: "Sucursal", key: "sucursal" },
    { header: "Asesor", key: "asesor" },
    { header: "Puesto", key: "puesto" },
    { header: "ID Venta", key: "id_Venta" },
    { header: "Tipo precio", key: "tipo_precio" },
    { header: "Importe Total", key: "importeTotal" },
    { header: "Descuento", key: "descuento" },
    { header: "% Descuento", key: "porcentaje_descuento" },
    { header: "Gran Total", key: "gran_total" },
    { header: "Rubro", key: "rubro" },
    { header: "Descripcion", key: "descripcion" },
    { header: "Importe", key: "importe" },
    { header: "comision", key: "comision" },
    { header: "Porcentaje", key: "porcentaje" },
    { header: "Medio par", key: "medioPar" },
    { header: "fecha de venta", key: "fechaVenta" },
    { header: "fecha de  finalizacion", key: "fechaFinalizacion" },
  ];

  for (const venta of ventas) {
    
    worksheetOne.addRow({
      sucursal: venta.sucursal,
      asesor: venta.asesor,
      puesto: venta.gestor ? "Gestor" : "Asesor",
      tickets: venta.ventas.length,
      importe_total: totalImporte(venta.ventas),
      descuento: venta.totalDescuento,
      gran_total: venta.montoTotal,
      total_comisión: calcularComisionTotal1(
        venta.ventas,
      )

    });
    for (const detalle of venta.ventas) {
      for (const item of detalle.detalle) {
        const comision = calcularComision1(
          item.comisiones,
          porcentaje(
            detalle.detalle.reduce((acc, item) => acc + item.importe, 0),
            detalle.descuento
          )

        );


        worksheetTwo.addRow({
          sucursal: venta.sucursal,
          asesor: venta.asesor,
          puesto: venta.gestor ? "Gestor" : "Asesor",
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
          rubro: item.producto
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
          importe: item.importe,
          comision: comision,
          porcentaje: porcentaje(item.importe, comision).toFixed(2),
          medioPar: item.combinacion
            ? item.combinacion.medioPar
              ? "SI"
              : "NO"
            : "",
          fechaVenta: detalle.fechaVenta,
          fechaFinalizacion: detalle.fechaFinalizacion,
        });
      }
    }
  }

  worksheetOne.getRow(1).font = { bold: true };
  worksheetTwo.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `Comisiones-${fechaI}_${fechaF})`);
};
