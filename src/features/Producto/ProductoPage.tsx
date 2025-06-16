
import { Outlet } from 'react-router';

const ProductoPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default ProductoPage;
