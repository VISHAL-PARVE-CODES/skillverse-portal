const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  chapterId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  topicId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  chapter: {
    type: String,
    default: 'ch1'
  },
  topic: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  videoUrl: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

module.exports = mongoose.model('CourseContent', courseContentSchema);