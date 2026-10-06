const express = require('express');
const router = express.Router();

let Course, CourseContent, User;
try {
  Course = require('../../models/Course');
  CourseContent = require('../../models/CourseContent');
  User = require('../../models/User');
} catch (e) {
  console.error("Model Load Error in Student:", e.message);
}

const renderCourses = require('../frontend/courses');
const renderCourseDetails = require('../frontend/courseDetails');
const renderEnrolledCourses = require('../frontend/enrolledCourses');
const renderProfile = require('../frontend/profile');
const renderChangePassword = require('../frontend/changePassword');

// Safe helper
async function getStudent(req) {
  if (req.session && req.session.userId && User) {
    const u = await User.findById(req.session.userId).lean();
    if (u) return u;
  }
  if (User) {
    return await User.findOne({ role: 'student' }).sort({ _id: -1 }).lean();
  }
  return { firstName: 'Student', lastName: 'User', email: 'student@skillverse.com', username: 'student' };
}

// 1. All Courses
router.get('/courses', async (req, res) => {
  try {
    const courses = Course ? await Course.find().lean() : [];
    res.send(renderCourses(courses || []));
  } catch (err) {
    console.error(err);
    res.send(renderCourses([]));
  }
});

// 2. Course Details
router.get('/course-details/:id', async (req, res) => {
  try {
    const course = Course ? await Course.findById(req.params.id).lean() : null;
    if (!course) return res.redirect('/student/courses');
    const contents = CourseContent ? await CourseContent.find({ courseId: course._id }).lean() : [];
    res.send(renderCourseDetails(course, contents || [], false));
  } catch (err) {
    res.redirect('/student/courses');
  }
});

// 3. Enrolled Courses
router.get('/enrolled', async (req, res) => {
  try {
    const courses = Course ? await Course.find().lean() : [];
    if (!courses || courses.length === 0) {
      return res.send(renderEnrolledCourses(null, [], [], null));
    }

    const courseId = req.query.course_id || courses[0]._id;
    const currentCourse = courses.find(c => String(c._id) === String(courseId)) || courses[0];
    const contents = CourseContent ? await CourseContent.find({ courseId: currentCourse._id }).lean() : [];

    let activeTopic = null;
    if (req.query.topic_id) {
      activeTopic = contents.find(c => String(c._id) === String(req.query.topic_id));
    }

    res.send(renderEnrolledCourses(currentCourse, courses, contents || [], activeTopic));
  } catch (err) {
    console.error(err);
    res.send(renderEnrolledCourses(null, [], [], null));
  }
});

router.get('/enroll/:id', (req, res) => {
  res.redirect(`/student/enrolled?course_id=${req.params.id}`);
});

// 4. Student Profile
router.get('/profile', async (req, res) => {
  try {
    const student = await getStudent(req);
    res.send(renderProfile(student || {}));
  } catch (err) {
    console.error("Profile view error:", err);
    res.send(renderProfile({}));
  }
});

// 5. Change Password
router.get('/change-password', (req, res) => {
  res.send(renderChangePassword(req.query.error || '', req.query.success || ''));
});

router.post('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return res.redirect('/student/change-password?error=New+passwords+do+not+match!');
    }

    let student = null;
    if (req.session && req.session.userId) {
      student = await User.findById(req.session.userId);
    }
    if (!student && User) {
      student = await User.findOne({ role: 'student' }).sort({ _id: -1 });
    }

    if (!student || student.password !== currentPassword.trim()) {
      return res.redirect('/student/change-password?error=Current+password+is+incorrect!');
    }

    student.password = newPassword.trim();
    await student.save();
    res.redirect('/student/change-password?success=Password+updated+successfully!');
  } catch (err) {
    res.redirect('/student/change-password?error=Failed+to+update+password.');
  }
});

module.exports = router;