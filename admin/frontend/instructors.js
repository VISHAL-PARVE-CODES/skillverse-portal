module.exports = function(instructors) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Instructors</title>
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

    /* Main Content */
    .main-content { margin-left: 250px; flex: 1; padding: 40px; }
    .card { background: white; border-radius: 12px; padding: 35px 40px; max-width: 1080px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }

    .btn-add-inst { background: #007bff; color: white; text-decoration: none; padding: 9px 20px; border-radius: 20px; font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
    .btn-add-inst:hover { background: #0056b3; }

    /* Table Styles */
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; font-size: 15px; font-weight: 700; color: #1e293b; padding: 14px 10px; border-bottom: 2px solid #e2e8f0; }
    td { padding: 16px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; font-size: 14.5px; }

    .badge-active { background-color: #198754; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 700; }
    .badge-inactive { background-color: #dc3545; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 700; }

    .action-group { display: flex; align-items: center; gap: 8px; }
    .btn-block { background-color: #ffc107; color: black; padding: 6px 14px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 700; }
    .btn-unblock { background-color: #198754; color: white; padding: 6px 14px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 700; }
    .btn-delete { background-color: #dc3545; color: white; padding: 6px 14px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 700; }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <div class="brand-section"><i class="fa-solid fa-graduation-cap" style="color:#007bff; font-size:26px;"></i> SkillVerse<br>Admin</div>
      <nav class="sidebar-menu">
        <a href="/admin/dashboard"><i class="fa-solid fa-user-graduate"></i> Students</a>
        <a href="/admin/instructors" class="active"><i class="fa-solid fa-chalkboard-user"></i> Instructors</a>
        <a href="/admin/courses"><i class="fa-solid fa-book"></i> Courses</a>
        <a href="/admin/analysis"><i class="fa-solid fa-chart-line"></i> System Analysis</a>
      </nav>
    </div>
    <a href="/login" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <main class="main-content">
    <div class="card">
      <div class="card-header">
        <h2 style="font-size: 24px; font-weight: 800; color: #1e293b;">All Instructors (${instructors ? instructors.length : 0})</h2>
        <a href="/admin/add-instructor" class="btn-add-inst">
          <i class="fa-solid fa-plus"></i> Add Instructor
        </a>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 10%;">#Id</th>
            <th style="width: 25%;">Full Name</th>
            <th style="width: 35%;">Email</th>
            <th style="width: 15%;">Status</th>
            <th style="width: 15%;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${instructors && instructors.length > 0 ? instructors.map((ins, i) => {
            const isNotActive = ins.status === 'Blocked' || ins.status === 'Not Active';
            return `
              <tr>
                <td style="color:#64748b; font-weight:600;">#${4 + i}</td>
                <td>
                  <a href="#" style="color:#007bff; font-weight:700; text-decoration:none; display:flex; align-items:center; gap:8px;">
                    <i class="fa-solid fa-chalkboard-user"></i> ${ins.name}
                  </a>
                </td>
                <td style="color:#64748b;">${ins.email}</td>
                <td>
                  <span class="${isNotActive ? 'badge-inactive' : 'badge-active'}">
                    ${isNotActive ? 'Not Active' : 'Active'}
                  </span>
                </td>
                <td>
                  <div class="action-group">
                    <a href="/admin/toggle-block-instructor/${ins._id}" class="${isNotActive ? 'btn-unblock' : 'btn-block'}">
                      ${isNotActive ? 'Unblock' : 'Block'}
                    </a>
                    <a href="/admin/delete-instructor/${ins._id}" class="btn-delete" onclick="return confirm('Delete this instructor?')">Delete</a>
                  </div>
                </td>
              </tr>
            `;
          }).join('') : '<tr><td colspan="5" style="text-align:center; padding:20px; color:#64748b;">No instructors found</td></tr>'}
        </tbody>
      </table>
    </div>
  </main>
</body>
</html>
  `;
};