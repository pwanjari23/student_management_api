const Course = require("../models/courses");

exports.addCourses = async (req, res) => {
  try {
    const { name } = req.body;
    const course = await Course.create({ name: name });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
