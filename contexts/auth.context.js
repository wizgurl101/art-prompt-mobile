import { createContext, useEffect, useState } from "react";
import SInfo from "react-native-sensitive-info";

export const AuthContext = createContext({
  token: "",
  userId: "",
  isAuthenticated: false,
  authenticate: async (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storageTokenName = "authToken";
  const storageUserIdName = "userId";

  useEffect(() => {
    const getItemsFromStorage = async () => {
      const storedToken = await SInfo.getItem(storageTokenName, {});
      const storedUserId = await SInfo.getItem(storageUserIdName, {});

      if (storedToken && storedUserId) {
        setAuthToken(storedToken);
        setUserId(storedUserId);
        setIsAuthenticated(true);
      }
    };

    getItemsFromStorage();
  }, []);

  const setItemToStorage = async (name, value) => {
    return SInfo.setItem(name, value, {});
  };

  const deleteItemFromStorage = async (name) => {
    return SInfo.deleteItem(name, {});
  };

  async function authenticate(token, userId) {
    setAuthToken(token);
    setUserId(userId);
    setIsAuthenticated(true);
    await setItemToStorage(storageTokenName, token);
    await setItemToStorage(storageUserIdName, userId);
  }

  async function logout() {
    setAuthToken("");
    setUserId("");
    setIsAuthenticated(false);
    await deleteItemFromStorage(storageTokenName);
    await deleteItemFromStorage(storageUserIdName);
  }

  const value = {
    token: authToken,
    userId: userId,
    isAuthenticated: isAuthenticated,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
