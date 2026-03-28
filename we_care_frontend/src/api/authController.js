import api from "./api";

export const authController = {
  // Patient Registration
  registerPatient: async (userData) => {
    try {
      // Changed from /auth/register to /register to match backend
      const response = await api.post("/register", userData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", "patient");
        localStorage.setItem("userId", response.data.user._id);
      }
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed"
      };
    }
  },

  // Doctor Registration
  registerDoctor: async (doctorData) => {
    try {
      // Changed from /auth/register-doctor to /register-doctor to match backend
      const response = await api.post("/register-doctor", doctorData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", "doctor");
        localStorage.setItem("userId", response.data.user._id);
      }
      return response.data;
    } catch (error) {
      console.error("Doctor registration error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Doctor registration failed"
      };
    }
  },

  // Login
  login: async (email, password) => {
    try {
      // Changed from /auth/login to /login to match backend
      const response = await api.post("/login", { email, password });
      console.log("Login response:", response.data); // Debug log
      
      if (response.data.success) {
        // Store token if present
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        
        const userRole = response.data.user.isDoctor ? "doctor" : "patient";
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userId", response.data.user._id);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed"
      };
    }
  },

  // Logout - GET request
  logout: async () => {
    try {
      // Changed from /auth/logout to /logout to match backend
      const response = await api.get("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Logout failed"
      };
    }
  },

  // Get Current User Info
  getCurrentUser: () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    
    if (!token) return null;
    
    try {
      const cleanToken = token.replace(/['"]+/g, "").trim();
      const base64Url = cleanToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(window.atob(base64));
      
      return {
        id: decoded._id,
        email: decoded.email,
        role: userRole,
        userId: userId
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Get user role
  getUserRole: () => {
    return localStorage.getItem("userRole");
  }
};