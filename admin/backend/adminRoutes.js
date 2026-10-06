const express = require('express');
const router = express.Router();

// Models ko safe require karein
let User, Course, Chapter;
try {
  User = require('../../models/User');
  Course = require('../../models/Course');
  Chapter = require('../../models/Chapter');
} catch (e) {
  console.error("Model loading issue:", e.message);
}

// Frontend Views
const renderSystemAnalysis = require('../frontend/systemAnalysis');
const { renderStudents, renderInstructors, renderCourses } = require('../frontend/managementViews');

// 1. Students Page
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).sort({ _id: -1 }).lean();
    res.send(renderStudents(students));
  } catch (err) {
    console.error(err);
    res.send(renderStudents([]));
  }
});

// 2. Instructors Page
router.get('/instructors', async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' }).sort({ _id: -1 }).lean();
    res.send(renderInstructors(instructors));
  } catch (err) {
    console.error(err);
    res.send(renderInstructors([]));
  }
});

// 3. Courses Page
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort({ _id: -1 }).lean();
    res.send(renderCourses(courses));
  } catch (err) {
    console.error(err);
    res.send(renderCourses([]));
  }
});

// 4. Analysis Handler (Safe Timeout)
const handleSystemAnalysis = async (req, res) => {
  try {
    const [studentCount, instructorCount, courseCount, moduleCount] = await Promise.all([
      User ? User.countDocuments({ role: 'student' }) : 0,
      User ? User.countDocuments({ role: 'instructor' }) : 0,
      Course ? Course.countDocuments() : 0,
      Chapter ? Chapter.countDocuments() : 0
    ]);

    const stats = {
      studentCount: studentCount || 0,
      instructorCount: instructorCount || 0,
      courseCount: courseCount || 0,
      moduleCount: moduleCount || 0
    };

    res.send(renderSystemAnalysis(stats));
  } catch (err) {
    console.error("System Analysis Error:", err);
    res.send(renderSystemAnalysis({ studentCount: 0, instructorCount: 0, courseCount: 0, moduleCount: 0 }));
  }
};

router.get('/analysis', handleSystemAnalysis);
router.get('/system-analysis', handleSystemAnalysis);
router.get('/dashboard', handleSystemAnalysis);

module.exports = router;
