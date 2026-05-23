// src/App.jsx

import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/user/Login";

/* ADMIN */
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

/* USER */
import UserLayout from "./layouts/UserLayout";
import Home from "./pages/user/Home";
import ListProduk from "./pages/user/ListProduk";

/* HALAMAN BARU */
import Checkout from "./pages/user/Checkout";
import History from "./pages/user/History";
import Profil from "./pages/user/Profil";

/* TAMBAHAN KOMPONEN REGISTER */
import Register from "./pages/user/Register"; 

function App() {
  // sementara user agar gampang testing
  const [role, setRole] = useState("user");

  return (
    <BrowserRouter>
      <Routes>

        {/* ================================= */}
        {/* LOGIN */}
        {/* ================================= */}

        {role === "guest" && (
          <Route
            path="/"
            element={<Login onLogin={setRole} />}
          />
        )}

        {/* ================================= */}
        {/* ADMIN */}
        {/* ================================= */}

        {role === "admin" && (
          <Route
            path="/admin"
            element={
              <AdminLayout
                onLogout={() => setRole("guest")}
              />
            }
          >
            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="produk"
              element={
                <div>
                  Halaman Kelola Produk
                </div>
              }
            />
          </Route>
        )}

        {/* ================================= */}
        {/* USER */}
        {/* ================================= */}

        {role === "user" && (
          <>
            {/* HOME */}
            <Route
              path="/home"
              element={
                <UserLayout
                  onLogout={() => setRole("guest")}
                >
                  <Home />
                </UserLayout>
              }
            />

            {/* MENU */}
            <Route
              path="/menu"
              element={
                <UserLayout
                  onLogout={() => setRole("guest")}
                >
                  <ListProduk />
                </UserLayout>
              }
            />

            {/* REGISTER (Terintegrasi di dalam UserLayout) */}
            <Route
              path="/register"
              element={
                <UserLayout onLogout={() => setRole("guest")}>
                  <div className="py-20 bg-zinc-900 min-h-screen flex items-center justify-center">
                    <Register isDarkMode={true} onNavigate={(page) => setRole("guest")} />
                  </div>
                </UserLayout>
              }
            />

            {/* ================================= */}
            {/* TEST MANUAL TANPA USERLAYOUT */}
            {/* ================================= */}

            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            {/* HISTORY */}
            <Route
              path="/history"
              element={<History />}
            />

            {/* PROFIL */}
            <Route
              path="/profil"
              element={<Profil />}
            />
          </>
        )}

        {/* ================================= */}
        {/* REDIRECT */}
        {/* ================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                role === "admin"
                  ? "/admin"
                  : role === "user"
                  ? "/home"
                  : "/"
              }
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;