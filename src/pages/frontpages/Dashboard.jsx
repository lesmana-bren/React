import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../utils/ProductContext"; 

export default function Dashboard() {
  const { products, loading, searchQuery, selectedCategory, addToCart } =
    useContext(ShopContext);

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Memuat data produk dari server...</p>
      </div>
    );
  }

  // Filter Produk Berdasarkan Search & Kategori (Safe fallback property)
  const filteredProducts = products.filter((p) => {
    const name = p.name || p.nama || "";
    const description = p.description || p.deskripsi || "";
    const categoryName =
      typeof p.category === "object"
        ? p.category?.name
        : p.category || p.kategori || "Umum";

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua Kategori" || categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Katalog Komponen Komputer
        </h1>
        <span className="text-sm text-gray-500">
          Menampilkan {filteredProducts.length} produk
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Produk yang Anda cari tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const name = product.name || product.nama || "Tanpa Nama";
            const price = Number(product.price || product.harga || 0);
            const stock = product.stock ?? product.stok ?? 0;
            const description = product.description || product.deskripsi || "";
            const categoryName =
              typeof product.category === "object"
                ? product.category?.name
                : product.category || product.kategori || "Umum";
            const image =
              product.image ||
              product.image_url ||
              "https://via.placeholder.com/300";

            return (
              <div
                key={product.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Gambar Produk */}
                  <div className="h-48 bg-gray-100 overflow-hidden relative">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-slate-900 text-white text-xs px-2 py-1 rounded font-semibold">
                      {categoryName}
                    </span>
                  </div>

                  <div className="p-4">
                    <h2 className="font-bold text-gray-800 text-lg leading-snug line-clamp-2 h-14">
                      {name}
                    </h2>

                    {/* Informasi Stok */}
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-blue-600 font-bold text-lg">
                        Rp {price.toLocaleString("id-ID")}
                      </span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded text-xs ${
                          stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {stock > 0 ? `Stok: ${stock}` : "Stok Habis"}
                      </span>
                    </div>

                    <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                      {description}
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
                    disabled={stock <= 0}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium text-white transition ${
                      stock > 0
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}