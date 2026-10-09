import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ShopContext } from "../context/ShopContext";

export default function MainLayout() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useContext(ShopContext);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Bar Search & Filter */}
      <header className="bg-white border-b px-6 py-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="w-full md:w-1/2 relative">
          <input
            type="text"
            placeholder="Cari RAM DDR4/DDR5 atau SSD NVMe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 bg-white font-medium"
        >
          <option value="Semua Kategori">Semua Kategori</option>
          <option value="RAM">RAM PC & Laptop</option>
          <option value="SSD">SSD NVMe & SATA</option>
        </select>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 text-center p-4 text-sm border-t border-slate-800">
        <p>© 2026 RAM & SSD Hardware Store | Pemrograman Web</p>
      </footer>
    </div>
  );
}