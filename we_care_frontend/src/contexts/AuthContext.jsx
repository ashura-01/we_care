import { createContext, useState, useEffect, useContext } from 'react';
import { authController } from '../api/authController';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (authController.isAuthenticated()) {
      const currentUser = authController.getCurrentUser();
      

      const displayName = currentUser.name || currentUser.email.split('@')[0];
      setUser({ ...currentUser, name: displayName });
    }
    setLoading(false);
  }, []);


  const loginUser = (userData) => {
    const displayName = userData.name || userData.email.split('@')[0];
    setUser({ ...userData, name: displayName });
  };


  const logoutUser = async () => {
    await authController.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};