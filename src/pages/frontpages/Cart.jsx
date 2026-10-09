import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useContext(ShopContext);

  if (cart.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-8 text-center max-w-lg mx-auto my-8">
        <p className="text-gray-500 text-lg font-medium">Keranjang belanja Anda masih kosong.</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Mulai Belanja RAM & SSD
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Keranjang Belanja</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg bg-gray-100"
              />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Rp {item.price.toLocaleString("id-ID")} / unit
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-6">
              {/* Tombol Tambah / Kurang Kuantitas */}
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm font-bold"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-blue-600 text-sm sm:text-base">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-xs font-semibold"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ringkasan Total Pembayaran */}
      <div className="mt-8 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-gray-500 text-sm">Total Pembayaran:</span>
          <p className="text-2xl font-extrabold text-gray-900">
            Rp {cartTotal.toLocaleString("id-ID")}
          </p>
        </div>

        <Link
          to="/checkout"
          className="w-full sm:w-auto bg-blue-600 text-white text-center px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Lanjut ke Checkout
        </Link>
      </div>
    </div>
  );
}