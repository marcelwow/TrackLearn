const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.get("/", subjectController.getSubjects);
router.post("/add", subjectController.addSubject);
router.post("/:id/grade", subjectController.addGrade);
router.get("/:id/recalculate", subjectController.recalculateAverage);
router.post("/:id/delete", subjectController.deleteSubject);
router.post("/:id/toggle-passed", subjectController.togglePassed);

module.exports = router;
