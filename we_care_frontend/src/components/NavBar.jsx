import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Bring in context

const NavBar = ({ onOpenChat }) => {
  const { user, logout } = useAuth(); // Check if logged in
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Add 'async' here
  const handleLogout = async () => { 
    // Add 'await' here so it waits for the cookie to be cleared
    await logout(); 
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      {/* LEFT: Logo */}
      <Link to="/" className="navbar-logo">
        <span className="leaf-icon">🌿</span>
        <span className="logo-text">WeCare</span>
      </Link>

      {/* CENTER: Links */}
      <div className="navbar-links">
        {/* Changed from Link to a clickable span to open the sidebar! */}
        <span className="nav-link-custom" onClick={onOpenChat} style={{ cursor: 'pointer' }}>
          Symptoms
        </span>
        
        <Link to="/doctors" className="nav-link-custom">Doctors</Link>
        <Link to="/ratings" className="nav-link-custom">Ratings</Link>
        <Link to="/hospitals" className="nav-link-custom">Hospitals</Link>
      </div>

      {/* RIGHT: Conditional Rendering based on Auth state */}
      <div style={{ position: "relative" }}>
        {!user ? (
          <Link to="/login" className="login-button">
            Login / Signup
          </Link>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div style={{ fontWeight: "bold", color: "#1d5f71", fontSize: "16px" }}>
              Hi, {user.name.split(" ")[0]} {/* Shows first name only */}
            </div>
            {/* Simple down arrow icon */}
            <span style={{ fontSize: "12px", color: "#1d5f71" }}>▼</span>

            {/* The Dropdown Curtain (Glassmorphism style) */}
            {isDropdownOpen && (
              <div style={dropdownStyle}>
                <Link to="/profile" style={dropdownItemStyle} onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                <Link to="/settings" style={dropdownItemStyle} onClick={() => setIsDropdownOpen(false)}>Settings</Link>
                <hr style={{ borderTop: "1px solid rgba(0,0,0,0.1)", margin: "5px 0" }} />
                <div style={{ ...dropdownItemStyle, color: "#d9534f" }} onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// CSS in JS to keep the dropdown styled like the rest of the app
const dropdownStyle = {
  position: "absolute",
  top: "40px",
  right: "0",
  width: "150px",
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  borderRadius: "15px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  zIndex: 100,
};

const dropdownItemStyle = {
  padding: "8px 12px",
  textDecoration: "none",
  color: "#1d5f71",
  fontWeight: "bold",
  fontSize: "14px",
  borderRadius: "8px",
  transition: "background 0.2s",
  cursor: "pointer",
};

export default NavBar;