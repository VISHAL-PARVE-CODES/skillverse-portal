module.exports = function(errorMsg = '', successMsg = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Instructor Change Password</title>
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
      padding: 40px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-width: 0;
    }

    .card {
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      width: 100%;
      max-width: 480px;
      padding: 35px 30px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }

    .form-group { margin-bottom: 18px; }
    label { display: block; font-size: 13px; font-weight: 600; color: #94a3b8; margin-bottom: 6px; }
    .form-control {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      background: rgba(0, 0, 0, 0.35);
      color: #f8fafc;
      transition: all 0.2s;
    }
    .form-control:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
    }

    .toggle-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      margin-bottom: 22px;
      cursor: pointer;
      user-select: none;
    }
    .toggle-group input[type="checkbox"] { width: 16px; height: 16px; accent-color: #10b981; cursor: pointer; }
    .toggle-group span { font-size: 13px; color: #94a3b8; font-weight: 600; }

    .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: white;
      border: none;
      padding: 12px;
      border-radius: 12px;
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
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
        <a href="/instructor/chapters-topics"><i class="fa-solid fa-layer-group"></i> Chapters & Topics</a>
        <a href="/instructor/content-add"><i class="fa-solid fa-video"></i> Add Content</a>
        <a href="/instructor/profile"><i class="fa-solid fa-circle-user"></i> My Profile</a>
        <a href="/instructor/change-password" class="active"><i class="fa-solid fa-key"></i> Change Password</a>
      </nav>
    </div>
    <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <main class="main-wrapper">
    <div class="card">
      <h2 style="font-size:22px; font-weight:800; margin-bottom:6px; color:#f8fafc;"><i class="fa-solid fa-lock" style="color:#10b981;"></i> Change Password</h2>
      <p style="color:#94a3b8; font-size:13px; margin-bottom:20px;">Update instructor account password</p>

      ${errorMsg ? `<div class="alert alert-danger">${errorMsg}</div>` : ''}
      ${successMsg ? `<div class="alert alert-success">${successMsg}</div>` : ''}

      <form action="/instructor/change-password" method="POST">
        <div class="form-group">
          <label>Current Password</label>
          <input type="password" id="curPwdIns" name="currentPassword" class="form-control" placeholder="Enter current password" required>
        </div>
        <div class="form-group">
          <label>New Password</label>
          <input type="password" id="newPwdIns" name="newPassword" class="form-control" placeholder="Enter new password" required>
        </div>
        <div class="form-group">
          <label>Confirm New Password</label>
          <input type="password" id="cnfPwdIns" name="confirmPassword" class="form-control" placeholder="Re-enter new password" required>
        </div>

        <label class="toggle-group">
          <input type="checkbox" onchange="togglePasswordsIns(this.checked)">
          <span>Show Password</span>
        </label>

        <button type="submit" class="btn-submit">Update Password</button>
      </form>
    </div>
  </main>

  <script>
    function togglePasswordsIns(isChecked) {
      const type = isChecked ? 'text' : 'password';
      document.getElementById('curPwdIns').type = type;
      document.getElementById('newPwdIns').type = type;
      document.getElementById('cnfPwdIns').type = type;
    }
  </script>
</body>
</html>
  `;
};