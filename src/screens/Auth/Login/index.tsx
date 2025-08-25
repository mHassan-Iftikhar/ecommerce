import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./components";
import { AuthManager } from "../../../utils/AuthManager";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = AuthManager.validateLogin(email, password);

      if (result.success && result.user) {
        AuthManager.setAuth(result.user);
        
        // Redirect based on user type
        if (AuthManager.isAdmin()) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setErrorMessage(result.error || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  );
};

export default LoginScreen;
