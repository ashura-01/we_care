import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import RoleCard from '../components/RoleCard'
import { Stethoscope, User } from 'lucide-react'

function SignupChoice() {
  const navigate = useNavigate()

  const handleDoctor = () => {
    navigate('/signup/doctor')
  }

  const handlePatient = () => {
    navigate('/signup/patient')
  }

  return (
    <div className="min-h-screen bg-[#f7fbf9]">
      <header className="flex h-[86px] items-center justify-between border-b border-[#dbe9e5] bg-white px-[52px]">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="WeCare Logo"
            className="h-[38px] w-[38px] object-contain"
          />
          <span className="text-[28px] font-bold text-[#146f73]">WeCare</span>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="rounded-[22px] bg-gradient-to-r from-[#17817c] to-[#1aa38d] px-10 py-3 text-[18px] font-bold text-white shadow-[0_4px_14px_rgba(21,119,121,0.16)] transition hover:opacity-95"
        >
          Home
        </button>
      </header>

      <main className="flex justify-center pt-[52px]">
        <AuthCard className="w-full max-w-[910px] rounded-[28px] border border-[#e3ece8] bg-white px-6 pb-5 pt-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <div className="grid grid-cols-2 gap-5">
            <RoleCard
              icon={<Stethoscope size={72} strokeWidth={2.2} color="#169b98" />}
              title="Register as Doctor"
              onClick={handleDoctor}
            />

            <RoleCard
              icon={<User size={72} strokeWidth={2.2} color="#169b98" />}
              title="Register as Patient"
              onClick={handlePatient}
            />
          </div>

          <p className="mt-5 text-center text-[20px] text-[#6b7280]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#0f7f85] hover:underline">
              Login
            </Link>
          </p>
        </AuthCard>
      </main>
    </div>
  )
}

export default SignupChoice