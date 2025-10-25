// src/App.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

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
// import Notifications from "./pages/Notifications";
// import ShoppingList from "./pages/ShoppingList";
// import MyRider from "./pages/MyRider";
// import MyOrders from "./pages/MyOrders";
// import MyServices from "./pages/MyServices";
// import Support from "./pages/Support";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* 🌱 Onboarding Route */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/explore" replace /> : <Index />
          }
        />

        {/* 🔐 Auth Route (/auth?mode=login or /auth?mode=signup) */}
        <Route
          path="/auth"
          element={
            isLoggedIn ? <Navigate to="/explore" replace /> : <Auth />
          }
        />

        {/* 🧭 Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/explore" element={<Explore />} />
          <Route path="/handyman/:id" element={<HandymanProfile />} />
          <Route path="/hire/:id" element={<HireHandyman />} />
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="/products" element={<ProductSelection />} />
          {/* <Route path="/notifications" element={<Notifications />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/my-rider" element={<MyRider />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-services" element={<MyServices />} />
          <Route path="/support" element={<Support />} /> */}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
