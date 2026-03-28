import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../contexts/AuthContext"; // Bring in the context
import "../styles/glass.css";
import "../styles/home.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Grab the login function
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      // Hit your backend login route
      const response = await axiosInstance.post('/login', formData);
      
      // Assuming your backend sends back { success: true, user: { name: "Arif", ... } }
      if (response.data.success) {
        // Merge the data exactly like we did in the AuthContext
        const userData = {
            ...response.data.user,
            isDoctor: response.data.doctor ? true : false,
            doctorInfo: response.data.doctor
        };
        
        login(userData); 
        navigate("/"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <section className="hero-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="bg-shape glow-top-left"></div>
      <div className="bg-shape blur-right-blue"></div>
      <div className="bg-shape glow-center-green" style={{ top: '60%', left: '20%' }}></div>

      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '40px', borderRadius: '35px', zIndex: 3 }}>
        <h2 style={{ textAlign: 'center', color: '#1d5f71', marginBottom: '20px', fontSize: '32px', fontWeight: 'bold' }}>
          Welcome Back
        </h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} style={inputStyle} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} style={inputStyle} required />
          <button type="submit" className="login-button" style={{ width: '100%', marginTop: '10px', padding: '12px' }}>
            Log In
          </button>
        </form>

        <p style={{ textAlign: 'center', color: '#4f7f89', marginTop: '25px', fontWeight: 'bold' }}>
          Don't have an account? <br/>
          <Link to="/signup" style={{ color: '#00887f', textDecoration: 'none', fontSize: '18px' }}>Sign up here.</Link>
        </p>
      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.6)',
  background: 'rgba(255, 255, 255, 0.4)', color: '#003a46', fontSize: '16px', outline: 'none', boxSizing: 'border-box',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
};

export default Login;