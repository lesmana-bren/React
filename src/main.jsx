import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// Impor Provider dari file yang benar di proyek kamu
import ShopContextProvider from "./context/ShopContext.jsx"; // Sesuaikan nama ekspor dari ShopContext
import { ProductProvider } from "./utils/ProductContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <ShopContextProvider>
          <BrowserRouter>
            <App />
            <Toaster position="top-right" />
          </BrowserRouter>
        </ShopContextProvider>
      </ProductProvider>
    </QueryClientProvider>
  </React.StrictMode>
);