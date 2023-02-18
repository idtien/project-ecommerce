import { Route, Routes, BrowserRouter } from "react-router-dom";


import './App.css';
import HomeLayout from "./layout/HomeLayout";
import About from "./pages/AboutPage";
import Shop from "./components/Shop";
import ProductDetails from "./components/ProductDetail";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import WishListPage from "./pages/WishListPage";
import LoginLayout from "./layout/LoginLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishList" element={<WishListPage />} />
          <Route path="product" element={<ProductDetails />} />
        </Route>
        <Route
          path="/login"
          element={
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          }>
        </Route>
        <Route
          path="register"
          element={
            <LoginLayout>
              <RegisterPage />
            </LoginLayout>
          }>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
