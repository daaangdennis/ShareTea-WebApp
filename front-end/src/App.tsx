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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const routes: route[] = [
    { name: "Home", path: "/", element: <LandingPage /> },
    { name: "Menu", path: "/Menu", element: <MenuPage /> },
    { name: "Cart", path: "/Cart", element: <CartPage /> },
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
          </Route>
          <Route element={<ProtectedRoute roles={["manager"]} />}>
            {/* Add routes accessible by manager only here */}
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

<Route path="/login" element={<LoginPage />}></Route>;
