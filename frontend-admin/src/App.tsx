import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAuth from './components/LayoutAuth';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import Layouts from './components/Layout';
import PrivateRoute from './route/PrivateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutAuth />}>
            <Route index element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Layouts />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
