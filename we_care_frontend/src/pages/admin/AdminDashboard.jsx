import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeafDecor from "../../components/LeafDecor";
import GlassCard from "../../components/GlassCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(null);

  // dummy summary
  const summaryData = {
    doctors: "500+",
    hospitals: "200+",
    patients: "5000+",
  };

  // dummy lists
  const patients = [
    { _id: "p1", name: "MD. Sadman Mahin" },
    { _id: "p2", name: "Farzan Rahman" },
    { _id: "p3", name: "Md. Fahim Moontashir" },
    { _id: "p4", name: "Shadab Arshad" },
  ];

  const doctors = [
    { _id: "d1", name: "Dr. Shabnam", specialization: "Cardiology" },
    { _id: "d2", name: "Dr. Paris", specialization: "Neurology" },
    { _id: "d3", name: "Dr. Ekram", specialization: "Dermatology" },
  ];

  const hospitals = [
    { _id: "h1", name: "City Hospital", address: "Dhanmondi, Dhaka" },
    { _id: "h2", name: "Green Care Medical", address: "Uttara, Dhaka" },
    { _id: "h3", name: "LifeLine Hospital", address: "Chattogram" },
  ];

  const handleViewProfile = (type, id) => {
    navigate(`/admin/${type}/${id}`);
  };

  const renderList = () => {
    if (!selectedTab) {
      return (
        <GlassCard className="rounded-[28px] border-white/80 bg-white/60 px-6 py-10 shadow-xl backdrop-blur-xl">
          <div className="text-center">
            <h3 className="text-[24px] font-bold text-[#1d5f71]">
              Select a category to view data
            </h3>
            <p className="mt-2 text-[15px] font-medium text-[#4f7f89]">
              Choose Patients, Doctors, or Hospitals from the summary cards above.
            </p>
          </div>
        </GlassCard>
      );
    }

    if (selectedTab === "patients") {
      return (
        <GlassCard className="rounded-[28px] border-white/80 bg-white/60 px-5 py-6 shadow-xl backdrop-blur-xl md:px-7">
          <div className="mb-5">
            <h2 className="text-[26px] font-bold text-[#1d5f71]">Patients</h2>
            <p className="text-[14px] font-medium text-[#4f7f89]">
              Patient list
            </p>
          </div>

          <div className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient._id}
                className="flex flex-col gap-4 rounded-[22px] border border-[#00887f]/10 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-[18px] font-bold text-[#1d5f71]">
                    {patient.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => handleViewProfile("patients", patient._id)}
                  className="rounded-[14px] bg-gradient-to-r from-[#046ea3] to-[#68B2A0] px-5 py-2.5 text-[14px] font-bold text-white transition-all hover:opacity-90"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      );
    }

    if (selectedTab === "doctors") {
      return (
        <GlassCard className="rounded-[28px] border-white/80 bg-white/60 px-5 py-6 shadow-xl backdrop-blur-xl md:px-7">
          <div className="mb-5">
            <h2 className="text-[26px] font-bold text-[#1d5f71]">Doctors</h2>
            <p className="text-[14px] font-medium text-[#4f7f89]">
              Doctor list
            </p>
          </div>

          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="flex flex-col gap-4 rounded-[22px] border border-[#00887f]/10 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-[18px] font-bold text-[#1d5f71]">
                    {doctor.name}
                  </h3>
                  <p className="mt-1 text-[14px] font-medium text-[#4f7f89]">
                    {doctor.specialization}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleViewProfile("doctors", doctor._id)}
                  className="rounded-[14px] bg-gradient-to-r from-[#046ea3] to-[#68B2A0] px-5 py-2.5 text-[14px] font-bold text-white transition-all hover:opacity-90"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      );
    }

    if (selectedTab === "hospitals") {
      return (
        <GlassCard className="rounded-[28px] border-white/80 bg-white/60 px-5 py-6 shadow-xl backdrop-blur-xl md:px-7">
          <div className="mb-5">
            <h2 className="text-[26px] font-bold text-[#1d5f71]">Hospitals</h2>
            <p className="text-[14px] font-medium text-[#4f7f89]">
              Active hospital list
            </p>
          </div>

          <div className="space-y-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="flex flex-col gap-4 rounded-[22px] border border-[#00887f]/10 bg-white/80 p-5 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-[18px] font-bold text-[#1d5f71]">
                    {hospital.name}
                  </h3>
                  <p className="mt-1 text-[14px] font-medium text-[#4f7f89]">
                    {hospital.address}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleViewProfile("hospitals", hospital._id)}
                  className="rounded-[14px] bg-gradient-to-r from-[#046ea3] to-[#68B2A0] px-5 py-2.5 text-[14px] font-bold text-white transition-all hover:opacity-90"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      );
    }

    return null;
  };

  const cardBase =
    "cursor-pointer rounded-[26px] border px-5 py-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";
  const activeCard =
    "border-[#00887f]/40 bg-white/80 ring-2 ring-[#7ddfcb] shadow-[0_0_25px_rgba(104,178,160,0.45)]";
  const inactiveCard = "border-white/80 bg-white/60";

  return (
    <div className="min-h-screen bg-[#f4f9f7] pb-20 relative overflow-hidden">
      <div className="absolute left-[-2%] top-[-2%] z-[0] w-[180px] -rotate-12 pointer-events-none opacity-80">
        <LeafDecor style={{ "--fill-0": "#005f56" }} />
      </div>

      <div className="absolute right-[-2%] bottom-[-5%] z-[0] w-[220px] rotate-[210deg] pointer-events-none opacity-60">
        <LeafDecor style={{ "--fill-0": "#003a46" }} />
      </div>

      <div className="absolute left-[-3%] top-[45%] z-[0] w-[160px] rotate-[20deg] pointer-events-none opacity-50">
        <LeafDecor style={{ "--fill-0": "#2d6a4f" }} />
      </div>

      <div className="absolute right-[5%] top-[12%] z-[0] w-[120px] rotate-[160deg] pointer-events-none opacity-60">
        <LeafDecor style={{ "--fill-0": "#00887f" }} />
      </div>

      <section className="relative z-[10] pt-[60px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-[clamp(28px,4vw,42px)] font-bold text-[#1d5f71]">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-[15px] font-semibold text-[#4f7f89]">
              Monitor platform summaries and manage core entities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mb-8">

            <div
              onClick={() => setSelectedTab("doctors")}
              className={`${cardBase} ${
                selectedTab === "doctors" ? activeCard : inactiveCard
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[14px] font-semibold text-[#4f7f89]">
                    Doctors
                  </p>
                  <h2 className="mt-2 text-[34px] font-black text-[#1d5f71]">
                    {summaryData.doctors}
                  </h2>
                </div>

                <div
                  className={`h-4 w-4 rounded-full transition-all ${
                    selectedTab === "doctors"
                      ? "bg-[#7ddfcb] shadow-[0_0_18px_rgba(125,223,203,1)]"
                      : "bg-[#cfe7e2]"
                  }`}
                />
              </div>
            </div>

            <div
              onClick={() => setSelectedTab("hospitals")}
              className={`${cardBase} ${
                selectedTab === "hospitals" ? activeCard : inactiveCard
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[14px] font-semibold text-[#4f7f89]">
                    Hospitals
                  </p>
                  <h2 className="mt-2 text-[34px] font-black text-[#1d5f71]">
                    {summaryData.hospitals}
                  </h2>
                </div>

                <div
                  className={`h-4 w-4 rounded-full transition-all ${
                    selectedTab === "hospitals"
                      ? "bg-[#7ddfcb] shadow-[0_0_18px_rgba(125,223,203,1)]"
                      : "bg-[#cfe7e2]"
                  }`}
                />
              </div>
            </div>

            <div
              onClick={() => setSelectedTab("patients")}
              className={`${cardBase} ${
                selectedTab === "patients" ? activeCard : inactiveCard
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[14px] font-semibold text-[#4f7f89]">
                    Patients
                  </p>
                  <h2 className="mt-2 text-[34px] font-black text-[#1d5f71]">
                    {summaryData.patients}
                  </h2>
                </div>

                <div
                  className={`h-4 w-4 rounded-full transition-all ${
                    selectedTab === "patients"
                      ? "bg-[#7ddfcb] shadow-[0_0_18px_rgba(125,223,203,1)]"
                      : "bg-[#cfe7e2]"
                  }`}
                />
              </div>
            </div>


          </div>

          {renderList()}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;