import {
  Comision,
  MetaProductosVip,
  VentaElement,
} from "../interfaces/venta.interface";

export function porcentaje(total: number, monto: number) {
  if (total <= 0) {
    return 0;
  }
  /*if(sucursal && sucursal.includes("PARAGUAY")){
      return 3.00
    }*/
  const porcentaje = (monto / total) * 100;
  return Number(porcentaje.toFixed(2)) || 0;
}

export function descontarPorcentajeAcomision(
  comision: number,
  porcentaje: number
): number {
  if (
    !Number.isFinite(comision) ||
    !Number.isFinite(porcentaje) ||
    comision < 0 ||
    porcentaje < 0 ||
    porcentaje > 100
  ) {
    return 0;
  }

  const resultado = comision * (1 - porcentaje / 100);
  return Number(resultado.toFixed(2));
}
export const calcularComision = (
  comisiones: Comision[],
  gafaVip: number,
  monturaVip: number,
  lenteDeContacto: number,
  metaProductosVip: MetaProductosVip | null,
  empresa: string,
  porcentaje: number,
  sucursal: string,
  gestor: boolean
) => {
  let llave: boolean = false;
  const productovip = gafaVip + monturaVip;

  const llaveVip = metaProductosVip
    ? metaProductosVip.gafa + metaProductosVip.montura
    : 0;

  let comisionProducto = 0;

  if (Array.isArray(comisiones) && comisiones.length > 0 ) {
    const [mayorMonto, menorMonto] = comisiones.reduce(
      ([mayor, menor], actual) => [
        actual.monto > mayor.monto ? actual : mayor,
        actual.monto < menor.monto ? actual : menor,
      ],
      [{ monto: 0 }, { monto: Infinity }]
    );

    if (empresa === "OPTICENTRO") {

      
        
      if (gestor) {
        
        comisionProducto += mayorMonto.monto;
        llave = true;  
      } else {
        if (
          metaProductosVip && gestor== false &&  productovip >= llaveVip &&
          lenteDeContacto >= metaProductosVip.lenteDeContacto
        ) {
          comisionProducto += mayorMonto.monto;
          llave = true;
        } else if (sucursal === "OPTICENTRO PARAGUAY") {
          comisionProducto += mayorMonto.monto;
        } else {
          comisionProducto += menorMonto.monto;
        }
      }
    } else {
      comisionProducto += mayorMonto.monto;
    }
  }
  console.log(llave);
  if(gestor || llave){
    llave = true;
  }
  
  return {
    comison: descontarPorcentajeAcomision(comisionProducto, porcentaje),
    llave,
  };
};

export function calcularComisionTotal(
  ventas: VentaElement[],
  metaProductosVip: MetaProductosVip | null,
  gafaVip: number,
  monturaVip: number,
  lenteDeContacto: number,
  empresa: string,
  sucursal: string,
  gestor: boolean
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
        const comision = calcularComision(
          detalle.comisiones,
          gafaVip,
          monturaVip,
          lenteDeContacto,
          metaProductosVip,
          empresa,
          porcentajeDescuento,
          sucursal,
          gestor
        );
        return acc + comision.comison;
      }, 0)
    );
  }, 0);
}

export function extraerLlave(
  ventas: VentaElement[],
  metaProductosVip: MetaProductosVip | null,
  gafaVip: number,
  monturaVip: number,
  lenteDeContacto: number,
  empresa: string,
  sucursal: string,
  gestor: boolean,
) {
  let llave: boolean = false;

  
  for (const venta of ventas) {
    const importeTotal = venta.detalle.reduce(
      (acc, detalle) => acc + detalle.importe,
      0
    );
    const porcentajeDescuento = porcentaje(importeTotal, venta.descuento);
    for (const detalle of venta.detalle) {
      const comison = calcularComision(
        detalle.comisiones,
        gafaVip,
        monturaVip,
        lenteDeContacto,
        metaProductosVip,
        empresa,
        porcentajeDescuento,
        sucursal,
        gestor
      );
      llave = comison.llave;
    }
  }

  
  return llave;
}

export const totalImporte = (ventas: VentaElement[]) => {
  let importe: number = 0;
  for (const venta of ventas) {
    for (const detalle of venta.detalle) {
      importe += detalle.importe;
    }
  }
  return importe;
};
