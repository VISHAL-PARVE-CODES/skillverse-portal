const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

dotenv.config();
const app = express();

// ==========================================
// 1. MIDDLEWARES
// ==========================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session Middleware
app.use(session({
  secret: 'skillverse_secret_key_12345',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// ==========================================
// 2. MODELS IMPORT
// ==========================================
const Course = require('./models/Course');
const User = require('./models/User');

// ==========================================
// 3. VIEWS IMPORT
// ==========================================
const renderHome = require('./views/home.js');
const renderLogin = require('./views/login.js');
const renderSignup = require('./views/signup.js');

// ==========================================
// 4. MODULAR PORTALS ROUTING
// ==========================================
const adminRoutes = require('./admin/backend/adminRoutes.js');
const instructorRoutes = require('./instructor/backend/instructorRoutes.js');
const studentRoutes = require('./student/backend/studentRoutes.js');

app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes);
app.use('/student', studentRoutes);

// ==========================================
// 5. CORE APPLICATION ROUTES
// ==========================================

// --- Home Route ---
app.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(renderHome(courses));
  } catch (e) {
    res.send(renderHome([]));
  }
});

// --- Sign Up (GET) ---
app.get('/signup', (req, res) => {
  const errorMsg = req.query.error || '';
  res.send(renderSignup(errorMsg));
});

// --- Sign Up Action (POST) ---
app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, dob, username, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.redirect('/signup?error=Passwords+do+not+match!');
    }

    const cleanUser = (username || '').trim().toLowerCase();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanRole = (role || 'student').trim().toLowerCase();

    // Check duplicate username or email
    const existingUser = await User.findOne({
      $or: [{ username: cleanUser }, { email: cleanEmail }]
    });

    if (existingUser) {
      return res.redirect('/signup?error=Username+or+Email+already+registered!');
    }

    await User.create({
      name: `${firstName || ''} ${lastName || ''}`.trim(),
      email: cleanEmail,
      dob: dob || '',
      username: cleanUser,
      password: (password || '').trim(),
      role: cleanRole,
      status: 'Active'
    });

    console.log(`✅ New user registered: ${cleanUser} (${cleanRole})`);

    // Signup bante hi login page bhej do success message ke sath
    return res.redirect('/login?success=Account+created+successfully!+Please+sign+in.');

  } catch (err) {
    console.error('Signup Error:', err);
    return res.redirect('/signup?error=' + encodeURIComponent(err.message));
  }
});

// --- Login Page (GET) ---
app.get('/login', (req, res) => {
  const errorMsg = req.query.error || '';
  const successMsg = req.query.success || '';
  res.send(renderLogin(errorMsg, successMsg));
});

// --- Login Action (POST) - Fully Protected ---
app.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const cleanPass = (password || '').trim();
    const selectedRole = (role || 'student').trim().toLowerCase();
    const cleanUser = (username || '').trim();

    if (!cleanUser || !cleanPass) {
      return res.redirect('/login?error=Please+enter+both+username+and+password');
    }

    // 1. Admin Authentication
    if (selectedRole === 'admin') {
      if (cleanUser === 'admin' && cleanPass === 'admin458') {
        req.session.role = 'admin';
        return res.redirect('/admin/dashboard');
      } else {
        return res.redirect('/login?error=Invalid+Admin+credentials!');
      }
    }

    // 2. Instructor / Student Authentication (Case Insensitive Match)
    const userRegex = new RegExp(`^${cleanUser}$`, 'i');
    const roleRegex = new RegExp(`^${selectedRole}$`, 'i');

    const user = await User.findOne({
      $or: [
        { username: userRegex },
        { email: userRegex },
        { name: userRegex }
      ],
      role: roleRegex
    });

    if (!user) {
      return res.redirect(`/login?error=No+${encodeURIComponent(role)}+account+found!`);
    }

    const dbPassword = (user.password || '').trim();
    if (dbPassword !== cleanPass) {
      return res.redirect('/login?error=Incorrect+password!');
    }

    if (user.status === 'Blocked' || user.status === 'Not Active') {
      return res.redirect('/login?error=Account+is+currently+Inactive+or+Blocked!');
    }

    // Set Sessions for both styles
    req.session.userId = user._id;
    req.session.role = (user.role || '').toLowerCase();
    req.session.user = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role
    };

    console.log(`✅ Logged in successfully: ${user.username} as ${user.role}`);

    if (selectedRole === 'instructor') {
      return res.redirect('/instructor/courses');
    } else {
      return res.redirect('/student/courses');
    }

  } catch (err) {
    console.error('❌ Detailed Login Error:', err);
    return res.redirect('/login?error=An+error+occurred+during+login.');
  }
});

// --- Logout ---
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login?success=Logged+out+successfully!');
  });
});

// ==========================================
// 6. AUTO SEED DEFAULT ACCOUNTS
// ==========================================
async function seedDefaultUsers() {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@skillverse.com',
        dob: '2000-01-01',
        username: 'admin',
        password: 'admin458',
        role: 'admin',
        status: 'Active'
      });
      console.log('👑 Default Admin created: admin / admin458');
    }

    const instructorExists = await User.findOne({ username: 'instructor' });
    if (!instructorExists) {
      await User.create({
        name: 'Lead Instructor',
        email: 'instructor@skillverse.com',
        dob: '1995-01-01',
        username: 'instructor',
        password: 'instructor123',
        role: 'instructor',
        status: 'Active'
      });
      console.log('👨‍🏫 Default Instructor created: instructor / instructor123');
    }
  } catch (err) {
    console.error('Error seeding users:', err.message);
  }
}

// ==========================================
// 7. DATABASE & SERVER LAUNCH
// ==========================================
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://parvevishal091_db_user:DsiljeI9bwGkJjYp@cluster0.nmp2h9d.mongodb.net/skillverse?retryWrites=true&w=majority&appName=Cluster0';

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Server LIVE on http://localhost:${PORT}`);
  console.log(`=================================`);
});

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas Cloud!');
    seedDefaultUsers();
  })
  .catch((err) => console.error('❌ MongoDB Atlas Connection Error:', err.message));