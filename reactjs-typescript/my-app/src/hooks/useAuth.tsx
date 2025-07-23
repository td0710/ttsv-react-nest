import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  email: string;
  microsoftId: string;
  fullName: string;
  role?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setIsCheckingAuth: (value: boolean) => void;

  signOut: () => Promise<void>;
  handleAuthCheck: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    handleAuthCheck();
  }, []);

  const signOut = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log("zzz");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  const handleAuthCheck = async () => {
    setIsCheckingAuth(true);
    console.log("kkkk");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/check-session`,
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isCheckingAuth,
        setIsAuthenticated,
        setIsCheckingAuth,

        signOut,
        handleAuthCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
