import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    department: {
      type: String,
      enum: ["Public Works", "Sanitation", "Electricity"],
      required: true,
    },

    // ✅ Location fields
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String }, // optional reverse geocoded address
    },

    // ✅ Media fields
    images: [
      {
        url: { type: String, required: true }, // link to stored image (Cloudinary, S3, etc.)
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    voiceNote: {
      url: { type: String }, // optional audio file link
      duration: { type: Number }, // in seconds
    },

    reportedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
