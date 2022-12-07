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

const UNAUTHENTICATED_DEFAULT_ROUTE = '/login';
const AUTHENTICATED_DEFAULT_ROUTE = '/product-list';
const DEFAULT_ROUTE = UNAUTHENTICATED_DEFAULT_ROUTE;

interface IRequireAuth {
  requireLogin?: boolean
}

const RequireAuth = ({ requireLogin }: IRequireAuth) => {
  // eslint-disable-next-line max-len
  const isLoggedIn = useMemo(() => storage.getAccessToken() !== undefined && storage.getRefreshToken() !== undefined, []);

  if (requireLogin && !isLoggedIn) {
    return <Navigate to={UNAUTHENTICATED_DEFAULT_ROUTE} />;
  }

  if (!requireLogin && isLoggedIn) {
    return <Navigate to={AUTHENTICATED_DEFAULT_ROUTE} />;
  }

  return <Outlet />;
};

const App = () => (
  <BrowserRouter basename="/graphland-ecommerce-dashboard">
    <CustomLayout>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<RequireAuth requireLogin />}>
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
