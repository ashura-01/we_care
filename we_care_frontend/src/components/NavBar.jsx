import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useAuth } from "../contexts/AuthContext";
import LeafDecor from "./LeafDecor"; 

const NavBar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    setIsOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkStyle = "no-underline text-[#2C6975] text-[16px] font-black whitespace-nowrap transition-all duration-200 hover:text-[#1f4655]";

  return (
    <nav className="relative w-full border-box bg-white">
      <div className="flex w-full items-center justify-between px-[clamp(16px,4vw,36px)] py-[14px] gap-[20px]">
        
        {/* --- LOGO --- */}
        <Link to="/" className="flex items-center shrink-0 no-underline text-inherit gap-[6px]">
          <img src={logo} alt="WeCare Logo" className="h-[40px] md:h-[48px] w-auto" />
          <span className="text-[22px] md:text-[28px] font-bold text-[#2C6975]">WeCare</span>
        </Link>

        {/* --- DESKTOP LINKS (Untouched) --- */}
        <div className="hidden min-[850px]:flex flex-1 items-center justify-center gap-[32px] mx-[40px]">
          <Link className={navLinkStyle} to="/symptoms">Symptoms</Link>
          <Link className={navLinkStyle} to="/doctors">Doctors</Link>
          <Link className={navLinkStyle} to="/hospitals">Hospitals</Link>
        </div>

        {/* --- AUTH SECTION (Desktop Untouched) --- */}
        <div className="hidden min-[850px]:flex items-center gap-4 shrink-0">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[#2C6975] text-[16px] font-black">Hi, {user.name || "User"}</span>
              <button onClick={handleLogout} className="bg-transparent border-[2px] border-[#68B2A0] text-[#2C6975] px-[25px] py-[3px] rounded-[10px] text-[16px] font-bold transition-all hover:bg-[#68B2A0] hover:text-white cursor-pointer">Logout</button>
            </div>
          ) : (
            <Link className="no-underline bg-gradient-to-r from-[#68B2A0] to-[#cdfa91] text-white px-[30px] py-[5px] rounded-[10px] text-[16px] font-bold shadow-md transition-all hover:opacity-90" to="/login">Login / Signup</Link>
          )}
        </div>

        {/* --- MOBILE HAMBURGER --- */}
        <button onClick={toggleMenu} className="flex min-[850px]:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[60]">
          <div className={`h-[3px] w-[25px] bg-[#2C6975] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <div className={`h-[3px] w-[25px] bg-[#2C6975] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`h-[3px] w-[25px] bg-[#2C6975] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>

      {/* --- DECORATED MOBILE DROPDOWN --- */}
      <div className={`
        absolute top-full left-0 w-full bg-white shadow-2xl z-[50] flex flex-col items-center py-14 transition-all duration-500 ease-in-out origin-top overflow-hidden
        ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
        min-[850px]:hidden
      `}>
        
        {/* --- LUSH LEAFY BACKGROUND --- */}
        {/* Large Deep Leaf - Top Left */}
        <div className="absolute -left-6 -top-4 h-36 w-24 opacity-[0.25] rotate-[-25deg] filter brightness-75 saturate-150 pointer-events-none"><LeafDecor /></div>
        
        {/* Small Bright Leaf - Top Right */}
        <div className="absolute right-[10%] top-6 h-16 w-10 opacity-[0.35] rotate-[45deg] pointer-events-none"><LeafDecor /></div>
        
        {/* Medium Deep Leaf - Center Right */}
        <div className="absolute -right-4 top-[35%] h-32 w-20 opacity-[0.22] rotate-[160deg] filter contrast-125 pointer-events-none"><LeafDecor /></div>
        
        {/* Tiny Deep Leaf - Center Left */}
        <div className="absolute left-[5%] top-[45%] h-12 w-8 opacity-[0.4] rotate-[10deg] filter brightness-50 pointer-events-none"><LeafDecor /></div>
        
        {/* Medium Floating Leaf - Bottom Left */}
        <div className="absolute left-[-10px] bottom-[15%] h-28 w-18 opacity-[0.28] rotate-[200deg] pointer-events-none"><LeafDecor /></div>
        
        {/* Small Cluster - Bottom Right */}
        <div className="absolute right-[15%] bottom-[10%] h-14 w-10 opacity-[0.3] rotate-[-10deg] filter saturate-200 pointer-events-none"><LeafDecor /></div>
        
        {/* Large Anchor Leaf - Bottom Right Corner */}
        <div className="absolute -right-8 -bottom-6 h-48 w-32 opacity-[0.3] rotate-[-15deg] filter brightness-90 pointer-events-none"><LeafDecor /></div>
        
        {/* Floating Tiny Leaf */}
        <div className="absolute right-[40%] top-[20%] h-8 w-6 opacity-[0.15] rotate-[80deg] pointer-events-none"><LeafDecor /></div>

        {/* --- CONTENT --- */}
        <div className={`flex flex-col items-center w-full gap-3 transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { name: "Symptoms", to: "/symptoms" },
            { name: "Doctors", to: "/doctors" },
            { name: "Hospitals", to: "/hospitals" }
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