const doctorModel = require("../models/doctorModel");
const mongoose = require("mongoose");
// ----------------- GET ALL DOCTORS WITH FILTERS & PAGINATION -----------------
exports.getAllDoctors = async (req, res) => {
  try {
    const pageNo = parseInt(req.query.pageNo) || 1;
    const perpage = parseInt(req.query.perpage) || 10;
    const skipRow = (pageNo - 1) * perpage;

    // Build filter
    let filter = {};

    if (req.query.specialization) {
      filter.specialization = { $regex: req.query.specialization, $options: "i" };
    }

    if (req.query.hospital) {
      filter.hospital = { $regex: req.query.hospital, $options: "i" };
    }

    if (req.query.minExperience) {
      filter.experience = { $gte: parseInt(req.query.minExperience) };
    }

    if (req.query.maxFees) {
      filter.fees = { $lte: parseInt(req.query.maxFees) };
    }

    if (req.query.verified === "true") {
      filter.verified = true;
    } else if (req.query.verified === "false") {
      filter.verified = false;
    }

    let sortOption = { createdAt: -1 };
    if (req.query.sortBy === "experience_asc") sortOption = { experience: 1 };
    if (req.query.sortBy === "experience_desc") sortOption = { experience: -1 };
    if (req.query.sortBy === "fees_asc") sortOption = { fees: 1 };
    if (req.query.sortBy === "fees_desc") sortOption = { fees: -1 };

    // Aggregation pipeline
    let pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ];

    // Search by name
    if (req.query.search) {
      pipeline.push({
        $match: {
          "user.name": { $regex: req.query.search, $options: "i" },
        },
      });
    }

    // Add other filters
    if (Object.keys(filter).length > 0) {
      pipeline.push({ $match: filter });
    }

    // Pagination
    pipeline.push({
      $facet: {
        totalCount: [{ $count: "count" }],
        doctors: [
          { $sort: sortOption },
          { $skip: skipRow },
          { $limit: perpage },
          {
            $project: {
              _id: 1,
              specialization: 1,
              experience: 1,
              hospital: 1,
              fees: 1,
              verified: 1,
              "user._id": 1,
              "user.name": 1,
              "user.email": 1,
              "user.phone": 1,
            },
          },
        ],
      },
    });

    const result = await doctorModel.aggregate(pipeline);
    const totalCount = result[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / perpage);

    res.json({
      success: true,
      doctors: result[0].doctors,
      pagination: {
        currentPage: pageNo,
        totalPages,
        totalDoctors: totalCount,
        perPage: perpage,
        hasNextPage: pageNo < totalPages,
        hasPrevPage: pageNo > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

// -------- GET SINGLE DOCTOR (WITH REVIEWS) -----------------
exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    // Convert string ID to MongoDB ObjectId for the aggregation match stage
    const doctorId = new mongoose.Types.ObjectId(id);

    const pipeline = [
      // 1. Find the specific doctor by their ID
      {
        $match: { _id: doctorId }
      },
      // 2. Join the User collection to get the doctor's name, email, etc.
      {
        $lookup: {
          from: "users",          // The name of the users collection
          localField: "userId",   // The field in the doctors collection
          foreignField: "_id",    // The matching field in the users collection
          as: "user"
        }
      },
      // 3. Unwind the user array so it's a single object
      {
        $unwind: "$user"
      },
      // 4. Join the Reviews collection to get all reviews for this doctor
      {
        $lookup: {
          from: "reviews",        // Must match exactly your review collection name
          localField: "_id",      // The doctor's ID
          foreignField: "doctorId",// The field in the reviews collection linking back
          as: "reviews"           // The name of the new array holding the reviews
        }
      },
      // 5. Project (format) the final output structure
      {
        $project: {
          _id: 1,
          specialization: 1,
          experience: 1,
          hospital: 1,
          fees: 1,
          verified: 1,
          "user._id": 1,
          "user.name": 1,
          "user.email": 1,
          "user.phone": 1,
          reviews: 1 // Include the full array of reviews
        }
      }
    ];

    const result = await doctorModel.aggregate(pipeline);

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // result is an array, so we send the first (and only) object
    res.json({
      success: true,
      doctor: result[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
};

// ------------ GET SPECIALIZATIONS -----------------
exports.getSpecializations = async (req, res) => {
  try {
    const specializations = await doctorModel.distinct("specialization");
    res.json({
      success: true,
      specializations: specializations.sort(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch specializations",
      error: error.message,
    });
  }
};

// ------------- GET HOSPITALS -----------
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await doctorModel.distinct("hospital");
    res.json({
      success: true,
      hospitals: hospitals.sort(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hospitals",
      error: error.message,
    });
  }
};

// ----------------- UPDATE DOCTOR PROFILE only for logged in doctor --------------------------------
exports.updateDoctorProfile = async (req, res) => {
  try {
    const { specialization, experience, hospital, fees } = req.body;

    const updateData = {};
    if (specialization) updateData.specialization = specialization;
    if (experience) updateData.experience = Number(experience);
    if (hospital) updateData.hospital = hospital;
    if (fees) updateData.fees = Number(fees);

    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.json({
      success: true,
      message: "Doctor profile updated successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update doctor profile",
      error: error.message,
    });
  }
};