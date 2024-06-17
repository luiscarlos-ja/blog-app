import { createContext, useState } from "react";
import { AuthContextType, User } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(
    window.localStorage.getItem("authUser")
      ? JSON.parse(window.localStorage.getItem("authUser") as string)
      : null
  );

  const signIn = async (user: User) => {
    window.localStorage.setItem("authUser", JSON.stringify(user));
    setAuthUser(user);
  };

  const signOut = async () => {
    window.localStorage.removeItem("authUser");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
