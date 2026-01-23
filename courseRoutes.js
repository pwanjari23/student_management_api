const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/addCourses', courseController.addCourses);

module.exports = router;

 