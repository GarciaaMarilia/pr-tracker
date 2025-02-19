import {
 createContext,
 ReactNode,
 useContext,
 useEffect,
 useState,
} from "react";
import { get } from "lodash";

import { api } from "../lib/axios";

interface AuthProviderProps {
 children: ReactNode;
}

interface AuthContextProps {
 isAuthenticated: boolean;
 login: (
  email: string,
  password: string,
  navigate: (path: string) => void
 ) => Promise<void>;
 logout: (navigate: (path: string) => void) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({
 children,
}: {
 children: React.ReactNode;
}) => {
 const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
  return !!localStorage.getItem("token");
 });

 const login = async (
  email: string,
  password: string,
  navigate: (path: string) => void
 ) => {
  try {
   if (!email || !password) {
    console.log("Invalid Credentials");
   }

   const response = await api.post("/auth/login", { email, password });
   const token = get(response, "data.token");

   if (token) {
    localStorage.setItem("token", token);

    const user = get(response, "data.user");

    if (user) {
     const userId = get(user, "_id");
     localStorage.setItem("userId", userId);
     localStorage.setItem("username", get(user, "name"));
     navigate("/home");
    }
   } else {
    throw new Error("Authentication failed.");
   }
  } catch (error) {
   throw new Error("Invalid email or password");
  }
 };

 const logout = (navigate: (path: string) => void) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
 };

 useEffect(() => {
  if (typeof window !== "undefined") {
   const token = localStorage.getItem("token");

   if (token) {
    setIsAuthenticated(true);
   }
  }
 }, []);

 return (
  <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
   {children}
  </AuthContext.Provider>
 );
};

export const useAuth = (): AuthContextProps => {
 const context = useContext(AuthContext);

 if (!context) {
  throw new Error("useAuth must be used within an AuthProvider");
 }
 return context;
};
