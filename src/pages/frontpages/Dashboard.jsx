import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

export default function Dashboard() {
  const { products, searchQuery, selectedCategory, addToCart } = useContext(ShopContext);

  // Filter Produk Berdasarkan Search & Kategori
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua Kategori" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Katalog Komponen Komputer</h1>
        <span className="text-sm text-gray-500">Menampilkan {filteredProducts.length} produk</span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Produk yang Anda cari tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Gambar Produk */}
                <div className="h-48 bg-gray-100 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900 text-white text-xs px-2 py-1 rounded font-semibold">
                    {product.category}
                  </span>
                </div>

                <div className="p-4">
                  <h2 className="font-bold text-gray-800 text-lg leading-snug line-clamp-2 h-14">
                    {product.name}
                  </h2>

                  {/* Informasi Stok */}
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-bold text-lg">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-xs ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0 ? `Stok: ${product.stock}` : "Stok Habis"}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t bg-gray-50 flex gap-2">
                <Link
                  to={`/product/${product.id}`}
                  className="flex-1 text-center py-2 px-3 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
                >
                  Detail
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium text-white transition ${
                    product.stock > 0
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}