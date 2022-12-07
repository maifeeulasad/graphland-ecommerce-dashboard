import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { CustomLayout } from './layout/CustomLayout';
import { Page3 } from './component/Page3';
import { Login } from './component/auth/login/Login';
import { ProductList } from './component/product/ProductList';

const DEFAULT_ROUTE = '/login';

const RequireAuth = () => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to={DEFAULT_ROUTE} />;
  }

  return <Outlet />;
};

const App = () => (
  <BrowserRouter basename="/graphland-ecommerce-dashboard">
    <CustomLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/page3" element={<Page3 />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={DEFAULT_ROUTE} replace />}
        />
      </Routes>
    </CustomLayout>
  </BrowserRouter>

);

// eslint-disable-next-line import/no-default-export
export default App;
