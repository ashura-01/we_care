import { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // We need Axios to ask the backend

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // NEW: We need a loading state so the app doesn't flash the login screen 
  // before the backend has a chance to answer!
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        // Hitting your existing, protected /profile route!
        const response = await axiosInstance.get('/profile'); 
        
        if (response.data.success) {
          // Merge the data so the NavBar knows if they are a doctor
          const userData = {
             ...response.data.user,
             isDoctor: response.data.doctor ? true : false,
             doctorInfo: response.data.doctor 
          };
          
          setUser(userData); 
        }
      } catch (error) {
        console.log("No active session found.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInUser();
    }, []); // The empty array means this only runs ONCE when the app first loads/refreshes

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Changed from .post to .get to match your api.js!
      await axiosInstance.get('/logout'); 
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* We wait to render the app until the check is finished */}
      {!loading ? children : <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#1d5f71', fontSize: '24px', fontWeight: 'bold' }}>Loading WeCare...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);