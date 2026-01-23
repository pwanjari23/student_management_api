const db = require("../utils/db-connection");
const { Students, IdentityCard, Department } = require('../models'); 


exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.insertStudentsData = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const students = await Students.create({
      name: name,
      email: email,
      age: age,
    });
    res
      .status(201)
      .send(
        `User with name ${name} having email ${email} of ${age} years is created`,
      );
  } catch (error) {
    res.status(500).send("User not created");
  }
};

exports.getStudentById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM students WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(results[0]);
  });
};

exports.addingValuesToStudentAndIndentityTable = async (req, res) => {
  try {
    const student = await Students.create(req.body.student);
const idCard = await IdentityCard.create({
  ...req.body.IdentityCard,
  StudentId: student.id
});
    res.status(201).json({ student, idCard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const students = await Students.findByPk(id);
    if (!students) {
      return res.status(404).send("User not found");
    }
    students.name = name;
    students.email = email;
    students.age = age;
    await students.save();
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(500).send("User cannot be updated");
  }
};

exports.deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Students.destroy({
      where: {
        id: id,
      },
    });
    if (!students) {
      res.status(404).send("User not found");
    }
    res.status(200).send("User deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error encountered");
  }
};
