import API from "./api";

console.log("API_BASE:", import.meta.env.VITE_API_BASE_URL);
console.log("USER_ID:", import.meta.env.VITE_USER_ID);


export const apiGetWishlist = (userId) => API.get(`/wishlist/user/${userId}`)
export const apiAddToWishlist = ({userId, productId}) => API.post(`/wishlist`, {userId, productId})
export const apiRemoveFromWishlist = (userId, productId) => API.delete(`/wishlist/user/${userId}/${productId}`)