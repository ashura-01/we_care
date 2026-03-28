import { Link } from "react-router-dom";
import "../styles/glass.css";
import "../styles/home.css";

const SignupChoice = () => {
  return (
    <section className="hero-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', paddingTop: '60px' }}>
      {/* Background Glowing Orbs */}
      <div className="bg-shape glow-center-green"></div>
      <div className="bg-shape blur-center-blue" style={{ top: '20%' }}></div>
      
      <h2 style={{ color: '#1d5f71', marginBottom: '40px', zIndex: 2, fontSize: '36px', fontWeight: 'bold' }}>
        How would you like to join WeCare?
      </h2>

      <div style={{ display: 'flex', gap: '40px', zIndex: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Patient Route */}
        <Link to="/signup/patient" style={{ textDecoration: 'none' }}>
          <div className="glass-card small-glass-card" style={{ width: '280px', height: '280px' }}>
            <h2>Patient</h2>
            <p style={{ marginTop: '15px' }}>Find doctors, check symptoms, and book appointments.</p>
          </div>
        </Link>

        {/* Doctor Route */}
        <Link to="/signup/doctor" style={{ textDecoration: 'none' }}>
          <div className="glass-card small-glass-card" style={{ width: '280px', height: '280px' }}>
            <h2>Doctor</h2>
            <p style={{ marginTop: '15px' }}>Manage appointments, build your profile, and reach patients.</p>
          </div>
        </Link>

      </div>
      
      <p style={{ marginTop: '50px', zIndex: 2 }}>
         <Link to="/login" style={{ color: '#00887f', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
           ← Back to Login
         </Link>
      </p>
    </section>
  );
};

export default SignupChoice;