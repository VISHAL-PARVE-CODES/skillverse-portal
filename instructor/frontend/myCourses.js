module.exports = function(courses = []) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Instructor Courses</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family: system-ui, -apple-system, sans-serif; }
    html, body { min-height: 100vh; width: 100%; overflow-x: hidden; }

    /* 🌌 Pitch Obsidian + Emerald Cyber Orbs Theme */
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

    /* 💎 Floating Glass Sidebar */
    .sidebar {
      width: 255px;
      height: calc(100vh - 32px);
      background: rgba(11, 15, 22, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 20px;
      margin: 16px 0 16px 16px;
      padding: 28px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
    }

    .brand-title {
      font-size: 22px;
      font-weight: 800;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      padding-left: 8px;
      margin-bottom: 25px;
    }
    .brand-title i { -webkit-text-fill-color: initial; color: #10b981; }

    .nav-links { list-style: none; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .nav-links a {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 600;
      border-radius: 12px;
      transition: all 0.25s ease;
      border: 1px solid transparent;
    }
    .nav-links a:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      transform: translateX(4px);
    }
    .nav-links a.active {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: #ffffff;
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 12px;
      border-radius: 12px;
      text-align: center;
      text-decoration: none;
      font-weight: 700;
      font-size: 13.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    /* Content Area */
    .main-wrapper {
      margin-left: 280px;
      flex: 1;
      padding: 30px 40px 40px 20px;
      min-width: 0;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .page-title {
      font-size: 24px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 12px;
      color: #f8fafc;
    }

    .btn-create {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: white;
      padding: 10px 22px;
      border-radius: 12px;
      font-size: 13.5px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
      transition: all 0.2s ease;
    }
    .btn-create:hover {
      opacity: 0.95;
      transform: translateY(-2px);
    }

    /* 💎 Dark Glass Courses Grid */
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 24px;
    }

    .course-card {
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }
    .course-card:hover {
      transform: translateY(-5px);
      border-color: rgba(16, 185, 129, 0.4);
      box-shadow: 0 25px 45px rgba(16, 185, 129, 0.12);
    }

    .card-img {
      height: 165px;
      width: 100%;
      object-fit: cover;
      background: #1e293b;
    }

    .card-body {
      padding: 22px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 8px;
    }

    .card-desc {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 15px;
    }

    .price-tag {
      color: #34d399;
      font-weight: 800;
      font-size: 14.5px;
    }

    .btn-manage {
      color: #38bdf8;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: 0.2s;
    }
    .btn-manage:hover {
      color: #7dd3fc;
      transform: translateX(3px);
    }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <div>
      <a href="/instructor/courses" class="brand-title"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
      <nav class="nav-links">
        <a href="/instructor/courses" class="active"><i class="fa-solid fa-table-cells-large"></i> My Courses</a>
        <a href="/instructor/create-course"><i class="fa-solid fa-square-plus"></i> Create Course</a>
        <a href="/instructor/chapters-topics"><i class="fa-solid fa-layer-group"></i> Chapters & Topics</a>
        <a href="/instructor/content-add"><i class="fa-solid fa-video"></i> Add Content</a>
        <a href="/instructor/profile"><i class="fa-solid fa-circle-user"></i> My Profile</a>
        <a href="/instructor/change-password"><i class="fa-solid fa-key"></i> Change Password</a>
      </nav>
    </div>
    <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <!-- Main View -->
  <main class="main-wrapper">
    <div class="page-header">
      <div>
        <h1 class="page-title"><i class="fa-solid fa-table-cells-large" style="color: #10b981;"></i> My Courses</h1>
        <p style="color: #94a3b8; font-size: 13.5px; margin-top: 4px;">Manage courses created by you</p>
      </div>
      <a href="/instructor/create-course" class="btn-create"><i class="fa-solid fa-plus"></i> Create Course</a>
    </div>

    <div class="courses-grid">
      ${courses.length > 0 ? courses.map(c => `
        <div class="course-card">
          <img src="${c.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400'}" class="card-img" alt="Cover">
          <div class="card-body">
            <div>
              <h3 class="card-title">${c.title}</h3>
              <p class="card-desc">${c.description || 'Course description'}</p>
            </div>
            <div class="card-footer">
              <span class="price-tag">${c.price ? '₹' + c.price : 'Free'}</span>
              <a href="/instructor/chapters-topics?course_id=${c._id}" class="btn-manage">Manage Syllabus &rarr;</a>
            </div>
          </div>
        </div>
      `).join('') : '<p style="color:#64748b;">No courses created yet.</p>'}
    </div>
  </main>
</body>
</html>
  `;
};