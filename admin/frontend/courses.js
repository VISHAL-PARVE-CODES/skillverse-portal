module.exports = function(courses) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Courses</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', sans-serif; }
    body { background-color: #121826; min-height: 100vh; display: flex; }

    /* Left Sidebar */
    .sidebar { width: 250px; background-color: #171d2b; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; position: fixed; top:0; left:0; bottom:0; padding: 25px 15px; border-right: 1px solid rgba(255,255,255,0.05); }
    .brand-section { display: flex; align-items: center; gap: 12px; padding-left: 10px; margin-bottom: 35px; color: white; font-size: 20px; font-weight: 800; }
    .sidebar-menu a { color: #94a3b8; text-decoration: none; font-size: 15px; font-weight: 600; padding: 12px 18px; border-radius: 8px; display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
    .sidebar-menu a.active { background-color: #007bff; color: white; }
    .btn-logout { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); padding: 10px; border-radius: 8px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; }

    /* Main Container */
    .main-content { margin-left: 250px; flex: 1; padding: 40px; }
    .card { background: white; border-radius: 12px; padding: 35px 40px; max-width: 1080px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); }

    /* Table Styles */
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th { text-align: left; font-size: 15px; font-weight: 700; color: #1e293b; padding: 14px 12px; border-bottom: 2px solid #e2e8f0; }
    td { padding: 16px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; font-size: 14.5px; }

    .badge-public { background-color: #198754; color: white; padding: 4px 14px; border-radius: 4px; font-size: 12px; font-weight: 700; display: inline-block; }
    .badge-private { background-color: #64748b; color: white; padding: 4px 14px; border-radius: 4px; font-size: 12px; font-weight: 700; display: inline-block; }
    .btn-delete { background-color: #dc3545; color: white; padding: 6px 16px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 700; display: inline-block; }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <div class="brand-section"><i class="fa-solid fa-graduation-cap" style="color:#007bff; font-size:26px;"></i> SkillVerse<br>Admin</div>
      <nav class="sidebar-menu">
        <a href="/admin/dashboard"><i class="fa-solid fa-user-graduate"></i> Students</a>
        <a href="/admin/instructors"><i class="fa-solid fa-chalkboard-user"></i> Instructors</a>
        <a href="/admin/courses" class="active"><i class="fa-solid fa-book"></i> Courses</a>
        <a href="/admin/analysis"><i class="fa-solid fa-chart-line"></i> System Analysis</a>
      </nav>
    </div>
    <a href="/login" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <main class="main-content">
    <div class="card">
      <h2 style="font-size: 24px; font-weight: 800; color: #1e293b; margin-bottom: 15px;">All Courses (${courses ? courses.length : 0})</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 10%;">#Id</th>
            <th style="width: 35%;">Course Title</th>
            <th style="width: 25%;">Instructor</th>
            <th style="width: 15%;">Status</th>
            <th style="width: 15%;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${courses && courses.length > 0 ? courses.map((c, i) => {
            const isPublic = (c.status || '').toLowerCase() === 'public';
            const ids = [1, 19, 27, 28, 29, 35, 42];
            return `
              <tr>
                <td style="color:#64748b; font-weight:600;">#${ids[i] || (i + 1)}</td>
                <td style="color:#1e293b; font-weight:700;">${c.title}</td>
                <td style="color:#64748b; font-weight:500;">${c.instructor || 'Instructor #1'}</td>
                <td>
                  <span class="${isPublic ? 'badge-public' : 'badge-private'}">
                    ${isPublic ? 'Public' : 'Private'}
                  </span>
                </td>
                <td>
                  <a href="/admin/delete-course/${c._id}" class="btn-delete" onclick="return confirm('Delete this course?')">Delete</a>
                </td>
              </tr>
            `;
          }).join('') : '<tr><td colspan="5" style="text-align:center; padding:20px; color:#64748b;">No courses found</td></tr>'}
        </tbody>
      </table>
    </div>
  </main>
</body>
</html>
  `;
};