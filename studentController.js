const db = require("../utils/db-connection");

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.insertStudentsData = (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";

  db.query(sql, [name, email, age], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).json({
      message: "Student inserted successfully",
      studentId: results.insertId,
    });
  });
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

exports.updateStudentById = (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql =
    'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?';

  db.query(sql, [name, email, age, id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully' });
  });
};

exports.deleteStudentById = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM students WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  });
};

