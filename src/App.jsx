import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

// Pages Admin
import AdminDashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';

// Pages User
import UserHome from './pages/user/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Khusus User */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          {/* Halaman user lainnya di sini */}
        </Route>

        {/* Rute Khusus Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ManageProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}