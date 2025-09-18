import Issue from "../models/issue.model.js";

// @desc   Get all issues (for admin dashboard)
// @route  GET /api/issues
// @access Admin
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update issue status (Admin)
// @route  PATCH /api/issues/:id
// @access Admin
export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, progress } = req.body;

    const updatedIssue = await Issue.findByIdAndUpdate(
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

export const getIssuesById = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    res.status(200).json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    res.status(500).json({ message: "Server error" });
  }
};
