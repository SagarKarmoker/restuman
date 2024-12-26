import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Error404 from './pages/Error404';
import AllFoodsPage from './pages/AllFoods';
import axios from 'axios';
import Food from './pages/Food';
import PurchaseFoodPage from './pages/PurchaseFood';
import Gallery from './pages/Gallery';
import MyFoodsPage from './pages/MyFoodsPage';
import AddFood from './pages/AddFood';
import MyOrders from './pages/MyOrders';
import AuthProvider from './providers/AuthProvider.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoutes from './routers/PrivateRoutes.jsx';
import UpdateMyFood from './pages/UpdateMyFood.jsx';
import ThemeProvider from './providers/ThemeProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/allfoods",
        element: <AllFoodsPage />,
        loader: async () => await axios.get('http://localhost:5000/api/v1/all-foods')
      },
      {
        path: "/gallery",
        element: <Gallery />
      },
      {
        path: "/food/:id",
        element: <Food />,
        loader: async ({ params }) => await axios.get(`http://localhost:5000/api/v1/food/${params.id}`)
      },
      {
        path: "/purchase-food/:id",
        element: <PrivateRoutes>
          <PurchaseFoodPage />
        </PrivateRoutes>,
        loader: async ({ params }) => await axios.get(`http://localhost:5000/api/v1/food/${params.id}`)
      },
      {
        path: "/my-foods",
        element: <PrivateRoutes>
          <MyFoodsPage />
        </PrivateRoutes>
      },
      {
        path: "/add-food",
        element: <PrivateRoutes>
          <AddFood />
        </PrivateRoutes>,
      },
      {
        path: "/my-orders",
        element: <PrivateRoutes>
          <MyOrders />
        </PrivateRoutes>
      },
      {
        path: "/dashboard",
        element: <PrivateRoutes>
          <Dashboard />
        </PrivateRoutes>,
      },
      {
        path: "/update-food/:id",
        element: <PrivateRoutes>
          <UpdateMyFood />
        </PrivateRoutes>,
        loader: async ({ params }) => await axios.get(`http://localhost:5000/api/v1/food/${params.id}`)
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
