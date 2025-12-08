import API from "./api";

export const apiGetCart = (userId) => API.get(`/carts`)
export const apiAddToCart = (payload) => API.post(`/carts`, payload)
export const apiUpdateCart = (payload) => API.post(`/carts/update`, payload)
// export const apiRemoveFromCart = (userId, productId, size="") => API.delete(`/carts/user/${userId}/item/${productId}${size ?`?size=${encodeURIComponent(size)}` : ""}`)
export const apiClearCart = (userId) => API.delete(`/carts/clear`)

export const apiRemoveFromCart = (userId, productId, size = "") => {
  return API.delete(`/carts/item/${productId}`, {
    params: size ? { size } : {},
  });
};

