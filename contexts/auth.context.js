import { createContext, useEffect, useState } from "react";
import SInfo from "react-native-sensitive-info";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storageToken = "authToken";

  useEffect(() => {
    const getTokenFromStorage = async () => {
      const token = await SInfo.getItem(storageToken, {});

      if (token) {
        setAuthToken(token);
        setIsAuthenticated(true);
      }
    };

    getTokenFromStorage();
  }, []);

  const setTokenToStorage = async (token) => {
    return SInfo.setItem(storageToken, token, {});
  };

  const deleteTokenFromStorage = async () => {
    return SInfo.deleteItem(storageToken, {});
  };

  async function authenticate(token) {
    setAuthToken(token);
    setIsAuthenticated(true);
    await setTokenToStorage(token);
  }

  async function logout() {
    setAuthToken("");
    setIsAuthenticated(false);
    await deleteTokenFromStorage();
  }

  const value = {
    token: authToken,
    isAuthenticated: isAuthenticated,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
