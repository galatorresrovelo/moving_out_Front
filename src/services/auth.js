import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "/auth" : "http://localhost:3001/api";

axios.defaults.withCredentials = true;

const _axios = axios.create({
  baseURL,
});

export const signupFn = (user) => _axios.post("/auth/signup", user);
export const loginFn = (user) => _axios.post("/auth/login", user);
export const logoutFn = () => _axios.get("/auth/logout");
export const getCurrentUser = () => _axios.get("/auth/session");
export const updateUser = (avatar) => _axios.patch("/user/update");
export const updateAvatar = (avatar) =>
  _axios.post("/avatar/change", { avatar });
export const updateActive = (user) => _axios.patch("/user/update");
