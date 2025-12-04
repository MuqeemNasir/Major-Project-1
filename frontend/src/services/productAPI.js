import API from "./api";

export const apiGetAllProducts = async() => {
    const res = await API.get("/products")
    return res.data.data.products
}

export const apiGetProductsById = async (productId) => {
  const res = await API.get(`/products/${productId}`);
  return res.data.data.product;
}

export const apiGetCategories = async () => {
  const res = await API.get("/categories");
  return res.data.data.categories; 
}

export const apiGetProdByCat = async(categoryId) => {
    const res = await API.get(`/products?category=${categoryId}`)
    return res.data.data.products
}

export const apiGetSearchProducts = async (query) => {
  const res = await API.get(`/products?search=${query}`);
  return res.data.data.products;
};