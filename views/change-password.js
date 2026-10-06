module.exports = function() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Change Password</title>
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

    /* Right Content Form Card */
    .main-content {
      margin-left: 250px;
      flex: 1;
      padding: 40px;
    }

    .card {
      background: #ffffff;
      border-radius: 14px;
      padding: 35px 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      max-width: 580px;
    }

    .card-title {
      font-size: 22px;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 28px;
    }

    .form-group {
      margin-bottom: 20px;
    }
    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
    }
    .form-control {
      width: 100%;
      padding: 11px 14px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      border-color: #007bff;
    }

    .btn-update {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 11px 24px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.2s;
    }
    .btn-update:hover {
      background-color: #0056b3;
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
        <a href="/instructor/materials">
          <i class="fa-solid fa-file-lines"></i> Courses Materials
        </a>
        <a href="/instructor/create">
          <i class="fa-solid fa-square-plus"></i> Create New
        </a>
        <a href="/profile">
          <i class="fa-solid fa-circle-user"></i> My Profile
        </a>
        <a href="/change-password" class="active">
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

  <!-- Right Content Area -->
  <main class="main-content">
    <div class="card">
      <h2 class="card-title">
        <i class="fa-solid fa-key" style="color: #007bff;"></i> Change Password
      </h2>

      <form action="/change-password" method="POST">
        <div class="form-group">
          <label class="form-label">Current Password</label>
          <input type="password" name="currentPassword" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label">New Password</label>
          <input type="password" name="newPassword" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label">Confirm New Password</label>
          <input type="password" name="confirmPassword" class="form-control" required>
        </div>

        <button type="submit" class="btn-update">Update Password</button>
      </form>
    </div>
  </main>

</body>
</html>
  `;
};