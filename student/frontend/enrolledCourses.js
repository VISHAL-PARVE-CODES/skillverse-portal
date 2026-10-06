module.exports = function(currentCourse, allEnrolledCourses = [], contents = [], activeTopic = null) {
  const chapters = {};
  contents.forEach(item => {
    const chName = item.chapter || 'ch1';
    if (!chapters[chName]) chapters[chName] = [];
    chapters[chName].push(item);
  });

  let videoEmbedHtml = '';
  if (activeTopic && activeTopic.videoUrl) {
    const embedUrl = String(activeTopic.videoUrl).replace('watch?v=', 'embed/');
    videoEmbedHtml = '<p style="margin-bottom:15px;"><iframe width="100%" height="340" src="' + embedUrl + '" frameborder="0" allowfullscreen style="border-radius:12px;"></iframe></p>';
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Enrolled Courses</title>
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
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
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
    .nav-links a:hover { background: rgba(255, 255, 255, 0.05); color: #fff; transform: translateX(4px); }
    .nav-links a.active {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: #fff; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .btn-logout {
      background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 12px; border-radius: 12px; text-align: center; text-decoration: none;
      font-weight: 700; font-size: 13.5px; display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .main-wrapper { margin-left: 280px; flex: 1; padding: 30px 40px; display: flex; gap: 24px; align-items: flex-start; }
    .glass-card {
      background: rgba(15, 23, 36, 0.65); backdrop-filter: blur(20px);
      border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.07);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .nav-card { width: 340px; padding: 24px; flex-shrink: 0; }
    .section-title { font-size: 13.5px; font-weight: 700; color: #f8fafc; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .course-select {
      width: 100%; padding: 11px 14px; border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px; font-size: 14px; font-weight: 600; outline: none; margin-bottom: 25px;
      cursor: pointer; color: #f8fafc; background: rgba(0, 0, 0, 0.35);
    }
    .chapter-box { border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
    .chapter-header { background: rgba(255, 255, 255, 0.03); padding: 12px 14px; font-weight: 700; font-size: 13.5px; color: #34d399; display: flex; justify-content: space-between; align-items: center; }
    .topic-list { background: transparent; padding: 6px 8px 10px 8px; }
    .topic-link { display: flex; align-items: center; gap: 10px; padding: 9px 12px; text-decoration: none; color: #94a3b8; font-size: 13.5px; border-radius: 8px; font-weight: 500; transition: 0.2s; }
    .topic-link:hover, .topic-link.active { background: rgba(16, 185, 129, 0.12); color: #34d399; }
    .topic-link i { color: #06b6d4; font-size: 14px; }
    .content-card { flex: 1; min-height: 520px; padding: 35px 40px; display: flex; flex-direction: column; justify-content: space-between; }
    .placeholder-area { display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto 0; text-align: center; }
    .placeholder-icon { font-size: 48px; color: #10b981; margin-bottom: 16px; }
    .placeholder-title { font-size: 24px; font-weight: 800; color: #f8fafc; margin-bottom: 8px; }
    .placeholder-sub { color: #94a3b8; font-size: 14px; }
    .progress-section { border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 25px; margin-top: 30px; }
    .progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 13.5px; font-weight: 600; color: #94a3b8; }
    .badge-status { background-color: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
    .progress-track { width: 100%; height: 7px; background-color: rgba(255, 255, 255, 0.08); border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
    .progress-fill { width: 45%; height: 100%; background: linear-gradient(90deg, #10b981, #06b6d4); border-radius: 10px; }
    .btn-cert {
      float: right; background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: white; border: none; padding: 11px 22px; border-radius: 10px; font-size: 14px;
      font-weight: 700; display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
    }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <a href="/student/courses" class="brand-title"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
      <nav class="nav-links">
        <a href="/student/courses"><i class="fa-solid fa-book"></i> All Courses</a>
        <a href="/student/enrolled" class="active"><i class="fa-solid fa-circle-check"></i> Enrolled Courses</a>
        <a href="/student/profile"><i class="fa-solid fa-circle-user"></i> My Profile</a>
        <a href="/student/change-password"><i class="fa-solid fa-key"></i> Change Password</a>
      </nav>
    </div>
    <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <main class="main-wrapper">
    <div class="glass-card nav-card">
      <div class="section-title"><i class="fa-solid fa-graduation-cap" style="color: #10b981;"></i> Current Course</div>
      <select class="course-select" onchange="location = this.value;">
        ${allEnrolledCourses.map(c => `
          <option value="/student/enrolled?course_id=${c._id}" ${currentCourse && String(c._id) === String(currentCourse._id) ? 'selected' : ''}>${c.title}
          </option>
        `).join('')}
      </select>

      <div class="section-title"><i class="fa-solid fa-layer-group" style="color: #06b6d4;"></i> Course Content</div>
      
      ${Object.keys(chapters).length === 0 ? `
        <div class="chapter-box">
          <div class="chapter-header"><span><i class="fa-solid fa-folder"></i> ch1</span></div>
          <div class="topic-list"><span class="topic-link"><i class="fa-solid fa-circle-play"></i> No topics yet</span></div>
        </div>
      ` : Object.entries(chapters).map(([chTitle, topics]) => `
        <div class="chapter-box">
          <div class="chapter-header">
            <span><i class="fa-solid fa-folder"></i> ${chTitle}</span>
            <i class="fa-solid fa-chevron-up" style="color: #10b981;"></i>
          </div>
          <div class="topic-list">
            ${topics.map(t => `
              <a href="/student/enrolled?course_id=${currentCourse ? currentCourse._id : ''}&topic_id=${t._id}" class="topic-link ${activeTopic && String(activeTopic._id) === String(t._id) ? 'active' : ''}">
                <i class="fa-solid fa-circle-play"></i> ${t.title || t.topic}
              </a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="glass-card content-card">
      ${activeTopic ? `
        <div>
          <h2 style="font-size:22px; font-weight:800; margin-bottom: 14px; color:#f8fafc;">${activeTopic.title || activeTopic.topic}</h2>
          <div style="color: #cbd5e1; font-size: 15px; line-height: 1.7;">
            ${videoEmbedHtml}
            <div>${activeTopic.content || 'Content for this lesson will appear here.'}</div>
          </div>
        </div>
      ` : `
        <div class="placeholder-area">
          <div class="placeholder-icon"><i class="fa-solid fa-book-open"></i></div>
          <h2 class="placeholder-title">Select a Topic</h2>
          <p class="placeholder-sub">Click on any lesson from the left side menu to read topic notes.</p>
        </div>
      `}

      <div class="progress-section">
        <div class="progress-header"><span>Course Progress</span><span class="badge-status">In Progress</span></div>
        <div class="progress-track"><div class="progress-fill"></div></div>
        <div style="overflow: hidden;">
          <button type="button" class="btn-cert" onclick="alert('Course is in progress. Complete all topics to generate certificate!')">
            <i class="fa-solid fa-certificate"></i> Get Certificate
          </button>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
  `;
};