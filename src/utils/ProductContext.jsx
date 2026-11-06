import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // State untuk Filter & Keranjang (agar halaman utama Dashboard berfungsi)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [cart, setCart] = useState([]);

  // 1. GET ALL PRODUCTS (Fetch otomatis & simpan ke cache React Query)
  const { data: products = [], isLoading, isError, refetch: fetchProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      return res.data.data || res.data;
    },
  });

  // 2. GET PRODUCT BY ID (Detail Produk)
  const getProductById = async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data.data || res.data;
  };

  // 3. GET CATEGORIES
  const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data.data || res.data;
  };

  // 4. ADD PRODUCT (Otomatis refresh tabel setelah simpan)
  const addProduct = async (formData) => {
    try {
      const response = await apiClient.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      queryClient.invalidateQueries(["products"]);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 5. UPDATE PRODUCT (Gunakan _method=PUT untuk FormData)
  const updateProduct = async (id, formData) => {
    try {
      const response = await apiClient.post(`/products/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      queryClient.invalidateQueries(["products"]);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // 6. DELETE PRODUCT
  const deleteProduct = useMutation({
    mutationFn: async (id) => await apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  // 7. FUNGSI KERANJANG
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        isError,
        fetchProducts,
        getProductById,
        getCategories,
        addProduct,
        updateProduct,
        deleteProduct,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

export const ShopContext = ProductContext;
export const useShop = () => useContext(ProductContext);