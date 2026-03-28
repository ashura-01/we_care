import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const NavBar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-[36px] py-[14px] gap-[20px] box-border">
      
      <Link to="/" className="flex items-center shrink-0 no-underline text-inherit gap-[6px]">
        <img src={logo} alt="WeCare Logo" className="h-[48px] w-auto" />
        <span className="text-[28px] font-bold text-[#2C6975]">WeCare</span>
      </Link>

      
      <div className="flex flex-1 items-end justify-end gap-[24px] mx-[40px]">
        <Link 
          className="no-underline text-[#2C6975] text-[16px] font-black whitespace-nowrap transition-all duration-200 hover:text-[#1f4655]" 
          to="/symptoms"
        >
          Symptoms
        </Link>
        <Link 
          className="no-underline text-[#2C6975] text-[16px] font-black whitespace-nowrap transition-all duration-200 hover:text-[#1f4655]" 
          to="/doctors"
        >
          Doctors
        </Link>
        <Link 
          className="no-underline text-[#2C6975] text-[16px] font-black whitespace-nowrap transition-all duration-200 hover:text-[#1f4655]" 
          to="/hospitals"
        >
          Hospitals
        </Link>
      </div>

      
      <Link 
        className="no-underline bg-gradient-to-r from-[#68B2A0] to-[#cdfa91] bg-[length:200%_100%] text-white border border-white px-[35px] py-[3px] rounded-[10px] text-[16px] font-bold shadow-[0_6px_12px_rgba(0,0,0,0.3)] shrink-0 whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-right hover:text-[#2C6975]" 
        to="/login"
      >
        Login / Signup
      </Link>
    </nav>
  );
};

export default NavBar;