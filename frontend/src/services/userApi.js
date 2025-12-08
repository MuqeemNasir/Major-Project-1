import API from "./api";

const USER_ID = import.meta.env.VITE_USER_ID || null

export const apiRegisterUser = async(payload) => {
  const res = await API.post("/users", payload);
  return res.data.data.user
}

export const apiGetUser = (userId = USER_ID) => {
    return API.get(`/users`);
}
