const express = require('express');
const router = express.Router();

// Models
let User, Course, Chapter, CourseContent;
try {
  User = require('../../models/User');
  Course = require('../../models/Course');
  Chapter = require('../../models/Chapter');
  CourseContent = require('../../models/CourseContent');
} catch (err) {
  console.error("Models loading warning:", err.message);
}

// Frontend Views
const renderMyCourses = require('../frontend/myCourses');
const renderCreateCourse = require('../frontend/createCourse');
const renderChaptersTopics = require('../frontend/chaptersTopics');
const renderContentAdd = require('../frontend/contentAdd');
const renderContentEditor = require('../frontend/contentEditor');
const renderProfile = require('../frontend/profile');
const renderChangePassword = require('../frontend/changePassword');

// Helper: Active Instructor fetch karne ke liye
async function getInstructor(req) {
  if (req.session && req.session.userId && User) {
    const instructor = await User.findById(req.session.userId);
    if (instructor) return instructor;
  }
  if (User) {
    return await User.findOne({ role: 'instructor' }).sort({ _id: -1 });
  }
  return null;
}

// 1. My Courses (/instructor/courses)
router.get('/courses', async (req, res) => {
  try {
    const courses = Course ? await Course.find().sort({ _id: -1 }).lean() : [];
    res.send(renderMyCourses(courses));
  } catch (err) {
    console.error("Error fetching instructor courses:", err);
    res.send(renderMyCourses([]));
  }
});

// 2. Create Course (/instructor/create-course)
router.get('/create-course', (req, res) => {
  res.send(renderCreateCourse(req.query.error || '', req.query.success || ''));
});

router.post('/create-course', async (req, res) => {
  try {
    const { title, description, price, thumbnail } = req.body;
    const instructor = await getInstructor(req);

    if (Course) {
      await Course.create({
        title,
        description,
        price: Number(price) || 0,
        thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400',
        instructor: instructor ? (instructor.name || instructor.firstName) : 'Instructor'
      });
    }
    res.redirect('/instructor/courses');
  } catch (err) {
    console.error("Error creating course:", err);
    res.redirect('/instructor/create-course?error=Failed+to+create+course');
  }
});

// 3. Chapters & Topics (/instructor/chapters-topics)
router.get('/chapters-topics', async (req, res) => {
  try {
    const courses = Course ? await Course.find().lean() : [];
    if (!courses || courses.length === 0) {
      return res.send(renderChaptersTopics([], null, []));
    }

    const courseId = req.query.course_id || courses[0]._id;
    const selectedCourse = courses.find(c => String(c._id) === String(courseId)) || courses[0];

    const chapters = Chapter ? await Chapter.find({ courseId: selectedCourse._id }).lean() : [];
    res.send(renderChaptersTopics(courses, selectedCourse, chapters, req.query.error || '', req.query.success || ''));
  } catch (err) {
    console.error("Chapters topics error:", err);
    res.send(renderChaptersTopics([], null, []));
  }
});

// Add Chapter
router.post('/add-chapter', async (req, res) => {
  try {
    const { courseId, chapterTitle } = req.body;
    if (Chapter && courseId && chapterTitle) {
      await Chapter.create({
        courseId,
        name: chapterTitle.trim(),
        count: 0
      });
    }
    res.redirect(`/instructor/chapters-topics?course_id=${courseId}&success=Chapter+Added`);
  } catch (err) {
    res.redirect('/instructor/chapters-topics?error=Failed+to+add+chapter');
  }
});

// Add Topic
router.post('/add-topic', async (req, res) => {
  try {
    const { courseId, chapter, topicTitle } = req.body;
    if (CourseContent && courseId && chapter && topicTitle) {
      await CourseContent.create({
        courseId,
        chapter,
        title: topicTitle.trim(),
        topic: topicTitle.trim(),
        content: '',
        videoUrl: ''
      });

      if (Chapter) {
        await Chapter.updateOne({ courseId, name: chapter }, { $inc: { count: 1 } });
      }
    }
    res.redirect(`/instructor/chapters-topics?course_id=${courseId}&success=Topic+Added`);
  } catch (err) {
    res.redirect('/instructor/chapters-topics?error=Failed+to+add+topic');
  }
});

// Delete Chapter
router.get('/delete-chapter/:id', async (req, res) => {
  try {
    if (Chapter) {
      await Chapter.findByIdAndDelete(req.params.id);
    }
    res.redirect('/instructor/chapters-topics?success=Chapter+Deleted');
  } catch (err) {
    res.redirect('/instructor/chapters-topics');
  }
});

// 4. Content Add Selection (/instructor/content-add)
router.get('/content-add', async (req, res) => {
  try {
    const courses = Course ? await Course.find().lean() : [];
    const selectedCourseId = req.query.course_id || (courses[0] ? courses[0]._id : '');
    
    let chapters = [];
    if (selectedCourseId && Chapter) {
      chapters = await Chapter.find({ courseId: selectedCourseId }).lean();
    }

    const selectedChapter = req.query.chapter || (chapters[0] ? chapters[0].name : '');
    let topics = [];
    if (selectedCourseId && selectedChapter && CourseContent) {
      topics = await CourseContent.find({ courseId: selectedCourseId, chapter: selectedChapter }).lean();
    }

    res.send(renderContentAdd(courses, chapters, topics, selectedCourseId, selectedChapter));
  } catch (err) {
    console.error("Content add route error:", err);
    res.send(renderContentAdd([], [], [], '', ''));
  }
});

// 5. Content Editor View & Save (/instructor/content-editor)
router.get('/content-editor', async (req, res) => {
  try {
    const { course_id, chapter, topic_id } = req.query;
    const allTopics = CourseContent ? await CourseContent.find({ courseId: course_id, chapter }).lean() : [];
    const currentTopic = allTopics.find(t => String(t._id) === String(topic_id)) || allTopics[0] || {};

    res.send(renderContentEditor(currentTopic, allTopics, course_id, chapter));
  } catch (err) {
    res.redirect('/instructor/content-add');
  }
});

router.post('/content-save', async (req, res) => {
  try {
    const { topicId, videoUrl, content } = req.body;
    if (CourseContent && topicId) {
      await CourseContent.findByIdAndUpdate(topicId, {
        videoUrl: videoUrl || '',
        content: content || ''
      });
    }
    res.redirect('/instructor/content-add?success=Content+Saved');
  } catch (err) {
    res.redirect('/instructor/content-add');
  }
});

// 6. Instructor Profile (/instructor/profile)
router.get('/profile', async (req, res) => {
  try {
    const instructor = await getInstructor(req);
    res.send(renderProfile(instructor || {}, req.query.error || '', req.query.success || ''));
  } catch (err) {
    console.error("Profile view error:", err);
    res.send(renderProfile({}));
  }
});

// 7. Edit Profile Handler (First Name, Last Name, Email, DOB Save)
router.post('/update-profile', async (req, res) => {
  try {
    const { firstName, lastName, email, dob } = req.body;
    let instructor = await getInstructor(req);

    if (instructor) {
      instructor.firstName = firstName ? firstName.trim() : instructor.firstName;
      instructor.lastName = lastName ? lastName.trim() : instructor.lastName;
      instructor.name = `${instructor.firstName} ${instructor.lastName}`.trim();
      
      if (email) {
        instructor.email = email.trim();
      }
      if (dob) {
        instructor.dob = dob;
      }

      await instructor.save();
    }
    res.redirect('/instructor/profile?success=Profile+Updated');
  } catch (err) {
    console.error("Profile update error:", err);
    res.redirect('/instructor/profile?error=Failed+to+update+profile');
  }
});

// 8. Update Profile Picture Placeholder
router.post('/update-profile-pic', async (req, res) => {
  try {
    res.redirect('/instructor/profile?success=Picture+Updated');
  } catch (err) {
    res.redirect('/instructor/profile');
  }
});

// 9. Change Password (/instructor/change-password)
router.get('/change-password', (req, res) => {
  res.send(renderChangePassword(req.query.error || '', req.query.success || ''));
});

router.post('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return res.redirect('/instructor/change-password?error=New+passwords+do+not+match!');
    }

    const instructor = await getInstructor(req);
    if (!instructor || instructor.password !== currentPassword.trim()) {
      return res.redirect('/instructor/change-password?error=Current+password+is+incorrect!');
    }

    instructor.password = newPassword.trim();
    await instructor.save();
    res.redirect('/instructor/change-password?success=Password+updated+successfully!');
  } catch (err) {
    res.redirect('/instructor/change-password?error=Failed+to+update+password.');
  }
});

module.exports = router;