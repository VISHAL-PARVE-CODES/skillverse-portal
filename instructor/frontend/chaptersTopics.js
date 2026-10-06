module.exports = function(courses = [], selectedCourse = null, chaptersList = [], errorMsg = '', successMsg = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Chapters & Topics</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family: system-ui, -apple-system, sans-serif; }
    html, body { min-height: 100vh; width: 100%; overflow-x: hidden; }

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
    .nav-links a:hover { background: rgba(255, 255, 255, 0.05); color: #fff; transform: translateX(4px); }
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

    .main-wrapper {
      margin-left: 280px;
      flex: 1;
      padding: 30px 40px;
      min-width: 0;
    }

    .top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .btn-upload {
      background: linear-gradient(135deg, #0284c7 0%, #0891b2 100%);
      color: white;
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 13.5px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
    }

    .cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 30px;
    }

    .glass-card {
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      padding: 26px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }

    .form-group { margin-bottom: 16px; }
    label { display: block; font-size: 13px; font-weight: 600; color: #94a3b8; margin-bottom: 6px; }
    .form-control {
      width: 100%;
      padding: 11px 14px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      background: rgba(0, 0, 0, 0.35);
      color: #f8fafc;
    }
    .form-control:focus { border-color: #10b981; }

    .btn-emerald {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
    }

    .btn-cyan {
      background: linear-gradient(135deg, #0284c7 0%, #0891b2 100%);
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(14, 165, 233, 0.35);
    }

    .ch-item {
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .alert { padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 18px; font-weight: 600; }
    .alert-danger { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .alert-success { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <a href="/instructor/courses" class="brand-title"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
      <nav class="nav-links">
        <a href="/instructor/courses"><i class="fa-solid fa-table-cells-large"></i> My Courses</a>
        <a href="/instructor/create-course"><i class="fa-solid fa-square-plus"></i> Create Course</a>
        <a href="/instructor/chapters-topics" class="active"><i class="fa-solid fa-layer-group"></i> Chapters & Topics</a>
        <a href="/instructor/content-add"><i class="fa-solid fa-video"></i> Add Content</a>
        <a href="/instructor/profile"><i class="fa-solid fa-circle-user"></i> My Profile</a>
        <a href="/instructor/change-password"><i class="fa-solid fa-key"></i> Change Password</a>
      </nav>
    </div>
    <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <main class="main-wrapper">
    <div class="top-header">
      <div>
        <h1 style="font-size:24px; font-weight:800; color:#f8fafc;"><i class="fa-solid fa-layer-group" style="color:#10b981;"></i> Chapters & Topics</h1>
        <p style="color:#94a3b8; font-size:13.5px; margin-top:4px;">Organize chapters and lessons syllabus</p>
      </div>
      <a href="/instructor/content-add" class="btn-upload"><i class="fa-solid fa-video"></i> Go to Content Upload</a>
    </div>

    ${errorMsg ? `<div class="alert alert-danger">${errorMsg}</div>` : ''}
    ${successMsg ? `<div class="alert alert-success">${successMsg}</div>` : ''}

    <div class="cards-grid">
      <!-- 1. Add Chapter -->
      <div class="glass-card">
        <h3 style="font-size:16px; margin-bottom:16px; color:#34d399;"><i class="fa-solid fa-square-plus"></i> 1. Add Chapter</h3>
        <form action="/instructor/add-chapter" method="POST">
          <div class="form-group">
            <label>Select Course</label>
            <select name="courseId" class="form-control" onchange="location = '/instructor/chapters-topics?course_id=' + this.value;">
              ${courses.map(c => `<option value="${c._id}" ${selectedCourse && String(c._id) === String(selectedCourse._id) ? 'selected' : ''}>${c.title}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Chapter Name</label>
            <input type="text" name="chapterTitle" class="form-control" placeholder="e.g. Chapter 1: Introduction" required>
          </div>
          <button type="submit" class="btn-emerald">+ Add Chapter</button>
        </form>
      </div>

      <!-- 2. Add Topic -->
      <div class="glass-card">
        <h3 style="font-size:16px; margin-bottom:16px; color:#22d3ee;"><i class="fa-solid fa-folder-plus"></i> 2. Add Topic</h3>
        <form action="/instructor/add-topic" method="POST">
          <div class="form-group">
            <label>Select Course</label>
            <select name="courseId" class="form-control">
              ${courses.map(c => `<option value="${c._id}" ${selectedCourse && String(c._id) === String(selectedCourse._id) ? 'selected' : ''}>${c.title}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Select Chapter</label>
            <select name="chapter" class="form-control">
              ${chaptersList.length > 0 ? chaptersList.map(ch => `<option value="${ch.name}">${ch.name}</option>`).join('') : '<option value="ch1">ch1</option>'}
            </select>
          </div>
          <div class="form-group">
            <label>Topic Title</label>
            <input type="text" name="topicTitle" class="form-control" placeholder="e.g. State & Effects" required>
          </div>
          <button type="submit" class="btn-cyan">+ Add Topic</button>
        </form>
      </div>
    </div>

    <!-- Existing Chapters Preview -->
    <div class="glass-card">
      <h3 style="font-size:17px; margin-bottom:18px; color:#f8fafc;"><i class="fa-solid fa-list-check" style="color:#06b6d4;"></i> Existing Chapters</h3>
      ${chaptersList.length > 0 ? chaptersList.map(ch => `
        <div class="ch-item">
          <div><i class="fa-regular fa-folder" style="color:#34d399; margin-right:8px;"></i> <b>${ch.name}</b> <span style="font-size:12px; color:#94a3b8; margin-left:8px;">(${ch.count || 0} topics)</span></div>
          <a href="/instructor/delete-chapter/${ch._id}" style="color:#f87171;"><i class="fa-solid fa-trash-can"></i></a>
        </div>
      `).join('') : '<p style="color:#94a3b8;">No chapters created for this course yet.</p>'}
    </div>
  </main>
</body>
</html>
  `;
};