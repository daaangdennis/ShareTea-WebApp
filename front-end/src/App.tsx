import { RecoilRoot } from "recoil";
import LandingPage from "./pages/LandingPage";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { route } from "./types/types";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import MenuPage from "./pages/MenuPage";
import CustomPage from "./pages/CustomPage";
import OrdersPage from "./pages/OrdersPage";
import CashierOrderPage from "./pages/CashierOrderPage";
import StatsPage from "./pages/StatsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/product/getbestselling`;

    const fetchServerStatus = () => {
      console.log("Checking server status");

      fetch(backendUrl)
        .then((response) => {
          if (response.ok) {
            console.log("Server is up and running");
          } else {
            console.log(
              `Failed to check server status with status code: ${response.status}`
            );
          }
        })
        .catch((err) => {
          console.error("Error during server check:", err.message);
        });
    };

    // Schedule the task to run every 14 minutes
    const intervalId = setInterval(fetchServerStatus, 14 * 60 * 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const routes: route[] = [
    { name: "Home", path: "/", element: <LandingPage /> },
    { name: "Menu", path: "/Menu", element: <MenuPage /> },
    {
      name: "Your Orders",
      path: "/UserOrders",
      element: <UserOrdersPage />,
      roles: ["customer", "manager", "cashier", "admin"],
    },
    { name: "Cart", path: "/Cart", element: <CartPage /> },

    {
      name: "Dashboard",
      path: "/Dashboard",
      element: <DashboardPage />,
      roles: ["manager", "admin"],
    },
    {
      name: "Orders",
      path: "/Orders",
      element: <OrdersPage />,
      roles: ["manager", "cashier", "admin"],
    },
  ];

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar routes={routes} />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/Menu" element={<MenuPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route
            element={
              <ProtectedRoute
                roles={["customer", "admin", "manager", "cashier"]}
              />
            }
          >
            {/* Add routes accessible by customer only here */}
            <Route path="/UserOrders" element={<UserOrdersPage />} />
          </Route>
          <Route
            element={<ProtectedRoute roles={["cashier", "manager", "admin"]} />}
          >
            {/* Add routes accessible by cashier and manager here */}
            <Route path="/UserOrders" element={<UserOrdersPage />} />

            <Route path="/Orders" element={<OrdersPage />} />
          </Route>
          <Route element={<ProtectedRoute roles={["manager", "admin"]} />}>
            {/* Add routes accessible by manager only here */}
            <Route path="/UserOrders" element={<UserOrdersPage />} />
            <Route path="/Dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

{
  /* <Route path="/login" element={<LoginPage />}></Route>; */
}
