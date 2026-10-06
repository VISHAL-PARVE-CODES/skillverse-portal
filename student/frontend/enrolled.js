module.exports = function(selectedCourse) {
  const currentCourseName = selectedCourse || "PHP";
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Course Content</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', sans-serif; }
    body { background-color: #121826; min-height: 100vh; display: flex; }
    .sidebar { width: 250px; background-color: #171d2b; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; position: fixed; top:0; left:0; bottom:0; padding: 25px 15px; border-right: 1px solid rgba(255,255,255,0.05); }
    .brand-section { display: flex; align-items: center; gap: 12px; padding-left: 10px; margin-bottom: 35px; color: white; font-size: 22px; font-weight: 800; }
    .sidebar-menu a { color: #94a3b8; text-decoration: none; font-size: 15px; font-weight: 600; padding: 12px 18px; border-radius: 8px; display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
    .sidebar-menu a.active { background-color: #007bff; color: white; }
    .btn-logout { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); padding: 10px; border-radius: 8px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; }
    .main-content { margin-left: 250px; flex: 1; padding: 40px; display: grid; grid-template-columns: 320px 1fr; gap: 25px; }
    .card-left, .card-right { background: white; border-radius: 14px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
    .course-select { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-weight: 600; margin-top: 10px; margin-bottom: 25px; outline: none; }
    .accordion-header { border: 1px solid #e2e8f0; padding: 12px 15px; border-radius: 6px; font-weight: 700; color: #1e293b; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; cursor: pointer; }
    .lesson-item { padding: 10px 15px; border-radius: 6px; font-size: 14px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; margin-bottom: 6px; }
    .lesson-item:hover { background: #f8fafc; }
    .lesson-item.active { background: #007bff; color: white; }
    .card-right { display: flex; flex-direction: column; justify-content: space-between; }
    .empty-state { text-align: center; margin: auto 0; }
    .progress-bar-bg { width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin-top: 12px; margin-bottom: 20px; }
    .progress-bar-fill { width: 65%; height: 100%; background: #007bff; }
    .btn-cert { background: #198754; color: white; border: none; padding: 12px 24px; border-radius: 25px; font-weight: 700; cursor: pointer; float: right; }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <div class="brand-section"><i class="fa-solid fa-graduation-cap" style="color: #007bff;"></i> SkillVerse</div>
      <nav class="sidebar-menu">
        <a href="/student/courses"><i class="fa-solid fa-book"></i> All Courses</a>
        <a href="/student/enrolled" class="active"><i class="fa-solid fa-circle-check"></i> Enrolled Courses</a>
        <a href="/student/profile"><i class="fa-solid fa-circle-user"></i> My Profile</a>
        <a href="/student/change-password"><i class="fa-solid fa-key"></i> Change Password</a>
      </nav>
    </div>
    <a href="/login" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <main class="main-content">
    <div class="card-left">
      <label style="font-size: 14px; font-weight: 700; color: #1e293b;"><i class="fa-solid fa-graduation-cap" style="color:#007bff;"></i> Current Course</label>
      <select class="course-select">
        <option selected>${currentCourseName}</option>
        <option>science</option>
        <option>.net</option>
      </select>

      <h4 style="margin-bottom: 15px; font-size: 15px; color: #1e293b;"><i class="fa-solid fa-layer-group" style="color:#007bff;"></i> Course Content</h4>
      
      <div class="accordion-header">
        <span><i class="fa-solid fa-folder-open" style="color:#007bff; margin-right:8px;"></i> Chapter-1</span>
        <i class="fa-solid fa-chevron-up"></i>
      </div>
      <div>
        <a href="#" class="lesson-item"><i class="fa-regular fa-circle-play"></i> comments</a>
        <a href="#" class="lesson-item active"><i class="fa-solid fa-circle-play"></i> Variables</a>
      </div>

      <div class="accordion-header" style="margin-top: 15px;">
        <span><i class="fa-solid fa-folder" style="color:#007bff; margin-right:8px;"></i> Chapter-2</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div class="accordion-header">
        <span><i class="fa-solid fa-folder" style="color:#007bff; margin-right:8px;"></i> Chapter-3</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>

    <div class="card-right">
      <div class="empty-state">
        <i class="fa-solid fa-book-open-reader" style="font-size: 55px; color: #007bff; margin-bottom: 20px;"></i>
        <h2 style="font-size: 28px; font-weight: 800; color: #1e293b; margin-bottom: 10px;">Select a Topic</h2>
        <p style="color: #64748b; font-size: 15px;">Click on any lesson from the left side menu to read topic notes.</p>
      </div>

      <div style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:700; color:#475569; font-size:14px;">Course Progress</span>
          <span style="background:#007bff; color:white; padding:3px 10px; border-radius:4px; font-size:12px; font-weight:700;">In Progress</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill"></div>
        </div>
        <button class="btn-cert"><i class="fa-solid fa-award"></i> Get Certificate</button>
      </div>
    </div>
  </main>
</body>
</html>
  `;
};