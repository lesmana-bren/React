import React, { useState } from "react";
import { useProducts } from "../../utils/ProductContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const { products, isLoading, isError, addProduct, updateProduct, deleteProduct, getCategories } = useProducts();

  // State untuk Modal Pop-up
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // State Form
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
    img: null,
  });
  const [errors, setErrors] = useState({});

  // Fetch Kategori untuk pilihan dropdown di Modal
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Handle Buka Modal Tambah
  const handleOpenAdd = () => {
    setIsEdit(false);
    setSelectedId(null);
    setFormData({ name: "", price: "", stock: "", category_id: "", description: "", img: null });
    setErrors({});
    setIsModalOpen(true);
  };

  // Handle Buka Modal Edit
  const handleOpenEdit = (product) => {
    setIsEdit(true);
    setSelectedId(product.id);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      category_id: product.category_id || "",
      description: product.description || "",
      img: product.img_url || null,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Handle Input Form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle Submit Form (Tambah & Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      if (isEdit) {
        await updateProduct(selectedId, data);
        toast.success("Produk berhasil diperbarui!");
      } else {
        await addProduct(data);
        toast.success("Produk berhasil ditambahkan!");
      }
      setIsModalOpen(false); // Tutup Modal
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal menyimpan produk.");
      }
    }
  };

  // Handle Hapus Produk
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus produk ini?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Produk berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus produk.");
    }
  };

  if (isLoading) return <p className="p-4">Memuat data produk...</p>;
  if (isError) return <p className="p-4 text-red-500">Gagal mengambil data dari API Laravel.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Produk</h1>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Tambah Produk
        </button>
      </div>

      {/* TABEL DAFTAR PRODUK */}
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Harga</th>
            <th className="p-2 border">Stok</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((p, index) => (
              <tr key={p.id}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                  <img src={p.img_url} alt={p.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-2 border">
                  {p.name} <br />
                  <small className="text-gray-500">#{p.category?.name || "No Category"}</small>
                </td>
                <td className="p-2 border">Rp. {p.price}</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                Belum ada data produk di database API Laravel.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL POP-UP (TAMBAH / EDIT PRODUK) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Produk"
                  className="w-full border rounded-md p-2"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  >
                  <option value="">-- Pilih Kategori --</option>
                  {Array.isArray(categories) &&
                    categories.map((cat) => (
                      <option key={cat.id || cat.category_id} value={cat.id || cat.category_id}>
                        {cat.name || cat.category}
                      </option>
                    ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.category_id[0]}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Harga"
                    className="w-full border rounded-md p-2"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Stok"
                    className="w-full border rounded-md p-2"
                  />
                  {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock[0]}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Deskripsi produk"
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Produk</label>
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm"
                />
                {errors.img && <p className="text-red-500 text-sm mt-1">{errors.img[0]}</p>}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}