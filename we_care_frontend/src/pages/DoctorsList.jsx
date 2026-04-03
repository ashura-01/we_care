import React, { useState, useEffect } from "react";
import LeafDecor from "../components/LeafDecor";
import GlassCard from "../components/GlassCard";
import DoctorCard from "../components/DoctorCard";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [loading, setLoading] = useState(true);
  
  // ── PAGINATION STATE ──
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

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
          setCurrentPage(1); // Reset to page 1 on new search/filter
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

  // ── PAGINATION LOGIC ──
  const indexOfLastDoc = currentPage * doctorsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoc, indexOfLastDoc);
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  return (
    <div className="min-h-screen bg-[#f4f9f7] pb-32 relative overflow-hidden">
      
      {/* ── ALL 7 BACKGROUND LEAVES ── */}
      <div className="absolute left-[-2%] top-[-2%] z-[0] w-[180px] -rotate-12 pointer-events-none opacity-80"><LeafDecor style={{ "--fill-0": "#005f56" }} /></div>
      <div className="absolute left-[8%] top-[12%] z-[0] w-[110px] rotate-[80deg] pointer-events-none opacity-20"><LeafDecor style={{ "--fill-0": "#00887f" }} /></div>
      <div className="absolute right-[2%] top-[18%] z-[0] w-[150px] rotate-[160deg] pointer-events-none opacity-40"><LeafDecor style={{ "--fill-0": "#00887f" }} /></div>
      <div className="absolute left-[-3%] top-[45%] z-[0] w-[200px] rotate-[15deg] pointer-events-none opacity-30"><LeafDecor style={{ "--fill-0": "#2d6a4f" }} /></div>
      <div className="absolute right-[15%] top-[55%] z-[0] w-[90px] rotate-[-25deg] pointer-events-none opacity-15"><LeafDecor style={{ "--fill-0": "#1b4332" }} /></div>
      <div className="absolute right-[-2%] bottom-[-5%] z-[0] w-[280px] rotate-[210deg] pointer-events-none opacity-60"><LeafDecor style={{ "--fill-0": "#003a46" }} /></div>
      <div className="absolute left-[5%] bottom-[8%] z-[0] w-[160px] rotate-[50deg] pointer-events-none opacity-25"><LeafDecor style={{ "--fill-0": "#004b43" }} /></div>

      {/* ── HEADER ── */}
      <section className="relative z-[10] pt-[60px] pb-[40px]">
        <h2 className="text-center text-[36px] md:text-[48px] font-black text-[#003a46] mb-[10px] tracking-tight px-4">
          Meet Our <span className="text-[#00887f]">Experts</span>
        </h2>
        
        <div className="max-w-[850px] mx-auto px-4 mt-10">
          <GlassCard className="flex flex-wrap items-center gap-4 p-5 rounded-[30px] border-white/80 bg-white/60 shadow-xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute right-[-15px] top-[-15px] z-[0] w-[80px] rotate-12 pointer-events-none">
                <LeafDecor style={{ "--fill-0": "#2d6a4f" }} />
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="relative z-[1] flex-1 min-w-[180px] bg-white/90 border-2 border-[#00887f]/10 rounded-full px-6 py-3 outline-none focus:border-[#00887f] text-[#003a46] font-semibold"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="relative z-[1] bg-white/90 border-2 border-[#00887f]/10 rounded-full px-4 md:px-6 py-3 outline-none text-[#003a46] font-bold cursor-pointer"
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

      {/* ── DOCTOR GRID ── */}
      <div className="relative z-[20] max-w-[1000px] mx-auto px-4 mt-6 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-8">
        {loading ? (
          <div className="col-span-2 text-center py-10 font-bold text-[#00887f]">Syncing experts...</div>
        ) : currentDoctors.length > 0 ? (
          currentDoctors.map((doc, index) => {
            const forestColors = ["#004b43", "#1b4332", "#007a71", "#2d6a4f"];
            return (
              <div key={doc._id} className="relative group h-full">
                <div className={`absolute ${index % 2 === 0 ? "-right-4 -top-6" : "-left-6 bottom-[-10px] scale-x-[-1]"} z-[0] pointer-events-none w-[60px] md:w-[100px] group-hover:rotate-12 transition-all duration-700`}>
                    <LeafDecor style={{ "--fill-0": forestColors[index % 4], opacity: index % 2 === 0 ? "0.7" : "0.5" }} />
                </div>
                <div className={`absolute ${index % 2 === 0 ? "-right-10 -bottom-8" : "-left-12 -top-10"} z-[0] pointer-events-none w-[50px] md:w-[80px] rotate-[100deg] opacity-20`}>
                    <LeafDecor style={{ "--fill-0": forestColors[(index + 1) % 4] }} />
                </div>

                <GlassCard className="relative z-[1] p-4 md:p-[30px] rounded-[24px] md:rounded-[40px] border-white/70 bg-white/50 backdrop-blur-[30px] shadow-lg hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-[30px] text-center md:text-left h-full">
                    <div className="w-[60px] h-[60px] md:w-[85px] md:h-[85px] rounded-full overflow-hidden shrink-0 border-[3px] md:border-[5px] border-white shadow-md bg-gray-100">
                      <img src={doc.user?.avatar || "https://via.placeholder.com/150"} alt={doc.user?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 w-full flex flex-col">
                      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                        <div className="w-full">
                          <h2 className="text-[15px] md:text-[26px] font-black text-[#003a46] leading-tight">{doc.user?.name}</h2>
                          <div className="mt-1 md:mt-2">
                             <p className="text-[9px] md:text-[12px] font-extrabold text-[#00887f] uppercase tracking-wider bg-[#00887f]/10 px-2 py-0.5 rounded-lg inline-block">{doc.specialization}</p>
                             <p className="hidden md:inline-block text-[12px] font-bold text-[#4f7f89] ml-2">| {doc.experience} Years Exp.</p>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <Link to={`/doctor/${doc._id}`}>
                            <PillButton className="px-7 py-3 text-[13px] font-bold shadow-xl shadow-[#00887f]/20">View Profile</PillButton>
                          </Link>
                        </div>
                      </div>
                      <p className="hidden md:block relative z-[1] text-[15px] font-semibold text-[#4f7f89] mt-3 leading-snug line-clamp-2">Affiliated with {doc.hospital}. Dedicated specialist in {doc.specialization}.</p>
                      <div className="md:hidden mt-auto pt-3">
                         <Link to={`/doctor/${doc._id}`}><PillButton className="w-full py-2 text-[11px] font-bold">View Profile</PillButton></Link>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-10 text-[#4f7f89]">No doctors found.</div>
        )}
      </div>

      {/* ── PAGINATION CONTROLS ── */}
      {totalPages > 1 && (
        <div className="relative z-[30] flex justify-center items-center gap-6 mt-16">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed grayscale' : 'bg-white text-[#00887f] shadow-md hover:bg-[#00887f] hover:text-white'}`}
          >
            ← Prev
          </button>
          
          <span className="text-[#003a46] font-black text-lg">
            {currentPage} <span className="text-[#00887f]/40 font-medium mx-1">/</span> {totalPages}
          </span>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed grayscale' : 'bg-white text-[#00887f] shadow-md hover:bg-[#00887f] hover:text-white'}`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;