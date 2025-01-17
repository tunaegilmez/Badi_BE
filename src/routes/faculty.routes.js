const express = require("express");
const {
  getAllFaculty,
  getFacultyById,
} = require("../controllers/faculty.controller");

const router = express.Router();

router.get("/", getAllFaculty);
router.get("/:ID", getFacultyById);

module.exports = router;
