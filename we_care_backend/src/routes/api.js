const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const doctorController = require("../controllers/doctorController");
const auth = require("../middlewares/authVerification");

// Test route
router.get("/", (req, res) => {
  res.send("API v1 working 🚀");
});

// ------------ PUBLIC ROUTES------------
router.get("/doctors", doctorController.getAllDoctors);
router.get("/doctors/:id", doctorController.getDoctorById);
router.get("/specializations", doctorController.getSpecializations);
router.get("/hospitals", doctorController.getHospitals);

// -------------- AUTH ROUTES -----------------
router.post("/register", userController.register);
router.post("/register-doctor", userController.registerDoctor);
router.post("/login", userController.login);
router.get("/logout", auth(), userController.logout);

// -------------- PROTECTED ROUTES -------------
router.get("/profile", auth(), userController.getProfile);
router.put("/profile", auth(), userController.updateProfile);
router.delete("/account", auth(), userController.deleteAccount);

// --------- DOCTOR ONLY ROUTES -----------
router.put("/doctor-profile", auth(), doctorController.updateDoctorProfile);

module.exports = router;