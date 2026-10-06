module.exports = function(course, contents = [], isEnrolled = false) {
  const chapters = {};
  contents.forEach(item => {
    const chName = item.chapter || 'Chapter 1: Getting Started';
    if (!chapters[chName]) chapters[chName] = [];
    chapters[chName].push(item);
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${course.title} - SkillVerse</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family: system-ui, -apple-system, sans-serif; }
    html, body { min-height: 100vh; width: 100%; }
    body {
      background-color: #06080b;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.22) 0%, transparent 45%),
        radial-gradient(circle at 90% 15%, rgba(6, 182, 212, 0.20) 0%, transparent 40%),
        radial-gradient(circle at 50% 90%, rgba(99, 102, 241, 0.18) 0%, transparent 50%);
      background-attachment: fixed;
      background-size: cover;
      color: #f1f5f9;
      display: flex;
    }
    .sidebar {
      width: 255px; height: calc(100vh - 32px);
      background: rgba(11, 15, 22, 0.75);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 20px; margin: 16px 0 16px 16px; padding: 28px 18px;
      display: flex; flex-direction: column; justify-content: space-between;
      position: fixed; top: 0; left: 0; z-index: 100;
    }
    .brand-title {
      font-size: 22px; font-weight: 800;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      display: flex; align-items: center; gap: 12px; text-decoration: none; padding-left: 8px; margin-bottom: 25px;
    }
    .brand-title i { -webkit-text-fill-color: initial; color: #10b981; }
    .nav-links { list-style: none; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .nav-links a {
      display: flex; align-items: center; gap: 14px; padding: 12px 16px;
      color: #94a3b8; text-decoration: none; font-size: 13.5px; font-weight: 600;
      border-radius: 12px; transition: 0.25s ease;
    }
    .nav-links a:hover, .nav-links a.active {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: #fff;
    }
    .btn-logout {
      background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 12px; border-radius: 12px; text-align: center; text-decoration: none;
      font-weight: 700; font-size: 13.5px; display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .main-wrapper { margin-left: 280px; flex: 1; padding: 30px 40px; display: flex; gap: 26px; align-items: flex-start; }
    .glass-card {
      background: rgba(15, 23, 36, 0.65); backdrop-filter: blur(20px);
      border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.07);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); padding: 30px;
    }
    .details-box { flex: 1; max-width: 680px; }
    .banner-img { width: 100%; height: 260px; object-fit: cover; border-radius: 14px; margin-bottom: 22px; }
    .course-title { font-size: 26px; font-weight: 800; color: #f8fafc; margin-bottom: 8px; }
    .course-desc { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 26px; }
    .ch-box { border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
    .ch-header { background: rgba(255, 255, 255, 0.03); padding: 14px 18px; font-weight: 700; font-size: 14px; color: #34d399; }
    .topic-row { padding: 12px 18px; display: flex; justify-content: space-between; font-size: 13.5px; color: #cbd5e1; border-top: 1px solid rgba(255, 255, 255, 0.04); }
    .enroll-card { width: 320px; flex-shrink: 0; }
    .btn-action {
      width: 100%; color: white; border: none; padding: 13px; border-radius: 12px;
      font-size: 14.5px; font-weight: 700; display: flex; align-items: center; justify-content: center;
      gap: 8px; cursor: pointer; text-decoration: none; margin-top: 20px;
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
    }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <a href="/student/courses" class="brand-title"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
      <nav class="nav-links">
        <a href="/student/courses" class="active"><i class="fa-solid fa-book"></i> All Courses</a>
        <a href="/student/enrolled"><i class="fa-solid fa-circle-check"></i> Enrolled Courses</a>
        <a href="/student/profile"><i class="fa-solid fa-circle-user"></i> My Profile</a>
        <a href="/student/change-password"><i class="fa-solid fa-key"></i> Change Password</a>
      </nav>
    </div>
    <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <main class="main-wrapper">
    <div class="glass-card details-box">
      <img src="${course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600'}" class="banner-img">
      <h1 class="course-title">${course.title}</h1>
      <p class="course-desc">${course.description || 'Course description'}</p>

      <h3 style="font-size:16px; margin-bottom:15px; color:#f8fafc;"><i class="fa-solid fa-list-check" style="color:#10b981;"></i> Course Curriculum</h3>
      ${Object.entries(chapters).map(([chTitle, topics]) => `
        <div class="ch-box">
          <div class="ch-header"><i class="fa-regular fa-folder-open"></i> ${chTitle}</div>${topics.map(t => `<div class="topic-row"><span><i class="fa-regular fa-circle-play" style="color:#06b6d4;"></i> ${t.title || t.topic}</span><span style="color:#64748b; font-size:12px;">Lesson</span></div>`).join('')}
        </div>
      `).join('')}
    </div>

    <div class="glass-card enroll-card">
      <h3 style="font-size:18px; margin-bottom:15px;">Enrollment</h3>
      <p style="color:#94a3b8; font-size:13px; margin-bottom:6px;">Instructor</p>
      <h4 style="color:#f8fafc; font-size:15px; margin-bottom:15px;">${course.instructor || 'Instructor'}</h4>
      <p style="color:#94a3b8; font-size:13px; margin-bottom:6px;">Price</p>
      <span style="background:rgba(16,185,129,0.15); color:#34d399; border:1px solid rgba(16,185,129,0.3); padding:4px 12px; border-radius:20px; font-weight:700; font-size:13px;">${course.price ? '₹' + course.price : 'Free'}</span>

      ${isEnrolled ? `
        <a href="/student/enrolled?course_id=${course._id}" class="btn-action"><i class="fa-solid fa-play"></i> Continue Learning</a>
      ` : `
        <a href="/student/enroll/${course._id}" class="btn-action"><i class="fa-solid fa-user-plus"></i> Enroll Now</a>
      `}
    </div>
  </main>
</body>
</html>
  `;
};