import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/report.routes.js";
import issueRoutes from "./routes/issue.routes.js";
import connectDB from "./utils/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // lets you read JSON body

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/issues", issueRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  connectDB();
});
