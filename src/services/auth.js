import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://movingout88.herokuapp.com/api"
    : "http://localhost:3001/api";

axios.defaults.withCredentials = true;

const _axios = axios.create({
  baseURL,
});

export const signupFn = (user) => _axios.post("/auth/signup", user);
export const loginFn = (user) => _axios.post("/auth/login", user);
export const logoutFn = () => _axios.get("/auth/logout");
export const getCurrentUser = () => _axios.get("/auth/session");
export const editUser = ({ user, ...restuser }) =>
  _axios.patch("/auth/user/update", restuser);
export const updateAvatar = (avatar) =>
  _axios.post("/auth/avatar/change", { avatar });
export const updateActive = (userId) => _axios.patch(`/auth/active/${userId}`);
