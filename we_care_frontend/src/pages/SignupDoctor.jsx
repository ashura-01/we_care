import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../styles/glass.css";
import "../styles/home.css";

const SignupDoctor = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "",
    specialization: "", experience: "", hospital: "", fees: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hits http://localhost:5600/api/v1/register-doctor
      const response = await axiosInstance.post('/register-doctor', formData);
      console.log("Doctor Registration Success:", response.data);
      alert("Doctor Profile Created!");
      navigate("/"); 
    } catch (err) {
      console.error("Doctor Registration Error:", err);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <section className="hero-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="bg-shape glow-right-green"></div>
      <div className="bg-shape blur-left-blue"></div>

      <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '40px', borderRadius: '35px', zIndex: 3 }}>
        <h2 style={{ textAlign: 'center', color: '#1d5f71', marginBottom: '20px', fontSize: '32px' }}>Doctor Registration</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Base User Info */}
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} style={inputStyle} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} style={inputStyle} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} style={inputStyle} required />
          
          <hr style={{ borderTop: '1px solid rgba(0,0,0,0.1)', margin: '10px 0' }} />
          
          {/* Doctor Specific Info */}
          <input type="text" name="specialization" placeholder="Specialization (e.g., Cardiologist)" onChange={handleChange} style={inputStyle} required />
          <input type="text" name="hospital" placeholder="Current Hospital/Clinic" onChange={handleChange} style={inputStyle} required />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="number" name="experience" placeholder="Years Exp." onChange={handleChange} style={inputStyle} required />
            <input type="number" name="fees" placeholder="Consultation Fee (৳)" onChange={handleChange} style={inputStyle} required />
          </div>

          <button type="submit" className="login-button" style={{ width: '100%', marginTop: '15px', padding: '14px' }}>
            Create Doctor Profile
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

export default SignupDoctor;