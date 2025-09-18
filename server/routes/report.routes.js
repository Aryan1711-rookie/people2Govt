import express from "express";
import { getAllReports, createReport, updateIssueStatus } from "../controllers/report.controller.js";
import { uploadFiles } from "../middlewares/multer.js";
const router = express.Router();

router.route("/").get(getAllReports);      // GET /api/reports
router.route("/create").post(uploadFiles, createReport);      // POST /api/reports
router.route("/:id").patch(updateIssueStatus);    // PATCH /api/reports/:id

export default router;
    