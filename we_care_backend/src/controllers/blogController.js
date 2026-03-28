const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const doctorModel = require("../models/doctorModel"); // Need this to verify they are a doctor

// ----------------- CREATE BLOG -----------------
exports.createBlog = async (req, res) => {
  try {
    // 1. Verify the logged-in user is actually a registered doctor
    const isDoctor = await doctorModel.findOne({ userId: req.user._id });
    if (!isDoctor) {
      return res.status(403).json({ success: false, message: "Access denied. Only doctors can post blogs." });
    }

    let { title, category, image, description, shortDescription } = req.body;

    // 2. Create the blog and attach the doctor's user ID
    let data = await blogModel.create({
      title,
      category,
      image,
      description,
      shortDescription,
      authorId: req.user._id, // Automatically assign the author!
    });

    res.status(200).json({ success: true, message: "Blog created successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Failed to create blog" });
  }
};

// ----------------- GET ALL BLOGS -----------------
exports.getAllBlogs = async (req, res) => {
  try {
    let pageNo = Number(req.query.pageNo) || 1; // Changed to query params for standard REST
    let perpage = Number(req.query.perpage) || 10;
    let skipRow = (pageNo - 1) * perpage;

    let facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        blogs: [
          { $sort: { createdAt: -1 } },
          { $skip: skipRow },
          { $limit: perpage },
          // NEW: Fetch the author's name from the users collection
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author",
            },
          },
          { $unwind: "$author" }, // Flattens the author array
          {
            $project: {
              title: 1, image: 1, category: 1, shortDescription: 1, createdAt: 1,
              "author.name": 1, // We only want to send the doctor's name, not their password/email!
            },
          },
        ],
      },
    };

    let blogs = await blogModel.aggregate([facetStage]);

    res.status(200).json({ success: true, message: "Blogs fetched successfully", data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Failed to fetch blogs" });
  }
};

// ----------------- GET SINGLE BLOG -----------------
exports.getSingleBlog = async (req, res) => {
  try {
    let { id } = req.params;

    let matchstage = { $match: { _id: new mongoose.Types.ObjectId(id) } };
    
    // Fetch author details
    let joinAuthor = {
      $lookup: { from: "users", localField: "authorId", foreignField: "_id", as: "author" }
    };

    let project = {
      $project: {
        title: 1, category: 1, image: 1, description: 1, createdAt: 1,
        "author.name": 1
      }
    };

    let data = await blogModel.aggregate([matchstage, joinAuthor, { $unwind: "$author" }, project]);

    res.status(200).json({ success: true, message: "Blog fetched successfully", data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Failed to fetch single blog" });
  }
};

// ----------------- UPDATE BLOG -----------------
exports.updateBlog = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, category, image, description, shortDescription } = req.body;

    // Ensure the person updating it is the person who wrote it
    const blog = await blogModel.findOne({ _id: id, authorId: req.user._id });
    if (!blog) {
      return res.status(403).json({ success: false, message: "You can only edit your own blogs." });
    }

    let data = await blogModel.findByIdAndUpdate(
      id,
      { title, category, image, description, shortDescription },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Blog updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Failed to update blog" });
  }
};

// ----------------- DELETE BLOG -----------------
exports.deleteBlog = async (req, res) => {
  try {
    let { id } = req.params;

    // Ensure the person deleting it is the person who wrote it
    const blog = await blogModel.findOne({ _id: id, authorId: req.user._id });
    if (!blog) {
       return res.status(403).json({ success: false, message: "You can only delete your own blogs." });
    }

    let data = await blogModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Blog deleted successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString(), message: "Failed to delete blog" });
  }
};

// ----------------- GET BLOGS BY SPECIFIC DOCTOR -----------------
exports.getBlogsByDoctor = async (req, res) => {
  try {
    let { doctorId } = req.params; 
    let pageNo = Number(req.query.pageNo) || 1;
    let perpage = Number(req.query.perpage) || 10;
    let skipRow = (pageNo - 1) * perpage;

    // 1. First, find the doctor to get their actual User ID (which is the authorId in blogs)
    const doctor = await doctorModel.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // 2. Match blogs where the authorId equals this doctor's userId
    let matchStage = { $match: { authorId: new mongoose.Types.ObjectId(doctor.userId) } };

    // 3. Reuse your awesome pagination and lookup pipeline!
    let facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        blogs: [
          { $sort: { createdAt: -1 } },
          { $skip: skipRow },
          { $limit: perpage },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author",
            },
          },
          { $unwind: "$author" },
          {
            $project: {
              title: 1, image: 1, category: 1, shortDescription: 1, createdAt: 1,
              "author.name": 1,
            },
          },
        ],
      },
    };

    let blogs = await blogModel.aggregate([matchStage, facetStage]);

    res.status(200).json({ 
      success: true, 
      message: "Doctor's blogs fetched successfully", 
      data: blogs 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.toString(), 
      message: "Failed to fetch doctor's blogs" 
    });
  }
};