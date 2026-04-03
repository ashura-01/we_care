import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useAuth } from "../contexts/AuthContext";
import LeafDecor from "./LeafDecor";

const NavBar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsOpen(false);
    setShowDropdown(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkStyle = "no-underline text-[#2C6975] text-[16px] font-black whitespace-nowrap transition-all duration-200 hover:text-[#1f4655]";

  return (
    <nav className="relative w-full border-box bg-white shadow-sm">
      <div className="flex w-full items-center justify-between px-[clamp(16px,4vw,36px)] py-[14px] gap-[20px]">
        
        
        <Link to="/" className="flex items-center shrink-0 no-underline text-inherit gap-[6px]">
          <img src={logo} alt="WeCare Logo" className="h-[40px] md:h-[48px] w-auto" />
          <span className="text-[22px] md:text-[28px] font-bold text-[#2C6975]">WeCare</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden min-[850px]:flex flex-1 items-center justify-center gap-[32px] mx-[40px]">
          <Link className={navLinkStyle} to="/symptoms">Symptoms</Link>
          <Link className={navLinkStyle} to="/doctors">Doctors</Link>
          <Link className={navLinkStyle} to="/hospitals">Hospitals</Link>
        </div>

        
        <div className="hidden min-[850px]:flex items-center gap-4 shrink-0">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="text-[#2C6975] text-[16px] font-black">Hi, {user.name?.split(' ')[0] || "User"}</span>
                <div className="w-[40px] h-[40px] rounded-full border-2 border-[#68B2A0] overflow-hidden transition-transform group-hover:scale-105">
                  <img 
                    src={user.photoURL || "https://ui-avatars.com/api/?name=" + (user.name || "User") + "&background=68B2A0&color=fff"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-[100] py-2 animate-in fade-in zoom-in duration-200">
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-[#2C6975] font-semibold hover:bg-[#f0f9f7] transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 font-semibold hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="no-underline bg-gradient-to-r from-[#68B2A0] to-[#cdfa91] text-white px-[30px] py-[5px] rounded-[10px] text-[16px] font-bold shadow-md transition-all hover:opacity-90" to="/login">
              Login / Signup
            </Link>
          )}
        </div>

        
        <button onClick={toggleMenu} className="flex min-[850px]:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[60]">
          <div className={`h-[3px] w-[25px] bg-[#2C6975] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <div className={`h-[3px] w-[25px] bg-[#2C6975] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`h-[3px] w-[25px] bg-[#2C6975] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>

      
      <div className={`
        absolute top-full left-0 w-full bg-white shadow-2xl z-[50] flex flex-col items-center py-14 transition-all duration-500 ease-in-out origin-top overflow-hidden
        ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
        min-[850px]:hidden
      `}>
        
        {/* Leaf Decorations */}
        <div className="absolute -left-6 -top-4 h-36 w-24 opacity-[0.25] rotate-[-25deg] pointer-events-none"><LeafDecor /></div>
        <div className="absolute -right-8 -bottom-6 h-48 w-32 opacity-[0.3] rotate-[-15deg] pointer-events-none"><LeafDecor /></div>

        <div className={`flex flex-col items-center w-full gap-3 transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { name: "Symptoms", to: "/symptoms" },
            { name: "Doctors", to: "/doctors" },
            { name: "Hospitals", to: "/hospitals" },
            { name: "Settings", to: "/settings" } 
          ].map((item) => (
            <Link 
              key={item.name}
              onClick={() => setIsOpen(false)} 
              className="group relative w-[75%] text-center py-4 no-underline text-[20px] font-black text-[#2C6975] transition-all duration-300"
              to={item.to}
            >
              <span className="relative z-10 transition-all duration-300 group-hover:text-white group-hover:scale-110 block uppercase tracking-wide">
                {item.name}
              </span>
              <div className="absolute inset-0 bg-[#00887f] rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center opacity-0 group-hover:opacity-100 shadow-xl" />
            </Link>
          ))}
          
          <div className="h-[3px] w-20 bg-gradient-to-r from-[#68B2A0] to-[#cdfa91] rounded-full my-8 shadow-sm" />

          {user ? (
            <div className="flex flex-col items-center gap-5 w-full">
              <span className="text-[#2C6975] font-black capitalize text-[18px] bg-white/50 px-4 py-1 rounded-full">Hi, {user.name || "User"}</span>
              <button onClick={handleLogout} className="w-[60%] border-[2px] border-[#ef4444] text-[#ef4444] py-3 rounded-full font-bold transition-all hover:bg-[#ef4444] hover:text-white active:scale-90">
                Logout
              </button>
            </div>
          ) : (
            <Link onClick={() => setIsOpen(false)} className="no-underline bg-gradient-to-br from-[#2C6975] to-[#458b99] text-white w-[70%] py-4 rounded-full text-center font-bold shadow-2xl active:scale-95" to="/login">
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;