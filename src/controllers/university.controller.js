const University = require("../models/university.model");

exports.getAllUniversity = async (req, res) => {
  try {
    const universities = await University.findAll();
    res.json(universities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUniversityById = async (req, res) => {
  try {
    const { ID } = req.params;
    const university = await University.findOne({
      where: { ID },
    });

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    res.status(200).json(university);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
