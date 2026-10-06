module.exports = function(courses) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Learn & Grow Online</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      background-color: #f8fafc;
      color: #333333;
      overflow-x: hidden;
    }

    /* 1. Black Top Navbar */
    .header-nav {
      background-color: #1a1e24;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      text-decoration: none;
      letter-spacing: -0.5px;
    }
    .nav-right-group {
      display: flex;
      align-items: center;
      gap: 25px;
    }
    .nav-right-group a {
      color: #cbd5e1;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-right-group a:hover {
      color: #ffffff;
    }
    .btn-signup-pill {
      background-color: #007bff;
      color: #ffffff !important;
      padding: 8px 22px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 14.5px;
    }

    /* 2. Hero Background Banner */
    .hero-banner {
      background: linear-gradient(rgba(18, 24, 38, 0.85), rgba(18, 24, 38, 0.85)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop');
      background-size: cover;
      background-position: center;
      height: 180px;
      position: relative;
      border-bottom: 3px solid #007bff;
    }

    /* 3. Floating 3-Column White Highlight Card */
    .highlight-card-wrapper {
      max-width: 1050px;
      margin: -45px auto 50px;
      position: relative;
      z-index: 10;
      padding: 0 20px;
    }
    .highlight-card {
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 24px 10px;
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    .highlight-col {
      padding: 0 20px;
    }
    .highlight-col:not(:last-child) {
      border-right: 1px solid #e2e8f0;
    }
    .highlight-title {
      font-size: 16.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .text-blue { color: #007bff; }
    .text-green { color: #198754; }
    .text-yellow { color: #ffc107; }
    
    .highlight-desc {
      font-size: 13.5px;
      color: #64748b;
    }

    /* 4. "Why Choose SkillVerse?" Section */
    .section-intro {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 45px;
      padding: 0 20px;
    }
    .section-intro h2 {
      font-size: 34px;
      font-weight: 800;
      color: #007bff;
      margin-bottom: 12px;
    }
    .section-intro p {
      font-size: 15.5px;
      color: #64748b;
      line-height: 1.6;
    }

    /* 5. Lower Double Card Grid */
    .container {
      max-width: 1050px;
      margin: 0 auto 60px;
      padding: 0 20px;
    }
    .overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 50px;
    }
    .overview-card {
      background: #ffffff;
      border-radius: 10px;
      padding: 35px 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
      border: 1px solid #edf2f7;
    }
    .overview-icon {
      font-size: 36px;
      margin-bottom: 15px;
    }
    .overview-card h3 {
      font-size: 22px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 14px;
    }
    .overview-card p {
      font-size: 14.5px;
      color: #64748b;
      line-height: 1.6;
    }

    /* 6. Courses Grid */
    .courses-heading {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 22px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
    }
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 22px;
    }
    .course-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 22px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.03);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .course-card h4 {
      font-size: 18px;
      color: #1e293b;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f1f5f9;
      padding-top: 15px;
      margin-top: 15px;
    }
    .course-price {
      font-size: 18px;
      font-weight: 700;
      color: #007bff;
    }
    .btn-enroll {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 7px 16px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <!-- Top Dark Navbar -->
  <header class="header-nav">
    <a href="/" class="brand-title">SkillVerse</a>
    <div class="nav-right-group">
      <a href="/">Home</a>
      <a href="/login">Login</a>
      <a href="/login" class="btn-signup-pill">Sign Up</a>
    </div>
  </header>

  <!-- Hero Banner Strip -->
  <section class="hero-banner"></section>

  <!-- Floating 3-Column Box (PHP Exact Match) -->
  <div class="highlight-card-wrapper">
    <div class="highlight-card">
      <div class="highlight-col">
        <div class="highlight-title text-blue">
          <i class="fa-solid fa-book-open"></i> All Free Courses
        </div>
        <div class="highlight-desc">No Subscription or Hidden Fees</div>
      </div>
      
      <div class="highlight-col">
        <div class="highlight-title text-green">
          <i class="fa-solid fa-chalkboard-user"></i> Expert Guidance
        </div>
        <div class="highlight-desc">Structured Lessons & Exercises</div>
      </div>
      
      <div class="highlight-col">
        <div class="highlight-title text-yellow">
          <i class="fa-solid fa-certificate"></i> Skill Progress
        </div>
        <div class="highlight-desc">Track Your Personal Growth</div>
      </div>
    </div>
  </div>

  <!-- "Why Choose SkillVerse?" Centered Section -->
  <section class="section-intro">
    <h2>Why Choose SkillVerse?</h2>
    <p>Where knowledge meets accessibility. Our platform provides interactive tools for learners and instructors to build a solid foundation.</p>
  </section>

  <!-- Lower Double Cards & Courses -->
  <main class="container">
    <div class="overview-grid">
      <!-- For Learners Card -->
      <div class="overview-card">
        <div class="overview-icon text-blue">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <h3>For Learners</h3>
        <p>Embark on your learning journey with ease. Browse through a diverse range of subjects, enroll instantly, and track your progress in real-time.</p>
      </div>

      <!-- For Instructors Card -->
      <div class="overview-card">
        <div class="overview-icon text-green">
          <i class="fa-solid fa-chalkboard-user"></i>
        </div>
        <h3>For Instructors</h3>
        <p>Shape the future of education by creating captivating courses. Utilize intuitive tools for content creation, quiz management, and student feedback.</p>
      </div>
    </div>

    <!-- Available Courses Grid -->
    <h3 class="courses-heading">Available Courses</h3>
    <div class="courses-grid">
      ${courses && courses.length > 0 ? courses.map(c => `
        <div class="course-card">
          <div>
            <h4>${c.title}</h4>
            <p style="font-size: 13.5px; color: #64748b; margin-bottom: 8px;">Instructor: ${c.instructor}</p>
            <p style="font-size: 14px; color: #475569;">${c.description || ''}</p>
          </div>
          <div class="card-footer">
            <span class="course-price">₹${c.price}</span>
            <button class="btn-enroll">Enroll Now</button>
          </div>
        </div>
      `).join('') : '<p style="color: #64748b;">No courses available right now.</p>'}
    </div>
  </main>

</body>
</html>
  `;
};