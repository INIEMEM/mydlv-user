// src/App.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import Context from "./context/Context";
import { ToastProvider } from "./context/ToastContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
// Pages inside Dashboard
import Explore from "./pages/Explore";
import HandymanProfile from "./pages/HandymanProfile";
import HireHandyman from "./pages/HireHandyman";
import ShoppingList from "./pages/shoppingList";
import ProductSelection from "./pages/shoppingList/ProductSelection";
import ItemsMatchingPage from "./pages/shoppingList/shopingListdetails";
import { CartProvider } from "./context/CartContext";
import AppLayout from "./layouts/RootLayout";
import RestaurantListing from "./pages/resturant";
import RestaurantDetailsPage from "./pages/resturant/ResturantDetails";
import MyOrdersPage from "./pages/orders/MyOrdersPage";
import ServicesPage from "./pages/serivices";
import ProfilePage from "./pages/profile";
import NotificationPage from "./pages/notification";
import SupermarketListing from "./pages/supermarket";
import SuperMarketDetailsPage from "./pages/supermarket/SupermarketDetails";
import ServiceProviderDetailsPage from "./pages/serivices/ServicesDetails";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  console.log("isLoggedIn:", isLoggedIn);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* 🌱 Onboarding Route */}
        {/* <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/explore" replace /> : <Auth />
          }
        /> */}

        {/* 🔐 Auth Route (/auth?mode=login or /auth?mode=signup) */}
        <Route
          path="/auth"
          element={
            <Auth />
          }
        />

        {/* 🧭 Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
          path="/"
        >
         

          <Route index element={<Explore />} />
          <Route path="resturants" element={<AppLayout/>}>
            <Route index element={<RestaurantListing/>}/>
            <Route path=":resturant" element={<RestaurantDetailsPage/>}/>
          </Route>
          <Route path="supermarkets" element={<AppLayout/>}>
            <Route index element={<SupermarketListing/>}/>
            <Route path=":supermarket" element={<SuperMarketDetailsPage/>}/>
          </Route>
          <Route path="orders" element={<AppLayout/>}>
            <Route index element={<MyOrdersPage/>}/>
          </Route>
          {/* <Route path="/handyman/:id" element={<HandymanProfile />} />
          <Route path="/hire/:id" element={<HireHandyman />} /> */}
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/shopping-list/:item" element={<ItemsMatchingPage />} />
          <Route path="/products" element={<ProductSelection />} />
          {/* <Route path="/services" element={<ServicesPage />} /> */}
          <Route path="/services" element={<AppLayout />} >
            <Route index element={<ServicesPage />} />
            <Route path=":service" element={<ServiceProviderDetailsPage/>}/>
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationPage/>}/>
        </Route>
      </>
    )
  );

  return (
    <Context>
      <CartProvider>
       <ToastProvider>
        <RouterProvider router={router} />
       </ToastProvider>
      </CartProvider>
    </Context>
  );
}

export default App; 