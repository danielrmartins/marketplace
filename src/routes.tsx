import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';
import { Dashboard } from './pages/app/dashboard/dashboard';
import { NewProduct } from './pages/app/new-product';
import { Products } from './pages/app/products';
import { SignIn } from './pages/auth/sign-in';
import { SignUp } from './pages/auth/sign-up';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <Error />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/products', element: <Products /> },
      { path: '/new-products', element: <NewProduct /> },
      // { path: '/orders', element: <Orders /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);
