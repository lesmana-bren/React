import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

export default function AdminDashboard() {
  const { products, addProduct, updateStock, deleteProduct } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "RAM",
    price: "",
    stock: "",
    image: "",
    description: "",
    specs: "",
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      return alert("Mohon isi semua field yang wajib!");
    }

    addProduct({
      ...formData,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
    });

    alert("Produk berhasil ditambahkan!");
    setFormData({
      name: "",
      category: "RAM",
      price: "",
      stock: "",
      image: "",
      description: "",
      specs: "",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Manajemen Stok RAM & SSD</h1>

      {/* Form Tambah Barang */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4">+ Tambah Jenis Barang Baru</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Produk *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Kingston FURY 16GB DDR5"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="RAM">RAM</option>
              <option value="SSD">SSD</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Harga (Rp) *</label>
            <input
              type="number"
              required
              placeholder="850000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Stok Awal *</label>
            <input
              type="number"
              required
              placeholder="10"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">URL Gambar (Opsional)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Deskripsi & Spesifikasi</label>
            <textarea
              rows="2"
              placeholder="Deskripsi singkat produk..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Simpan Produk Baru
          </button>
        </form>
      </div>

      {/* Tabel Kelola Stok */}
      <div className="bg-white p-6 rounded-xl border shadow-sm overflow-x-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Daftar Stok Produk</h2>

        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 text-xs uppercase">
              <th className="p-3">Produk</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Kelola Stok</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded bg-gray-100"
                  />
                  <span className="font-semibold text-gray-800 line-clamp-1">{item.name}</span>
                </td>
                <td className="p-3">
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-semibold">
                    {item.category}
                  </span>
                </td>
                <td className="p-3 font-medium">Rp {item.price.toLocaleString("id-ID")}</td>

                {/* Tombol Tambah/Kurang & Input Stok */}
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateStock(item.id, item.stock - 1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold text-xs"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={item.stock}
                      onChange={(e) => updateStock(item.id, e.target.value)}
                      className="w-16 p-1 border rounded text-center font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => updateStock(item.id, item.stock + 1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => {
                      if (confirm(`Hapus produk ${item.name}?`)) {
                        deleteProduct(item.id);
                      }
                    }}
                    className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded text-xs font-bold transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}