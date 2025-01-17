const Faculty = require("../models/faculty.model");

exports.getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.findAll();
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFacultyById = async (req, res) => {
  try {
    const { ID } = req.params;
    const faculty = await Faculty.findOne({
      where: { ID },
    });

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
