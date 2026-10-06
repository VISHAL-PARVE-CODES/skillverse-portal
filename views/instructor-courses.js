module.exports = function(courses) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Your Courses</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      background-color: #121826;
      min-height: 100vh;
      display: flex;
    }

    /* Left Sidebar */
    .sidebar {
      width: 250px;
      background-color: #171d2b;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      padding: 25px 15px;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 10px;
      margin-bottom: 35px;
    }
    .brand-icon {
      font-size: 28px;
      color: #007bff;
    }
    .brand-text {
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
    }

    .sidebar-menu {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sidebar-menu a {
      color: #94a3b8;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      padding: 12px 18px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 14px;
      transition: all 0.2s;
    }
    .sidebar-menu a:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }
    .sidebar-menu a.active {
      background-color: #007bff;
      color: #ffffff;
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.2s;
    }
    .btn-logout:hover {
      background: #ef4444;
      color: #ffffff;
    }

    /* Right Main Content Area */
    .main-content {
      margin-left: 250px;
      flex: 1;
      padding: 40px;
    }

    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 35px 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      max-width: 1050px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
    .title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .card-title {
      font-size: 24px;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .badge-count {
      background-color: #007bff;
      color: white;
      font-size: 13px;
      font-weight: 700;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .btn-add-course {
      background-color: #007bff;
      color: white;
      text-decoration: none;
      padding: 9px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background-color 0.2s;
    }
    .btn-add-course:hover {
      background-color: #0056b3;
    }

    /* Table Styles */
    .courses-table {
      width: 100%;
      border-collapse: collapse;
    }
    .courses-table th {
      text-align: left;
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      padding: 14px 12px;
      border-bottom: 2px solid #e2e8f0;
    }
    .courses-table td {
      padding: 16px 12px;
      font-size: 14.5px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
    }
    .courses-table tr:hover {
      background-color: #fafbfc;
    }

    .id-col {
      color: #64748b;
      font-weight: 600;
    }
    .course-title-cell {
      color: #1e293b;
      font-weight: 600;
    }

    /* Status Badges */
    .badge-public {
      background-color: #198754;
      color: white;
      padding: 4px 14px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      display: inline-block;
    }
    .badge-private {
      background-color: #64748b;
      color: white;
      padding: 4px 14px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 700;
      display: inline-block;
    }

    /* Action Buttons */
    .btn-action-private {
      background-color: #ffc107;
      color: #000000;
      padding: 6px 18px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      display: inline-block;
      transition: background-color 0.2s;
    }
    .btn-action-private:hover {
      background-color: #e0a800;
    }

    .btn-action-public {
      background-color: #198754;
      color: white;
      padding: 6px 18px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      display: inline-block;
      transition: background-color 0.2s;
    }
    .btn-action-public:hover {
      background-color: #157347;
    }
  </style>
</head>
<body>

  <!-- Left Sidebar -->
  <aside class="sidebar">
    <div>
      <div class="brand-section">
        <i class="fa-solid fa-graduation-cap brand-icon"></i>
        <span class="brand-text">SkillVerse</span>
      </div>
      
      <nav class="sidebar-menu">
        <a href="/instructor/courses" class="active">
          <i class="fa-solid fa-book"></i> Your Courses
        </a>
        <a href="/instructor/materials">
          <i class="fa-solid fa-file-lines"></i> Courses Materials
        </a>
        <a href="/instructor/create">
          <i class="fa-solid fa-square-plus"></i> Create New
        </a>
        <a href="/profile">
          <i class="fa-solid fa-circle-user"></i> My Profile
        </a>
        <a href="/change-password">
          <i class="fa-solid fa-key"></i> Change Password
        </a>
      </nav>
    </div>

    <div>
      <a href="/login" class="btn-logout">
        <i class="fa-solid fa-right-from-bracket"></i> Logout
      </a>
    </div>
  </aside>

  <!-- Right Content -->
  <main class="main-content">
    <div class="card">
      <div class="card-header">
        <div class="title-group">
          <h2 class="card-title">
            <i class="fa-solid fa-book" style="color: #007bff;"></i> Your Courses
          </h2>
          <span class="badge-count">${courses.length}</span>
        </div>
        <a href="/instructor/create" class="btn-add-course">
          <i class="fa-solid fa-plus"></i> Add New Course
        </a>
      </div>

      <table class="courses-table">
        <thead>
          <tr>
            <th style="width: 15%;">#Id</th>
            <th style="width: 45%;">Course Title</th>
            <th style="width: 20%;">Status</th>
            <th style="width: 20%;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${courses && courses.length > 0 ? courses.map((c, index) => {
            const isPublic = c.status !== 'private';
            return `
              <tr>
                <td class="id-col">#${28 + index}</td>
                <td class="course-title-cell">${c.title}</td>
                <td>
                  <span class="${isPublic ? 'badge-public' : 'badge-private'}">
                    ${isPublic ? 'Public' : 'Private'}
                  </span>
                </td>
                <td>
                  <a href="/instructor/toggle-course/${c._id}" class="${isPublic ? 'btn-action-private' : 'btn-action-public'}">
                    ${isPublic ? 'Private' : 'Public'}
                  </a>
                </td>
              </tr>
            `;
          }).join('') : `
            <tr>
              <td colspan="4" style="text-align: center; color: #64748b; padding: 25px;">No courses created yet.</td>
            </tr>
          `}
        </tbody>
      </table>
    </div>
  </main>

</body>
</html>
  `;
};