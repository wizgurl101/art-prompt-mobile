import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "./auth/AuthContent";
import LoadingOverlay from "../../components/LoadingOverlay";
import { login } from "../../services/api.service";
import { AuthContext } from "../../contexts/auth.context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [message, setMessage] = useState("");

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      await authCtx.authenticate(token);
    } catch (error) {
      setMessage("Unable to log in")
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent message={message} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
