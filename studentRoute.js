const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getStudents);
router.post('/insert', studentController.insertStudentsData);
router.get('/:id', studentController.getStudentById);
router.post('/addingStudentWithCard', studentController.addingValuesToStudentAndIndentityTable);
router.put('/:id', studentController.updateStudentById);
router.delete('/:id', studentController.deleteStudentById);


module.exports = router;
