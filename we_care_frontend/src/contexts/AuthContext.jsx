import { createContext, useState, useEffect, useContext } from 'react';
import { authController } from '../api/authController';
import api from '../api/api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/profile');

        if (response.data?.success && response.data?.user) {
          const userData = response.data.user;

          setUser({
            ...userData,
            role:
              userData?.role ||
              localStorage.getItem('userRole') ||
              (userData?.isDoctor ? 'doctor' : 'patient'),
          });
        } else {
          localStorage.removeItem('userRole');
          localStorage.removeItem('userId');
          setUser(null);
        }
      } catch (error) {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const interval = setInterval(() => {
      checkAuth();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const loginUser = (userData) => {
    const safeUser = {
      ...userData,
      role:
        userData?.role ||
        localStorage.getItem('userRole') ||
        (userData?.isDoctor ? 'doctor' : 'patient'),
    };

    setUser(safeUser);
  };

  const logoutUser = async () => {
    try {
      await authController.logout();
    } catch (e) {
      // ignore
    }

    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};