const express = require("express");
const {
  getAllUniversity,
  getUniversityById,
} = require("../controllers/university.controller");

const router = express.Router();

router.get("/", getAllUniversity);
router.get("/:ID", getUniversityById);

module.exports = router;
