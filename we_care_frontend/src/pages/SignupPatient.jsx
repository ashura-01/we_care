import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../styles/glass.css";
import "../styles/home.css";

const SignupPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hits http://localhost:5600/api/v1/register
      const response = await axiosInstance.post('/register', formData);
      console.log("Registration Success:", response.data);
      alert("Registration successful! Welcome to WeCare.");
      navigate("/"); // Send them back to the homepage
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="hero-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="bg-shape glow-top-left"></div>
      <div className="bg-shape blur-center-blue2"></div>

      <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '35px', zIndex: 3 }}>
        <h2 style={{ textAlign: 'center', color: '#1d5f71', marginBottom: '20px', fontSize: '32px' }}>Patient Registration</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} style={inputStyle} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} style={inputStyle} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} style={inputStyle} required />
          
          <button type="submit" className="login-button" style={{ width: '100%', marginTop: '15px', padding: '14px' }}>
            Create Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
           <Link to="/signup" style={{ color: '#00887f', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Options</Link>
        </p>
      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.6)',
  background: 'rgba(255, 255, 255, 0.4)', color: '#003a46', fontSize: '15px', outline: 'none', boxSizing: 'border-box'
};

export default SignupPatient;