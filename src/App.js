import { Route, Routes, BrowserRouter } from "react-router-dom";


import './App.css';
import HomeLayout from "./layout/HomeLayout";
import About from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import Shop from "./components/Shop";
import ProductDetails from "./components/ProductDetail";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import WishListPage from "./pages/WishListPage";
import LoginLayout from "./layout/LoginLayout";
import UserProfilePage from "./pages/UserProfilePage";
import ContactPage from "./pages/ContactPage";
import AdminLayout from "./layout/AdminLayout";
import CustomerAdmin from "./components/AdminComponents/CustomerAdmin";
import ProductAdmin from "./components/AdminComponents/PruductAdmin";
import OrdersAdmin from "./components/AdminComponents/OrdersAdmin";
import DashboardAdmin from "./components/AdminComponents/DashboardAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product_details" element={<ProductDetails />} />
          <Route path="wishList" element={<WishListPage />} />
          <Route path="profile_user" element={<UserProfilePage />} />
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="customer" element={<CustomerAdmin />} />
          <Route path="product" element={<ProductAdmin />} />
          <Route path="order" element={<OrdersAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
