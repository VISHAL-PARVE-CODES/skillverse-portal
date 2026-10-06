module.exports = function(instructors) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>SkillVerse - Instructors</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', sans-serif; }
        body { background-color: #121826; min-height: 100vh; display: flex; }
        .sidebar { width: 260px; background-color: #1e2430; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; position: fixed; top: 0; left: 0; }
        .brand-section { padding: 24px 20px; font-size: 20px; font-weight: 700; color: #007bff; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
        .sidebar-menu { display: flex; flex-direction: column; gap: 6px; padding: 20px 14px; }
        .sidebar-menu a { color: #cbd5e1; text-decoration: none; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px; }
        .sidebar-menu a.active { background-color: #007bff; color: white; }
        .main-content { margin-left: 260px; flex: 1; padding: 40px; }
        .instructor-card { background: #ffffff; border-radius: 12px; padding: 35px 40px; max-width: 1000px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 10px; border-bottom: 1px solid #f1f5f9; text-align: left; }
        .badge-active { background-color: #198754; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
        .badge-inactive { background-color: #dc3545; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
        .btn-delete { background-color: #dc3545; color: white; padding: 6px 14px; border-radius: 4px; text-decoration: none; font-size: 13px; }
      </style>
    </head>
    <body>
      <aside class="sidebar">
        <div>
          <div class="brand-section"><i class="fa-solid fa-graduation-cap"></i> SkillVerse Admin</div>
          <nav class="sidebar-menu">
            <a href="/admin/dashboard"><i class="fa-solid fa-user-graduate"></i> Students</a>
            <a href="/admin/instructors" class="active"><i class="fa-solid fa-chalkboard-user"></i> Instructors</a>
            <a href="/admin/courses"><i class="fa-solid fa-book"></i> Courses</a>
            <a href="/admin/analysis"><i class="fa-solid fa-chart-line"></i> System Analysis</a>
          </nav>
        </div>
        <div style="padding: 20px 14px;"><a href="/login" style="color: #ef4444; text-decoration: none;"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></div>
      </aside>
      <main class="main-content">
        <div class="instructor-card">
          <h2 style="margin-bottom: 20px;">All Instructors (${instructors.length})</h2>
          <table>
            <thead><tr><th>#Id</th><th>Full Name</th><th>Email</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${instructors.map((ins, i) => `
                <tr>
                  <td><strong>#${4 + i}</strong></td>
                  <td style="color:#007bff; font-weight:bold;">${ins.name}</td>
                  <td>${ins.email}</td>
                  <td><span class="${i === 0 ? 'badge-inactive' : 'badge-active'}">${i === 0 ? 'Not Active' : 'Active'}</span></td>
                  <td><a href="/admin/delete-instructor/${ins._id}" class="btn-delete" onclick="return confirm('Delete?')">Delete</a></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </main>
    </body>
    </html>
  `;
};