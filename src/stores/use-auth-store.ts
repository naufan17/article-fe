import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string;
  isAuthenticated: boolean;
  role: "Admin" | "User" | null;
  setLogin: (payload: { token: string; role: "Admin" | "User" | null }) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "",
      isAuthenticated: false,
      role: null,
      setLogin: ({ token, role }) => {
        set({ 
          token, 
          isAuthenticated: true, 
          role 
        })
      },
      setLogout: () => {
        set({ 
          token: "", 
          isAuthenticated: false, 
          role: null 
        })
      },
    }),
    { 
      name: "auth" 
    }
  )
);