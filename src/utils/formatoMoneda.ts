function formatoMoneda(number: number, sucursal?: string) {
    if(!sucursal){
      return number.toLocaleString('es-BO',{
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    if(sucursal?.toUpperCase().includes("PARAGUAY")){
      return number.toLocaleString('es-PY', { style: 'currency', currency: 'PYG' });
    }
    
    return number.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' });
  }

export default formatoMoneda
