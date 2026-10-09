import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-700">Produk tidak ditemukan!</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
      <Link to="/" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Kembali ke Katalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gambar Produk */}
        <div className="bg-gray-100 rounded-xl overflow-hidden h-80 md:h-96">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informasi Detail */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mt-3">{product.name}</h1>

            <p className="text-3xl font-extrabold text-blue-600 mt-4">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            {/* Status Stok */}
            <div className="mt-4">
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0 ? `Sisa Stok: ${product.stock} Unit` : "Stok Habis"}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 border-b pb-1">Spesifikasi Utama:</h3>
              <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg font-mono">
                {product.specs}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 border-b pb-1">Deskripsi Produk:</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Pengaturan Kuantitas & Tambah ke Keranjang */}
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock <= 0}
              className={`flex-1 w-full py-3 rounded-lg font-bold text-white transition ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Masukkan ke Keranjang" : "Stok Tidak Tersedia"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}