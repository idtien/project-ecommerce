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
import UserProfilePage from "./pages/UserProfilePage";
import ContactPage from "./pages/ContactPage";
import AdminLayout from "./layout/AdminLayout";
import CustomerAdmin from "./components/AdminComponents/CustomerAdmin";
import ProductAdmin from "./components/AdminComponents/PruductAdmin";
import OrdersAdmin from "./components/AdminComponents/OrdersAdmin";
import DashboardAdmin from "./components/AdminComponents/DashboardAdmin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actReLogin } from "./redux/features/User/userSlice";
import { fetchAllProduct } from "./redux/features/Product/productSlice";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const dispatch = useDispatch()

  const accessToken = useSelector(state => state.users.accessToken)
  const { isLogged, user } = useSelector(state => state.users)
  useEffect(() => {
    if (accessToken) {
      dispatch(actReLogin(accessToken))
    }
  }, [])

  useEffect(() => {
    dispatch(fetchAllProduct())
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="products/:id" element={<ProductDetails />} />
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
        <Route path="error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
