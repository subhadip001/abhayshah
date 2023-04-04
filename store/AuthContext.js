import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: null,
  username: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

const AuthContextProvider = (props) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    setToken(token);
    setUsername(username);
  }, []);

  const login = (token, username) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    const newUsername = sessionStorage.getItem("username") || null;
    const newToken = sessionStorage.getItem("token") || null;
    setToken(newToken);
    setUsername(newUsername);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    const newUsername = sessionStorage.getItem("username") || null;
    const newToken = sessionStorage.getItem("token") || null;
    setToken(newToken);
    setUsername(newUsername);
  };

  const signup = (token, username) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    const newUsername = sessionStorage.getItem("username") || null;
    const newToken = sessionStorage.getItem("token") || null;
    setToken(newToken);
    setUsername(newUsername);
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        username: username,
        login,
        logout,
        signup,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
