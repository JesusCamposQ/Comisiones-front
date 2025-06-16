// src/app/routes.tsx
import { Route, Routes } from 'react-router-dom';
import AsesorPage from '../features/Asesor/AsesorPage';
import ColorPage from '../features/Color/ColorPage';
import ColorLentePage from '../features/ColorLente/ColorLentePage';
import CombinacionRecetaPage from '../features/CombinacionReceta/pages/CombinacionRecetaPage';
import ComisionProductoPage from '../features/ComisionProducto/ComisionProductoPage';
import ComisionRecetaPage from '../features/ComisionReceta/pages/ComisionRecetaPage';
import DetallePrecioPage from '../features/DetallePrecio/DetallePrecioPage';
import DetalleVentaPage from '../features/DetalleVenta/DetalleVentaPage';
import EmpresaPage from '../features/Empresa/EmpresaPage';
import MarcaPage from '../features/Marca/MarcaPage';
import MarcaLentePage from '../features/MarcaLente/MarcaLentePage';
import MaterialPage from '../features/Material/MaterialPage';
import PrecioPage from '../features/Precio/PrecioPage';
import ProductoPage from '../features/Producto/ProductoPage';
import RangoPage from '../features/Rango/RangoPage';
import SucursalPage from '../features/Sucursal/SucursalPage';
import TipoColorLentePage from '../features/TipoColorLente/TipoColorLentePage';
import TipoLentePage from '../features/TipoLente/TipoLentePage';
import TipoMonturaPage from '../features/TipoMontura/TipoMonturaPage';
import TratamientoPage from '../features/Tratamiento/TratamientoPage';
import VentaPage from '../features/Venta/VentaPage';
import {AutenticacionPage} from '../features/Autenticacion/page/AutenticacionPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AutenticacionPage />} />
      <Route path="/asesor" element={<AsesorPage />} />
      <Route path="/color" element={<ColorPage />} />
      <Route path="/colorlente" element={<ColorLentePage />} />
      <Route path="/combinacionreceta" element={<CombinacionRecetaPage />} />
      <Route path="/comisionproducto" element={<ComisionProductoPage />} />
      <Route path="/comisionreceta" element={<ComisionRecetaPage />} />
      <Route path="/detalleprecio" element={<DetallePrecioPage />} />
      <Route path="/detalleventa" element={<DetalleVentaPage />} />
      <Route path="/empresa" element={<EmpresaPage />} />
      <Route path="/marca" element={<MarcaPage />} />
      <Route path="/marcalente" element={<MarcaLentePage />} />
      <Route path="/material" element={<MaterialPage />} />
      <Route path="/precio" element={<PrecioPage />} />
      <Route path="/producto" element={<ProductoPage />} />
      <Route path="/rango" element={<RangoPage />} />
      <Route path="/sucursal" element={<SucursalPage />} />
      <Route path="/tipocolorlente" element={<TipoColorLentePage />} />
      <Route path="/tipolente" element={<TipoLentePage />} />
      <Route path="/tipomontura" element={<TipoMonturaPage />} />
      <Route path="/tratamiento" element={<TratamientoPage />} />
      <Route path="/venta" element={<VentaPage />} />
    </Routes>
  );
};

export default AppRoutes;
