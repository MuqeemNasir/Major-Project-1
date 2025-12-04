import API from "./api";

export const apiGetCart = (userId) => API.get(`/carts/user/${userId}`)
export const apiAddToCart = (payload) => API.post(`/carts`, payload)
export const apiUpdateCart = (payload) => API.post(`/carts/update`, payload)
// export const apiRemoveFromCart = (userId, productId, size="") => API.delete(`/carts/user/${userId}/item/${productId}${size ?`?size=${encodeURIComponent(size)}` : ""}`)
export const apiClearCart = (userId) => API.delete(`/carts/clear/${userId}`)

export const apiRemoveFromCart = (userId, productId, size = "") => {
  return API.delete(`/carts/user/${userId}/item/${productId}`, {
    params: size ? { size } : {},
  });
};

