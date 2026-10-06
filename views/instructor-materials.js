module.exports = function(courses) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Courses Materials</title>
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
    .card-title {
      font-size: 24px;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-add-content {
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
    .btn-add-content:hover {
      background-color: #0056b3;
    }

    /* Table Styles */
    .materials-table {
      width: 100%;
      border-collapse: collapse;
    }
    .materials-table th {
      text-align: left;
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      padding: 14px 12px;
      border-bottom: 2px solid #e2e8f0;
    }
    .materials-table td {
      padding: 16px 12px;
      font-size: 14.5px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: middle;
    }
    .materials-table tr:hover {
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

    .action-group {
      display: flex;
      gap: 8px;
    }

    /* Action Buttons */
    .btn-action-add {
      background-color: #198754;
      color: white;
      padding: 6px 16px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: background-color 0.2s;
    }
    .btn-action-add:hover {
      background-color: #157347;
    }

    .btn-action-edit {
      background-color: #ffc107;
      color: #000000;
      padding: 6px 16px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: background-color 0.2s;
    }
    .btn-action-edit:hover {
      background-color: #e0a800;
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
        <a href="/instructor/courses">
          <i class="fa-solid fa-book"></i> Your Courses
        </a>
        <a href="/instructor/materials" class="active">
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
        <h2 class="card-title">
          <i class="fa-solid fa-layer-group" style="color: #007bff;"></i> Courses Materials & Contents
        </h2>
        <a href="/instructor/create" class="btn-add-content">
          <i class="fa-solid fa-plus"></i> Add Course Content
        </a>
      </div>

      <table class="materials-table">
        <thead>
          <tr>
            <th style="width: 20%;">#Course ID</th>
            <th style="width: 55%;">Course Title</th>
            <th style="width: 25%;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${courses && courses.length > 0 ? courses.map((c, index) => `
            <tr>
              <td class="id-col">#${28 + index}</td>
              <td class="course-title-cell">${c.title}</td>
              <td>
                <div class="action-group">
                  <a href="#" class="btn-action-add"><i class="fa-solid fa-plus"></i> Add</a>
                  <a href="#" class="btn-action-edit"><i class="fa-solid fa-pen"></i> Edit</a>
                </div>
              </td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="3" style="text-align: center; color: #64748b; padding: 25px;">No course materials found.</td>
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