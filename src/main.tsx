import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { 
  HomeScreen, 
  ProductsScreen, 
  ProductDetailsScreen, 
  CartScreen,
  ContactScreen,
  CategoriesScreen,
  ProfileScreen, 
  WishlistScreen, 
  AdminScreen, 
  LoginScreen, 
  SignupScreen, 
  ErrorScreen 
} from "./screens";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/products",
        element: <ProductsScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/contact",
        element: <ContactScreen />,
      },
      {
        path: "/categories",
        element: <CategoriesScreen />,
      },
      {
        path: "/profile",
        element: <ProfileScreen />,
      },
      {
        path: "/wishlist",
        element: <WishlistScreen />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/auth/signup",
    element: <SignupScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/admin",
    element: <AdminScreen />,
    errorElement: <ErrorScreen />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

