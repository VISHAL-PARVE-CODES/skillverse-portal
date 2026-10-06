module.exports = function(courses = []) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - All Courses</title>
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
    .main-wrapper { margin-left: 280px; flex: 1; padding: 30px 40px 40px 20px; min-width: 0; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .page-title { font-size: 24px; font-weight: 800; display: flex; align-items: center; gap: 12px; }
    .badge-count {
      background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 700;
    }
    .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 24px; }
    .course-card {
      background: rgba(15, 23, 36, 0.65); backdrop-filter: blur(20px);
      border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.07);
      overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      display: flex; flex-direction: column; transition: 0.3s ease;
    }
    .course-card:hover { transform: translateY(-5px); border-color: rgba(16, 185, 129, 0.4); }
    .card-img { height: 165px; width: 100%; object-fit: cover; background: #1e293b; }
    .card-body { padding: 22px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .card-title { font-size: 18px; font-weight: 700; color: #f8fafc; margin-bottom: 8px; }
    .card-desc { font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 20px; }
    .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 15px; }
    .price-tag { color: #34d399; font-weight: 800; font-size: 14px; }
    .btn-view {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: white; padding: 8px 16px; border-radius: 12px; font-size: 12.5px; font-weight: 700;
      text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
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
    <div class="page-header">
      <h1 class="page-title"><i class="fa-solid fa-book" style="color: #10b981;"></i> Explore All Courses</h1>
      <span class="badge-count">${courses.length} Available</span>
    </div>

    <div class="courses-grid">
      ${courses.length > 0 ? courses.map((c, i) => `
        <div class="course-card">
          <img src="${c.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400'}" class="card-img" alt="Cover">
          <div class="card-body">
            <div>
              <h3 class="card-title">${c.title}</h3>
              <p class="card-desc">${c.description || (c.title + ' comprehensive learning track.')}</p>
            </div>
            <div class="card-footer">
              <span class="price-tag">${c.price ? '₹' + c.price : 'Free'}</span>
              <a href="/student/course-details/${c._id}" class="btn-view">View Course &rarr;</a>
            </div>
          </div>
        </div>
      `).join('') : '<p style="color:#64748b;">No courses available right now.</p>'}
    </div>
  </main>
</body>
</html>
  `;
};