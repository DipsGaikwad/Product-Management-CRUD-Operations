import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = () => {
  return api.get("/products");
};

export const getProduct = (id) => {
  return api.get(`/product?id=${id}`);
};

export const createProduct = (product) => {
  return api.post("/products", product);
};

export const updateProduct = (id, product) => {
  return api.put(`/product?id=${id}`, product);
};

export const deleteProduct = (id) => {
  return api.delete(`/product?id=${id}`);
};

export default api;