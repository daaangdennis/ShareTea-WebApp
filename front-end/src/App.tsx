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
import PendingPage from "./pages/PendingPage";
import CashierOrderPage from "./pages/CashierOrderPage";
import StatsPage from "./pages/StatsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import InventoryPage from "./pages/InventoryPage";

function App() {
  const routes: route[] = [
    { name: "Home", path: "/", element: <LandingPage /> },
    { name: "Menu", path: "/Menu", element: <MenuPage /> },
    { name: "Cart", path: "/Cart", element: <CartPage /> },
    {
      name: "CashierOrder",
      path: "/CashierOrder",
      element: <CashierOrderPage />,
      roles: ["cashier", "manager"],
    },
    {
      name: "Statistics",
      path: "/stats",
      element: <StatsPage />,
      roles: ["cashier", "manager"],
    },
    {
      name: "Inventory",
      path: "/Inventory",
      element: <InventoryPage />,
      roles: ["cashier", "manager"],
    },
    {
      name: "Pending Orders",
      path: "/Pending",
      element: <PendingPage />,
      roles: ["manager", "cashier"],
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

          <Route element={<ProtectedRoute roles={["cashier", "manager"]} />}>
            {/* Add routes accessible by cashier and manager here */}
            <Route path="/CashierOrder" element={<CashierOrderPage />} />
            <Route path="/Pending" element={<PendingPage />} />
          </Route>
          <Route element={<ProtectedRoute roles={["manager"]} />}>
            {/* Add routes accessible by manager only here */}
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/Inventory" element={<InventoryPage />} />
            <Route path="/Pending" element={<PendingPage />} />
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
