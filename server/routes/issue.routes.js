import express from "express";
import { 
  getAllIssues, 
  updateIssueStatus, 
  getIssuesById 
} from "../controllers/issue.controller.js";

const router = express.Router();

// GET all issues (Admin dashboard)
router.route("/").get(getAllIssues);

// GET single issue by ID
router.route("/:id").get(getIssuesById);

// PATCH (update) issue status
router.route("/:id").patch(updateIssueStatus);

export default router;
