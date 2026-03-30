import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeafDecor from "../components/LeafDecor";
import GlassCard from "../components/GlassCard";
import PillButton from "../components/PillButton";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5600/api/v1/doctors/${id}`);
        const data = await response.json();
        if (data.success) {
          setDoctor(data.doctor); 
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#00887f]">Loading Specialist...</div>;
  if (!doctor) return <div className="min-h-screen flex items-center justify-center">Profile not found.</div>;

  return (
    <div className="min-h-screen bg-[#f4f9f7] relative overflow-hidden p-8">
      
      <div className="absolute left-[-5%] top-[-5%] w-[300px] opacity-10 rotate-45 pointer-events-none">
        <LeafDecor style={{ "--fill-0": "#00887f" }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 pt-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-[#00887f] font-bold flex items-center gap-2 hover:-translate-x-1 transition-transform">
          ← Back to Experts
        </button>

        <GlassCard className="p-10 rounded-[50px] border-white/70 bg-white/60 backdrop-blur-3xl shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            
            <div className="lg:w-1/3 flex flex-col items-center">
              <div className="w-64 h-64 rounded-[40px] overflow-hidden border-[10px] border-white shadow-2xl mb-8">
                <img src={doctor.user?.avatar || "/default-dr.png"} alt="Doctor" className="w-full h-full object-cover" />
              </div>
              <div className="w-full bg-[#00887f] p-6 rounded-3xl text-white shadow-lg text-center">
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Consultation Fee</p>
                <p className="text-4xl font-black">${doctor.fees}</p>
              </div>
            </div>

            
            <div className="lg:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-[#00887f]/10 text-[#00887f] px-4 py-1 rounded-full text-xs font-black uppercase">
                    {doctor.specialization}
                  </span>
                  <h1 className="text-5xl font-black text-[#003a46] mt-4 mb-1">{doctor.user?.name}</h1>
                  <p className="text-xl text-[#4f7f89] font-bold mb-6">{doctor.hospital}</p>
                </div>
                {doctor.verified && (
                    <div className="bg-green-100 text-green-700 p-2 rounded-full shadow-sm">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.25.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
                    </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/40 p-5 rounded-3xl border border-white">
                  <p className="text-[10px] text-[#00887f] font-black uppercase">Years Experience</p>
                  <p className="text-2xl font-black text-[#003a46]">{doctor.experience}+</p>
                </div>
                <div className="bg-white/40 p-5 rounded-3xl border border-white">
                  <p className="text-[10px] text-[#00887f] font-black uppercase">Contact Info</p>
                  <p className="text-md font-bold text-[#003a46] truncate">{doctor.user?.email}</p>
                </div>
              </div>

              
              <div className="mt-8">
                <h3 className="text-2xl font-black text-[#003a46] mb-4">Patient Feedback ({doctor.reviews?.length || 0})</h3>
                <div className="space-y-3">
                    {doctor.reviews?.length > 0 ? (
                        doctor.reviews.map((rev, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/30 border border-white/60">
                                <p className="text-[#00887f] font-bold text-sm">Rating: {rev.rating}/5</p>
                                <p className="text-[#4f7f89] italic">"{rev.comment}"</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#4f7f89] italic">No reviews yet.</p>
                    )}
                </div>
              </div>

              <div className="mt-10">
                <PillButton className="px-12 py-4 text-lg shadow-xl shadow-[#00887f]/20">
                    Confirm Appointment
                </PillButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default DoctorProfile;