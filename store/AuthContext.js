import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: null,
  username: null,
  fullname: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

const AuthContextProvider = (props) => {
  const [username, setUsername] = useState();
  const [fullname, setFullname] = useState();
  const [token, setToken] = useState();
  const router = useRouter();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("token");
    const fullname = sessionStorage.getItem("fullname");
    setToken(token);
    setUsername(username);
    setFullname(fullname);
  }, []);

  const login = (token, username, fullname) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("fullname", fullname);

      const newUsername = sessionStorage.getItem("username") || null;
      const newToken = sessionStorage.getItem("token") || null;
      const newFullname = sessionStorage.getItem("fullname") || null;

      setToken(newToken);
      setUsername(newUsername);
      setFullname(newFullname);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      const newUsername = sessionStorage.getItem("username") || null;
      const newToken = sessionStorage.getItem("token") || null;
      setToken(newToken);
      setUsername(newUsername);
      router.push("/");
    }
  };

  const signup = (token, username) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", username);
      const newUsername = sessionStorage.getItem("username") || null;
      const newToken = sessionStorage.getItem("token") || null;
      setToken(newToken);
      setUsername(newUsername);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        username: username,
        fullname: fullname,
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
