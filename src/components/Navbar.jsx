import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const { cartItemCount } = useContext(ShopContext);

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
        <Link to="/checkout" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition">
          Checkout
        </Link>
      </div>
    </nav>
  );
}