import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

export default function Checkout() {
  const { cart, cartTotal, processCheckout } = useContext(ShopContext); // <-- Ambil processCheckout
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "Transfer Bank (BCA/Mandiri)",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Keranjang Anda kosong!");

    // Jalankan pemotongan stok dan pengosongan keranjang
    processCheckout();

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white border rounded-2xl p-8 max-w-lg mx-auto text-center shadow-md">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl mb-4 font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Pesanan Berhasil Dibuat!</h1>
        <p className="text-gray-600 text-sm mt-2">
          Terima kasih telah berbelanja di store kami. Pesanan RAM/SSD Anda sedang diproses.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Kembali ke Katalog Utama
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tidak ada produk untuk di-checkout.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Data Pembeli */}
      <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Informasi Pengiriman</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              required
              placeholder="Contoh: Budi Santoso"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              placeholder="budi@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Alamat Lengkap Pengiriman</label>
            <textarea
              required
              rows="3"
              placeholder="Jl. Raya Kampus Undiksha..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Metode Pembayaran</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="Transfer Bank (BCA/Mandiri)">Transfer Bank (BCA / Mandiri)</option>
              <option value="E-Wallet (Gopay/QRIS)">E-Wallet (Gopay / QRIS)</option>
              <option value="COD (Bayar di Tempat)">COD (Bayar di Tempat)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-6"
          >
            Konfirmasi & Buat Pesanan
          </button>
        </form>
      </div>

      {/* Ringkasan Pesanan */}
      <div className="bg-white border rounded-xl p-6 shadow-sm h-fit">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
        <div className="space-y-3 border-b pb-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600 line-clamp-1 w-2/3">
                {item.name} (x{item.quantity})
              </span>
              <span className="font-medium text-gray-800">
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg pt-4 text-gray-900">
          <span>Total Biaya:</span>
          <span className="text-blue-600">Rp {cartTotal.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}