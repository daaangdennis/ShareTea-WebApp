import { RecoilRoot } from "recoil";
import LandingPage from "./pages/LandingPage";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { route } from "./types/types";
import Footer from "./components/Footer";

function App() {
  const routes: route[] = [
    { name: "Home", path: "/", element: <LandingPage /> },
    { name: "Menu", path: "/", element: <LandingPage /> },
    { name: "Contact", path: "/", element: <LandingPage /> },
    { name: "Cart", path: "/", element: <LandingPage /> },
  ];

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar routes={routes} />
        <Routes>
          {routes.map((item: route) => (
            <Route path={item.path} element={item.element}></Route>
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
