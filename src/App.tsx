import React, { useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { CustomLayout } from './layout/CustomLayout';
import { Login } from './component/auth/login/Login';
import { ProductList } from './component/product/ProductList';
import { storage } from './local-storage/local-storage';

const DEFAULT_ROUTE = '/login';

const RequireAuth = () => {
  // eslint-disable-next-line max-len
  const isLoggedIn = useMemo(() => storage.getAccessToken() !== undefined && storage.getRefreshToken() !== undefined, []);

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
