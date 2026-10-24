import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data;
  };

  const addProduct = async (formData) => {
    return await apiClient.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const deleteProduct = useMutation({
    mutationFn: async (id) => await apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return (
    <ProductContext.Provider value={{ getCategories, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);