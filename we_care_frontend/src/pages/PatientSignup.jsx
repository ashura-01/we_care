import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'

function PatientSignup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    bloodGroup: '',
    gender: '',
    age: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Patient:', formData)
    alert('Patient Registered!')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center py-8">
      <main className="w-full flex flex-col items-center justify-center px-5 max-md:px-4">
        <AuthCard className="w-full max-w-[470px] p-[28px_24px_24px] text-center bg-white/95 border border-[#d8ece7] rounded-[22px] shadow-[0_14px_34px_rgba(15,23,42,0.08)] max-md:p-[24px_18px_20px]">
          <h2 className="text-[1.9rem] leading-[1.2] text-[#111827] mb-6 font-bold">
            Patient&apos;s Registration
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full h-12 px-[14px] rounded-xl border-[1.6px] border-[#c7e6de] outline-none bg-white text-[#111827] text-base transition-all duration-200 ease-in placeholder:text-[#9ca3af] focus:border-[#13a57a] focus:shadow-[0_0_0_4px_rgba(19,165,122,0.12)]"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full h-12 px-[14px] rounded-xl border-[1.6px] border-[#c7e6de] outline-none bg-white text-[#111827] text-base transition-all duration-200 ease-in placeholder:text-[#9ca3af] focus:border-[#13a57a] focus:shadow-[0_0_0_4px_rgba(19,165,122,0.12)]"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
              className="w-full h-12 px-[14px] rounded-xl border-[1.6px] border-[#c7e6de] outline-none bg-white text-[#111827] text-base transition-all duration-200 ease-in placeholder:text-[#9ca3af] focus:border-[#13a57a] focus:shadow-[0_0_0_4px_rgba(19,165,122,0.12)]"
            />

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
              className="w-full h-12 px-[14px] rounded-xl border-[1.6px] border-[#c7e6de] outline-none bg-white text-[#111827] text-base transition-all duration-200 ease-in placeholder:text-[#9ca3af] focus:border-[#13a57a] focus:shadow-[0_0_0_4px_rgba(19,165,122,0.12)]"
            />

            <select
              name="bloodGroup"
              onChange={handleChange}
              required
              className="w-full h-12 px-[14px] rounded-xl border-[1.6px] border-[#c7e6de] outline-none bg-white text-[#111827] text-base transition-all duration-200 ease-in focus:border-[#13a57a] focus:shadow-[0_0_0_4px_rgba(19,165,122,0.12)]"
            >
              <option value="">Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>

            <select
              name="gender"
              onChange={handleChange}
              required
              className="w-full h-12 px-[14px] rounded-xl border-[1.6px] border-[#c7e6de] outline-none bg-white text-[#111827] text-base transition-all duration-200 ease-in focus:border-[#13a57a] focus:shadow-[0_0_0_4px_rgba(19,165,122,0.12)]"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              required
              className="w-full h-12 px-[14px] rounded-xl border-[1.6px] border-[#c7e6de] outline-none bg-white text-[#111827] text-base transition-all duration-200 ease-in placeholder:text-[#9ca3af] focus:border-[#13a57a] focus:shadow-[0_0_0_4px_rgba(19,165,122,0.12)]"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full h-12 px-[14px] rounded-xl border-[1.6px] border-[#c7e6de] outline-none bg-white text-[#111827] text-base transition-all duration-200 ease-in placeholder:text-[#9ca3af] focus:border-[#13a57a] focus:shadow-[0_0_0_4px_rgba(19,165,122,0.12)]"
            />

            <button className="w-full h-12 mt-[10px] border-none rounded-full cursor-pointer bg-gradient-to-r from-[#0da574] to-[#10b084] text-white text-[1.04rem] font-bold shadow-[0_8px_18px_rgba(16,176,132,0.2)] transition-all duration-200 ease-in hover:-translate-y-[1px] hover:opacity-[0.97]">
              Register
            </button>
          </form>

          <p className="mt-[14px] text-center text-[0.94rem] text-[#6b7280]">
            Already have account?{' '}
            <Link
              to="/login"
              className="text-[#128b8e] no-underline font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </AuthCard>
      </main>
    </div>
  )
}

export default PatientSignup