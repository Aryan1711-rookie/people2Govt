import Report from "../models/report.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// @desc   Create a new report
// @route  POST /api/reports
// @access Public
export const createReport = async (req, res) => {
  try {
    const { title, description, department, lat, lng } = req.body;

    // ✅ Validate required fields
    if (!title || !description || !department || !lat || !lng) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let photos = [];
    let voiceNote = {};

     // Upload images
    if (req.files.photos) {
      for (const file of req.files.photos) {
        const url = await uploadToCloudinary(file.buffer, "issues/images"); // pass buffer for memoryStorage
        photos.push(url);
      }
    }

    // Upload voice note
    if (req.files.audio && req.files.audio[0]) {
      const url = await uploadToCloudinary(req.files.audio[0].buffer, "issues/voice");
      voiceNote = { url };
    }

    
    const newReport = await Report.create({
      title,
      description,
      department,
      lat, 
      lng,
      photos,
      audio: req.files.audio ? await uploadToCloudinary(req.files.audio[0].buffer, "issues/voice") : null,
    });

    return res.status(201).json({
      success: true,
      message: "Report created successfully",
      data: newReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    return res.status(500).json({ message: "Server error while creating report" });
  }
};

// @desc   Get all reports
// @route  GET /api/reports
// @access Admin
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success:true,
      data: reports
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({ message: "Failed to fetch reports" });
  }
};

// export const getReportById = async (req, res) => {
//   try {
//     const report = await Report.findById(req.params.id);
//     if (!report) {
//       return res.status(404).json({ message: "Report not found" });
//     }
//     res.status(200).json(report);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch report" });
//   }
// };
export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, progress } = req.body;

    const updatedIssue = await Report.findByIdAndUpdate(
      id,
      { status, ...(progress && { progress }) },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json({
      message: "Issue status updated",
      data: updatedIssue,
    });
  } catch (error) {
    console.error("Error updating issue:", error);
    res.status(500).json({ message: "Server error" });
  }
};