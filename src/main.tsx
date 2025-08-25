import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { HomeScreen, ProductsScreen, ProductDetailsScreen, CategoriesScreen, CategoryDetailsScreen, ContactScreen, AdminScreen, LoginScreen, SignupScreen, ErrorScreen, CartScreen, CheckoutScreen, OrderConfirmationScreen, OrderTrackingScreen, WishlistScreen } from "./screens";

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
        path: "/categories",
        element: <CategoriesScreen />,
      },
      {
        path: "/category-details",
        element: <CategoryDetailsScreen />,
      },
      {
        path: "/contact",
        element: <ContactScreen />,
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
        path: "/checkout",
        element: <CheckoutScreen />,
      },
      {
        path: "/order-confirmation/:orderId",
        element: <OrderConfirmationScreen />,
      },
      {
        path: "/order-tracking/:orderId",
        element: <OrderTrackingScreen />,
      },
      {
        path: "/wishlist",
        element: <WishlistScreen />,
      },
      {
        path: "/auth/login",
        element: <LoginScreen />,
      },
      {
        path: "/auth/signup", 
        element: <SignupScreen />,
      },
    ],
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

