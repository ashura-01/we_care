import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import LeafDecor from "../../components/LeafDecor";
import GlassCard from "../../components/GlassCard";

const AdminHospitalProfile = () => {
  const { id } = useParams();

  const hospital = {
    _id: id,
    name: "City Hospital",
    address: "Dhanmondi, Dhaka",
    status: "Active",
    contact: "01911111111",
  };

  return (
    <div className="min-h-screen bg-[#f4f9f7] relative overflow-hidden pb-20">
      

      <div className="absolute left-[-2%] top-[-2%] z-[0] w-[180px] -rotate-12 pointer-events-none opacity-80">
        <LeafDecor style={{ "--fill-0": "#005f56" }} />
      </div>

      <div className="absolute right-[-2%] bottom-[-5%] z-[0] w-[220px] rotate-[210deg] pointer-events-none opacity-60">
        <LeafDecor style={{ "--fill-0": "#003a46" }} />
      </div>

      <section className="relative z-[10] pt-[100px]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-[36px] font-bold text-[#1d5f71]">Hospital Profile</h1>
            <p className="mt-2 text-[15px] font-semibold text-[#4f7f89]">
              Review and manage hospital information.
            </p>
          </div>

          <GlassCard className="rounded-[30px] bg-white/60 px-6 py-8 shadow-xl backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Info label="Hospital Name" value={hospital.name} />
              <Info label="Contact" value={hospital.contact} />
              <Info label="Status" value={hospital.status} />
              <div className="md:col-span-2">
                <Info label="Address" value={hospital.address} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-[14px] bg-gradient-to-r from-[#046ea3] to-[#68B2A0] px-6 py-3 text-[15px] font-bold text-white">
                Edit
              </button>

              <button className="rounded-[14px] border border-yellow-500 px-6 py-3 text-[15px] font-bold text-yellow-600 hover:bg-yellow-500 hover:text-white">
                Suspend
              </button>

              <button className="rounded-[14px] border border-red-500 px-6 py-3 text-[15px] font-bold text-red-600 hover:bg-red-500 hover:text-white">
                Delete
              </button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="mb-2 text-[14px] font-bold text-[#2C6975]">{label}</p>
    <div className="rounded-[16px] border border-[#00887f]/10 bg-white/90 px-4 py-3 text-[#1d5f71]">
      {value}
    </div>
  </div>
);

export default AdminHospitalProfile;