import React, { useState } from "react";
import LeafDecor from "../components/LeafDecor";
import drKhanAvatar from "../assets/dr-sample.png";
import GlassCard from "../components/GlassCard";
import PillButton from "../components/PillButton";

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("All");

  const doctors = [
    { id: 1, icon: drKhanAvatar, title: "Dr. Alisha Khan", dept: "Cardiologist", desc: "Expert in heart care and non-invasive procedures." },
    { id: 2, icon: drKhanAvatar, title: "Dr. Rafiq Ahmed", dept: "Neurologist", desc: "Specializing in advanced neurological diagnostics." },
    { id: 3, icon: drKhanAvatar, title: "Dr. Priya Roy", dept: "Pediatrician", desc: "Trusted child healthcare and wellness specialist." },
    { id: 4, icon: drKhanAvatar, title: "Dr. Fatima Begum", dept: "Dermatologist", desc: "Focusing on skin health and cosmetic dermatology." },
  ];

  return (
    <div className="min-h-screen bg-[#f4f9f7] pb-20 relative overflow-hidden">
      
      {/* ── BACKGROUND DECOR: VIBRANT & SIZED ── */}
      
      {/* Deep Forest Green - Top Left */}
      <div className="absolute left-[-2%] top-[-2%] z-[0] w-[180px] -rotate-12 pointer-events-none opacity-80">
          <LeafDecor style={{ "--fill-0": "#005f56" }} />
      </div>

      {/* Bright Teal - Mid Right */}
      <div className="absolute right-[2%] top-[15%] z-[0] w-[140px] rotate-[160deg] pointer-events-none opacity-40">
          <LeafDecor style={{ "--fill-0": "#00887f" }} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <section className="relative z-[10] pt-[60px] pb-[40px]">
        <h2 className="text-center text-[48px] font-black text-[#003a46] mb-[10px] tracking-tight">
          Meet Our <span className="text-[#00887f]">Experts</span>
        </h2>
        
        <div className="max-w-[850px] mx-auto px-4 mt-10">
          <GlassCard className="flex flex-wrap items-center gap-4 p-5 rounded-[30px] border-white/80 bg-white/60 shadow-xl backdrop-blur-xl relative overflow-hidden">
            {/* Emerald Leaf inside search */}
            <div className="absolute right-[-15px] top-[-15px] z-[0] w-[80px] rotate-12 pointer-events-none">
                <LeafDecor style={{ "--fill-0": "#2d6a4f" }} />
            </div>

            <input 
              type="text" 
              placeholder="Search doctor name..." 
              className="relative z-[1] flex-1 min-w-[200px] bg-white/90 border-2 border-[#00887f]/10 rounded-full px-6 py-3 outline-none focus:border-[#00887f] text-[#003a46] font-semibold"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="relative z-[1] bg-white/90 border-2 border-[#00887f]/10 rounded-full px-6 py-3 outline-none text-[#003a46] font-bold cursor-pointer"
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="All">All Specialties</option>
              <option value="Cardiologist">Cardiology</option>
              <option value="Neurologist">Neurology</option>
              <option value="Pediatrician">Pediatrics</option>
              <option value="Dermatologist">Dermatology</option>
            </select>
          </GlassCard>
        </div>
      </section>

      {/* ── DOCTOR CARDS ── */}
      <div className="relative z-[20] max-w-[1000px] mx-auto px-4 mt-12 space-y-6">
        {doctors
          .filter(doc => (specialty === "All" || doc.dept === specialty) && doc.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((doc, index) => {
            
            // Defining a clean Forest/Teal palette
            const forestColors = ["#004b43", "#1b4332", "#007a71", "#2d6a4f"];
            const opacities = ["0.7", "0.4", "0.8", "0.5"]; // Varied opacities

            return (
              <div key={doc.id} className="relative group">
                {/* Fixed size leaf (90px) with dynamic green/teal injection */}
                <div className={`absolute ${index % 2 === 0 ? "-right-4 -top-6" : "-left-6 bottom-[-10px] scale-x-[-1]"} z-[0] pointer-events-none w-[100px] group-hover:rotate-12 transition-all duration-700`}>
                    <LeafDecor style={{ 
                      "--fill-0": forestColors[index % forestColors.length],
                      opacity: opacities[index % opacities.length]
                    }} />
                </div>

                <GlassCard className="relative z-[1] p-[30px] rounded-[40px] border-white/70 bg-white/50 backdrop-blur-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,136,127,0.2)] hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-center gap-[30px] max-[640px]:flex-col max-[640px]:text-center">
                    <div className="w-[85px] h-[85px] rounded-full overflow-hidden shrink-0 border-[5px] border-white shadow-lg">
                      <img src={doc.icon} alt={doc.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start max-[640px]:flex-col max-[640px]:items-center">
                        <div>
                          <h2 className="text-[26px] font-black text-[#003a46] leading-tight tracking-tight">{doc.title}</h2>
                          <p className="text-[12px] font-extrabold text-[#00887f] uppercase tracking-[0.15em] mt-1 bg-[#00887f]/10 px-3 py-1 rounded-lg inline-block">{doc.dept} | MBBS, MD</p>
                        </div>
                        <div className="hidden min-[641px]:block relative z-[2]">
                          <PillButton className="px-7 py-3 text-[13px] font-bold shadow-xl shadow-[#00887f]/20">Book Appointment</PillButton>
                        </div>
                      </div>
                      <p className="relative z-[1] text-[15px] font-semibold text-[#4f7f89] mt-3 leading-snug line-clamp-2 max-w-[580px]">{doc.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
      </div>

      {/* Massive Dark Teal Bottom Corner */}
      <div className="absolute right-[-2%] bottom-[-5%] z-[0] w-[220px] rotate-[210deg] pointer-events-none">
          <LeafDecor style={{ "--fill-0": "#003a46", opacity: "0.6" }} />
      </div>
    </div>
  );
};

export default DoctorsPage;