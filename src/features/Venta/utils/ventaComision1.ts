import { Comision,  VentaElement } from "../interfaces/venta.interface";
import { descontarPorcentajeAcomision, porcentaje } from "./ventaUtils";

export const calcularComision1 = (
  comisiones: Comision[],

  porcentaje: number,

) => {

  let comision = 0;


  if (Array.isArray(comisiones) && comisiones.length > 0) {
   
    const [mayorMonto, _] = comisiones.reduce(
      ([mayor, menor], actual) => [
        actual.monto > mayor.monto ? actual : mayor,
        actual.monto < menor.monto ? actual : menor,
      ],
      [{ monto: 0 }, { monto: 0 }]
    );

    comision += mayorMonto.monto;
  }

  return descontarPorcentajeAcomision(comision, porcentaje)

}

export function calcularComisionTotal1(
  ventas: VentaElement[],
) {
  return ventas.reduce((acc, venta) => {
    const importeTotal = venta.detalle.reduce(
      (acc, detalle) => acc + detalle.importe,
      0
    );
    const porcentajeDescuento = porcentaje(importeTotal, venta.descuento);
    return (
      acc +
      venta.detalle.reduce((acc, detalle) => {
        const comision = calcularComision1(
          detalle.comisiones,
          porcentajeDescuento,
        );
        return acc + comision;
      }, 0)
    );
  }, 0);
}
