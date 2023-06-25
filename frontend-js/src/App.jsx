import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/Category';
import My404 from './pages/404';
import Footer from './components/Footer';
import ProductPage from './pages/Product';
import CartPage from './pages/Cart';
import OrderPage from './pages/Order';
import OrderGeneratePdf from './pages/OrderGeneratePdf';
import PrivateRoute from './route/PrivateRoute';
import RegisterPage from './pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/order/generatePdf"
            element={
              <PrivateRoute>
                <OrderGeneratePdf />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<My404 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
