import React, { useState, useEffect } from "react";
import LeafDecor from "../components/LeafDecor";
import GlassCard from "../components/GlassCard";
import DoctorCard from "../components/DoctorCard";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        
        let url = `http://localhost:5600/api/v1/doctors?search=${searchTerm}`;
        if (specialty !== "All") {
          url += `&specialization=${specialty}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          
          setDoctors(data.doctors); 
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchDoctors();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, specialty]);

  return (
    <div className="min-h-screen bg-[#f4f9f7] pb-20 relative overflow-hidden">
      
      
      <div className="absolute left-[-2%] top-[-2%] z-[0] w-[180px] -rotate-12 pointer-events-none opacity-80">
          <LeafDecor style={{ "--fill-0": "#005f56" }} />
      </div>

      <section className="relative z-[10] pt-[60px] pb-[40px]">
        <h2 className="text-center text-[48px] font-black text-[#003a46] mb-[10px] tracking-tight">
          Meet Our <span className="text-[#00887f]">Experts</span>
        </h2>
        
        <div className="max-w-[850px] mx-auto px-4 mt-10">
          <GlassCard className="flex flex-wrap items-center gap-4 p-5 rounded-[30px] border-white/80 bg-white/60 shadow-xl backdrop-blur-xl relative overflow-hidden">
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

      {/* Doctor List Section */}
      <div className="relative z-[20] max-w-[1000px] mx-auto px-4 mt-12 space-y-6">
        {loading ? (
          <div className="text-center py-10 font-bold text-[#00887f]">Syncing with medical database...</div>
        ) : doctors.length > 0 ? (
          doctors.map((doc, index) => (
            <DoctorCard key={doc._id} doc={doc} index={index} />
          ))
        ) : (
          <div className="text-center py-10 text-[#4f7f89]">No doctors found matching your search.</div>
        )}
      </div>

      <div className="absolute right-[-2%] bottom-[-5%] z-[0] w-[220px] rotate-[210deg] pointer-events-none opacity-60">
          <LeafDecor style={{ "--fill-0": "#003a46" }} />
      </div>
    </div>
  );
};

export default DoctorsPage;