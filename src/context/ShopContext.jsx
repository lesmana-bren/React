import { createContext, useState, useEffect } from "react";
import { productsData } from "../data/products";

export const ShopContext = createContext();

export default function ShopProvider({ children }) {
  // Ambil data dari localStorage jika ada, jika tidak gunakan productsData awal
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("app_products");
    return saved ? JSON.parse(saved) : productsData;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("app_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  // Otomatis simpan ke localStorage setiap kali state products berubah
  useEffect(() => {
    localStorage.setItem("app_products", JSON.stringify(products));
  }, [products]);

  // Otomatis simpan keranjang ke localStorage
  useEffect(() => {
    localStorage.setItem("app_cart", JSON.stringify(cart));
  }, [cart]);

  // 1. Tambah Jenis Barang Baru
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    };
    setProducts((prev) => [productWithId, ...prev]);
  };

  // 2. Ubah / Tambah Stok Produk
  const updateStock = (id, newStock) => {
    const parsedStock = parseInt(newStock, 10);
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: isNaN(parsedStock) ? 0 : Math.max(0, parsedStock) }
          : item
      )
    );
  };

  // 3. Hapus Barang
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // 4. Proses Checkout (Potong Stok)
  const processCheckout = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        if (cartItem) {
          return {
            ...product,
            stock: Math.max(0, product.stock - cartItem.quantity),
          };
        }
        return product;
      })
    );
    setCart([]);
  };

  const addToCart = (product, quantity = 1) => {
    if (product.stock <= 0) return alert("Stok produk habis!");
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        const newQty = updatedCart[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
          alert(`Stok maksimal hanya ${product.stock}`);
          return prevCart;
        }
        updatedCart[existingIndex].quantity = newQty;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            if (newQty > item.stock) {
              alert(`Stok tidak mencukupi (Sisa: ${item.stock})`);
              return item;
            }
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        processCheckout,
        addProduct,
        updateStock,
        deleteProduct,
        cartTotal,
        cartItemCount,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}