import { createContext, useEffect, useContext } from "react";
import useLocaStorage from "./useLocalStorage";
import { getCurrentUser, loginFn, logoutFn } from "../services/auth";
import { message } from "antd";
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useLocaStorage(null, "user");

  async function login(user, push) {
    try {
      const res = await loginFn(user);
      setUser(res.data);
      push("/profile");
    } catch (error) {
      message.error(error.response.data.message);
    }
  }
  async function logout() {
    await logoutFn();
    setUser(null);
  }

  useEffect(() => {
    async function getSession() {
      const { data } = await getCurrentUser();
      if (data) {
        setUser(data);
      }
    }
    getSession();
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthInfo = () => useContext(AuthContext);
