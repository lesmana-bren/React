import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { cartItemCount } = useContext(ShopContext);
  const navigate = useNavigate();

  // Ambil data autentikasi dari localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Berhasil logout!");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="font-bold text-2xl text-blue-400 tracking-wide flex items-center gap-2">
        ⚡ RAM & SSD Store
      </Link>

      <div className="flex gap-6 items-center font-medium">
        <Link to="/" className="hover:text-blue-400 transition">
          Katalog Produk
        </Link>

        <Link to="/cart" className="relative hover:text-blue-400 transition flex items-center">
          Keranjang
          {cartItemCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItemCount}
            </span>
          )}
        </Link>

        <Link to="/checkout" className="hover:text-blue-400 transition">
          Checkout
        </Link>

        {/* Status Login / Navigasi Auth Dinamis */}
        {token ? (
          <div className="flex items-center gap-4 border-l border-slate-700 pl-4">
            {/* Tampilkan tombol Admin jika role user adalah admin */}
            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-sm transition"
              >
                Admin Panel
              </Link>
            )}

            <span className="text-sm text-slate-300">
              Halo, <strong className="text-white">{user.name || "User"}</strong>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
            <Link to="/login" className="hover:text-blue-400 text-sm transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
            >
              Daftar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}