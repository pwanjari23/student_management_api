const db = require("../utils/db-connection");
const Students = require("../models/students");

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// exports.insertStudentsData = (req, res) => {
//   const { name, email, age } = req.body;

//   if (!name || !email || !age) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";

//   db.query(sql, [name, email, age], (err, results) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     res.status(201).json({
//       message: "Student inserted successfully",
//       studentId: results.insertId,
//     });
//   });
// };

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

// exports.updateStudentById = (req, res) => {
//   const { id } = req.params;
//   const { name, email, age } = req.body;

//   if (!name || !email || !age) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const sql = "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?";

//   db.query(sql, [name, email, age, id], (err, results) => {
//     if (err) {
//       return res.status(500).json(err);
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json({ message: "Student updated successfully" });
//   });
// };

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

// exports.deleteStudentById = (req, res) => {
//   const { id } = req.params;

//   const sql = "DELETE FROM students WHERE id = ?";

//   db.query(sql, [id], (err, results) => {
//     if (err) {
//       return res.status(500).json(err);
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json({ message: "Student deleted successfully" });
//   });
// };

exports.deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const students = await Students.destroy({
      where: {
        id: id,
      },
    });
    if(!students){
        res.status(404).send("User not found");
    }
    res.status(200).send("User deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error encountered");
  }
};
