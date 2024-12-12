import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  signup: async (email, password, name) => {
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
        credentials: "include", //allow cookies
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup Error");
      }

      set({
        user: data.user,
        isAuthenticated: true,
      });
      return { success: true, message: data.message };
    } catch (e) {
      //   throw e;
      console.log("error signin:", e.message);
      return { success: false, message: e.message };
    }
  },
  login: async (email, password) => {
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login Error");

      set({
        isAuthenticated: true,
        user: data.user,
      });
      console.log("login successful:", data.message);
      return { success: true, message: data.message };
    } catch (e) {
      console.log("error login:", e.message);
      return { success: false, message: e.message };
    }
  },
  logout: async () => {
    try {
      const response = await fetch("api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout Error");

      set({ user: null, isAuthenticated: false });
      return { success: true, message: response.message };
    } catch (e) {
      console.log("error logout:", e.message);
      return { success: false, message: e.message };
    }
  },
  checkAuth: async () => {
    try {
      const response = await fetch("api/auth/check-auth", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Not authenticated");

      set({
        user: data.user,
        isAuthenticated: true,
      });
      return { success: true, message: response.message };
    } catch (e) {
      console.log("error checkauth:", e.message);
      return { success: false, message: e.message };
    }
  },
  verifyEmail: async (code) => {
    try {
      const response = await fetch("api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error verifying email");
      }
      set({
        user: data.user,
        isAuthenticated: true,
      });

      return { success: true, message: response.message };
    } catch (e) {
      console.log("error verifyEmail:", e.message);
      return { success: false, message: e.message };
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await fetch("api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error sending reset password email");
      }

      return { success: true, message: response.message };
    } catch (e) {
      console.log("error forgotPassword:", e.message);
      return { success: false, message: e.message };
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      console.log("authjs before enter fetch");
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      console.log("after fetch response", response);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error resetting password");
      }

      return { success: true, message: response.message };
    } catch (e) {
      console.log("error resetPassword:", e.message);
      return { success: false, message: e.message };
    }
  },
}));
