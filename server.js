const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Middleware (PHP ke session_start() jaisa)
app.use(session({
  secret: 'skillverse_secret_key_12345',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 din tak login rahega
}));

// Models
const Course = require('./models/Course');
const User = require('./models/User');

// Landing Views
const renderHome = require('./views/home.js');
const renderLogin = require('./views/login.js');
const renderSignup = require('./views/signup.js');

// Modular Portals
const adminRoutes = require('./admin/backend/adminRoutes.js');
const instructorRoutes = require('./instructor/backend/instructorRoutes.js');
const studentRoutes = require('./student/backend/studentRoutes.js');

// Mount Portals
app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes);
app.use('/student', studentRoutes);

// Home Route
app.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(renderHome(courses));
  } catch (e) {
    res.send(renderHome([]));
  }
});

// Login Page
app.get('/login', (req, res) => {
  const successMsg = req.query.success || '';
  const errorMsg = req.query.error || '';
  res.send(renderLogin(errorMsg, successMsg));
});

// Signup Page
app.get('/signup', (req, res) => {
  const errorMsg = req.query.error || '';
  res.send(renderSignup(errorMsg));
});

// POST /signup (Dynamic User Save + Auto Session Set)
app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, dob, username, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.redirect('/signup?error=Passwords+do+not+match!');
    }

    const cleanUser = (username || '').trim().toLowerCase();
    const cleanEmail = (email || '').trim().toLowerCase();

    // Check duplicate
    const existingUser = await User.findOne({
      $or: [{ username: cleanUser }, { email: cleanEmail }]
    });

    if (existingUser) {
      return res.redirect('/signup?error=Username+or+Email+already+registered!');
    }

    // Insert new user into MongoDB
    const newUser = await User.create({
      firstName: (firstName || '').trim(),
      lastName: (lastName || '').trim(),
      name: `${firstName || ''} ${lastName || ''}`.trim(),
      email: cleanEmail,
      dob: dob || '',
      username: cleanUser,
      password: (password || '').trim(),
      role: role || 'student',
      status: 'Active'
    });

    // Signup hote hi current user ka ID session me save
    req.session.userId = newUser._id;
    req.session.role = newUser.role;

    if (newUser.role === 'student') {
      return res.redirect('/student/profile');
    } else {
      return res.redirect('/instructor/courses');
    }

  } catch (err) {
    console.error("Signup Error:", err);
    return res.redirect('/signup?error=' + encodeURIComponent(err.message));
  }
});

// Logout (Session Destroy)
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login?success=Logged+out+successfully!');
  });
});

// POST /login (Session Set on Login)
app.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  const cleanPass = (password || '').trim();

  // 1. Admin Authentication
  if (role === 'admin') {
    if (username === 'admin' && cleanPass === 'admin458') {
      req.session.role = 'admin';
      return res.redirect('/admin/dashboard');
    }
    return res.redirect('/login?error=Invalid+Admin+Credentials!');
  }

  // 2. Instructor / Student Authentication
  try {
    const cleanUser = (username || '').trim();
    const userRegex = new RegExp(`^${cleanUser}$`, 'i');

    const user = await User.findOne({
      $or: [
        { username: userRegex },
        { email: userRegex },
        { name: userRegex }
      ],
      role: role
    });

    if (!user) {
      return res.redirect(`/login?error=No+${role}+account+found!`);
    }

    if (user.password.trim() !== cleanPass) {
      return res.redirect('/login?error=Incorrect+password!');
    }

    if (user.status === 'Blocked' || user.status === 'Not Active') {
      return res.redirect('/login?error=Account+is+currently+Inactive+or+Blocked!');
    }

    // Login hone wale user ka ID session me save
    req.session.userId = user._id;
    req.session.role = user.role;

    if (role === 'instructor') {
      return res.redirect('/instructor/courses');
    } else {
      return res.redirect('/student/courses');
    }

  } catch (err) {
    console.error("Login Error:", err);
    return res.redirect('/login?error=An+error+occurred+during+login.');
  }
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillverse';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 Server LIVE on http://localhost:${PORT}`);
  console.log(`========================================`);
 const MONGO_URI = 'mongodb+srv://parvevishal091_db_user:DsiljeI9bwGkJjYp@cluster0.nmp2h9d.mongodb.net/skillverse?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas Cloud!'))
  .catch((err) => console.error('❌ MongoDB Atlas Connection Error:', err));
});