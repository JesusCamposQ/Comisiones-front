import { Comision, MetaProductosVip } from "../interfaces/venta.interface";
import { descontarPorcentajeAcomision } from "./ventaUtils";

export const calcularComision1 = (
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
 
  
  if (Array.isArray(comisiones) && comisiones.length > 0) {
    console.log(comisiones);
    
    const [mayorMonto, menorMonto] = comisiones.reduce(
      ([mayor, menor], actual) => [
        actual.monto > mayor.monto ? actual : mayor,
        actual.monto < menor.monto ? actual : menor,
      ],
      [{ monto: 0 }, { monto: Infinity }]
    );
  ;

    if (empresa === "OPTICENTRO") {
      if (gestor) {
        comisionProducto += mayorMonto.monto;
        llave = true;
      } else {
        if (
          metaProductosVip &&
          gestor == false &&
          productovip >= llaveVip &&
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
    } else if (empresa === "OPTISERVICE S.R.L") {
      comisionProducto += menorMonto.monto;
    } else {
      comisionProducto += mayorMonto.monto;
    }
  }


  if (gestor || llave) {
    llave = true;
  }
  
  return {
    comison: descontarPorcentajeAcomision(comisionProducto, porcentaje)
  };
};