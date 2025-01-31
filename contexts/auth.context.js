import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function authenticate(token) {
    setAuthToken(token);
    setIsAuthenticated(true);
  }

  function logout() {
    setAuthToken("");
    setIsAuthenticated(false);
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
