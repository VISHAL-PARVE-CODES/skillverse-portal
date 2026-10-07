module.exports = function() {
  return '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
'  <meta charset="UTF-8">' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'  <title>SkillVerse - Learn & Grow</title>' +
'  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">' +
'  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">' +
'  <style>' +
'    * { margin: 0; padding: 0; box-sizing: border-box; font-family: "Plus Jakarta Sans", sans-serif; }' +
'    body { background-color: #06080e; color: #f8fafc; overflow-x: hidden; min-height: 100vh; background-image: radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 20%, rgba(6, 182, 212, 0.16) 0%, transparent 45%); background-attachment: fixed; }' +
'    .navbar { height: 74px; padding: 0 6%; display: flex; justify-content: space-between; align-items: center; background: rgba(11, 15, 25, 0.75); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); position: sticky; top: 0; z-index: 1000; }' +
'    .brand-logo { font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; gap: 10px; text-decoration: none; }' +
'    .brand-logo i { -webkit-text-fill-color: initial; color: #10b981; }' +
'    .nav-actions { display: flex; align-items: center; gap: 24px; }' +
'    .nav-link { color: #94a3b8; text-decoration: none; font-weight: 600; font-size: 14.5px; }' +
'    .nav-link:hover, .nav-link.active { color: #ffffff; }' +
'    .btn-signup { background: linear-gradient(135deg, #059669 0%, #0891b2 100%); color: #ffffff; padding: 9px 24px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 18px rgba(16, 185, 129, 0.35); }' +
'    .hero-container { position: relative; height: 380px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 20px; overflow: hidden; }' +
'    .hero-bg-overlay { position: absolute; inset: 0; background: url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600") center/cover no-repeat; filter: brightness(0.22); z-index: 1; }' +
'    .hero-content { position: relative; z-index: 2; max-width: 820px; }' +
'    .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: #34d399; border-radius: 30px; font-size: 13px; font-weight: 700; margin-bottom: 18px; }' +
'    .hero-title { font-size: 42px; font-weight: 800; line-height: 1.2; margin-bottom: 14px; background: linear-gradient(180deg, #ffffff 40%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }' +
'    .hero-subtitle { color: #94a3b8; font-size: 16px; max-width: 600px; margin: 0 auto; }' +
'    .feature-ribbon-wrapper { max-width: 1040px; margin: -45px auto 60px auto; padding: 0 20px; position: relative; z-index: 10; }' +
'    .feature-ribbon { background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 26px 34px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65); display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }' +
'    .ribbon-item { display: flex; align-items: center; gap: 16px; }' +
'    .ribbon-item:not(:last-child) { border-right: 1px solid rgba(255, 255, 255, 0.08); }' +
'    .ribbon-icon-box { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }' +
'    .icon-blue { background: rgba(6, 182, 212, 0.14); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3); }' +
'    .icon-green { background: rgba(16, 185, 129, 0.14); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }' +
'    .icon-orange { background: rgba(245, 158, 11, 0.14); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }' +
'    .ribbon-text h4 { font-size: 15.5px; font-weight: 700; color: #f1f5f9; margin-bottom: 3px; }' +
'    .ribbon-text p { font-size: 13px; color: #94a3b8; }' +
'    .section-container { max-width: 1040px; margin: 0 auto 90px auto; padding: 0 20px; text-align: center; }' +
'    .section-title { font-size: 34px; font-weight: 800; margin-bottom: 12px; background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }' +
'    .section-description { color: #94a3b8; font-size: 15px; max-width: 640px; margin: 0 auto 45px auto; }' +
'    .cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; text-align: left; }' +
'    .role-card { background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 22px; padding: 36px 32px; transition: transform 0.3s ease; }' +
'    .role-card:hover { transform: translateY(-5px); border-color: rgba(255, 255, 255, 0.2); }' +
'    .role-icon-box { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px; }' +
'    .role-title { font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 10px; }' +
'    .role-desc { color: #94a3b8; font-size: 14.5px; line-height: 1.6; margin-bottom: 20px; }' +
'    .role-features { list-style: none; display: flex; flex-direction: column; gap: 10px; }' +
'    .role-features li { display: flex; align-items: center; gap: 10px; color: #cbd5e1; font-size: 14px; }' +
'    .role-features li i { color: #10b981; font-size: 13px; }' +
'    @media(max-width: 868px) { .feature-ribbon, .cards-grid { grid-template-columns: 1fr; } .ribbon-item:not(:last-child) { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px; } }' +
'  </style>' +
'</head>' +
'<body>' +
'  <header class="navbar">' +
'    <a href="/" class="brand-logo"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>' +
'    <nav class="nav-actions">' +
'      <a href="/" class="nav-link active">Home</a>' +
'      <a href="/login" class="nav-link">Login</a>' +
'      <a href="/signup" class="btn-signup">Sign Up</a>' +
'    </nav>' +
'  </header>' +
'  <section class="hero-container">' +
'    <div class="hero-bg-overlay"></div>' +
'    <div class="hero-content">' +
'      <span class="hero-badge"><i class="fa-solid fa-sparkles"></i> Next-Gen Learning Platform</span>' +
'      <h1 class="hero-title">Empower Your Future with Industry Skills</h1>' +
'      <p class="hero-subtitle">Interactive courses, hands-on chapters, and direct guidance designed to build real-world confidence.</p>' +
'    </div>' +
'  </section>' +
'  <div class="feature-ribbon-wrapper">' +
'    <div class="feature-ribbon">' +
'      <div class="ribbon-item">' +
'        <div class="ribbon-icon-box icon-blue"><i class="fa-solid fa-book-open"></i></div>' +
'        <div class="ribbon-text"><h4>All Free Courses</h4><p>No subscription or hidden fees</p></div>' +
'      </div>' +
'      <div class="ribbon-item">' +
'        <div class="ribbon-icon-box icon-green"><i class="fa-solid fa-chalkboard-user"></i></div>' +
'        <div class="ribbon-text"><h4>Expert Guidance</h4><p>Structured lessons & exercises</p></div>' +
'      </div>' +
'      <div class="ribbon-item">' +
'        <div class="ribbon-icon-box icon-orange"><i class="fa-solid fa-chart-line"></i></div>' +
'        <div class="ribbon-text"><h4>Skill Progress</h4><p>Track your personal growth</p></div>' +
'      </div>' +
'    </div>' +
'  </div>' +
'  <section class="section-container">' +
'    <h2 class="section-title">Why Choose SkillVerse?</h2>' +
'    <p class="section-description">Where knowledge meets accessibility. Our platform provides interactive tools for learners and instructors to build a solid foundation.</p>' +
'    <div class="cards-grid">' +
'      <div class="role-card">' +
'        <div class="role-icon-box icon-blue"><i class="fa-solid fa-graduation-cap"></i></div>' +
'        <h3 class="role-title">For Learners</h3>' +
'        <p class="role-desc">Step into structured roadmaps, video lessons, and interactive quizzes built to accelerate your tech career.</p>' +
'        <ul class="role-features">' +
'          <li><i class="fa-solid fa-check"></i> High-definition video lectures</li>' +
'          <li><i class="fa-solid fa-check"></i> Chapter-wise progress tracking</li>' +
'          <li><i class="fa-solid fa-check"></i> Completely free resource access</li>' +
'        </ul>' +
'      </div>' +
'      <div class="role-card">' +
'        <div class="role-icon-box icon-green"><i class="fa-solid fa-users-gear"></i></div>' +
'        <h3 class="role-title">For Instructors</h3>' +
'        <p class="role-desc">Effortlessly design courses, organize syllabus modules, upload video content, and mentor students worldwide.</p>' +
'        <ul class="role-features">' +
'          <li><i class="fa-solid fa-check"></i> Intuitive course & chapter builder</li>' +
'          <li><i class="fa-solid fa-check"></i> Rich markdown & video content editor</li>' +
'          <li><i class="fa-solid fa-check"></i> Dedicated instructor profile analytics</li>' +
'        </ul>' +
'      </div>' +
'    </div>' +
'  </section>' +
'</body>' +
'</html>';
};