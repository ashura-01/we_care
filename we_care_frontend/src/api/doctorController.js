import api from "./api";

export const doctorController = {
  updateDoctorProfile: async (formData, isDoctor) => {
    try {
      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("phone", formData.phone);
      submitData.append("address", formData.address);
      submitData.append("gender", formData.gender);
      submitData.append("bloodgroup", formData.bloodgroup);

      if (isDoctor) {
        submitData.append("specialization", formData.specialization);
        submitData.append("experience", formData.experience);
        submitData.append("hospital", formData.hospital);
        submitData.append("fees", formData.fees);
      }

      if (formData.profilePictureFile) {
        submitData.append("profileImage", formData.profilePictureFile);
      }

      const response = await api.put("/doctor-profile", submitData);
      return response.data;
      
    } catch (error) {
      console.error("Profile update error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Profile update failed",
      };
    }
  },
};