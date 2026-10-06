module.exports = function(user = {}) {
  const firstName = user.firstName || (user.name ? user.name.split(' ')[0] : 'mousee');
  const lastName = user.lastName || (user.name ? user.name.split(' ').slice(1).join(' ') : 'you');
  const username = user.username || (user.email ? user.email.split('@')[0] : 'mousee123');
  const email = user.email || 'mmjjgg34@gmail.com';
  const dob = user.dob || '2026-11-28';
  const profilePic = user.profilePic || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Student Profile</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
    html, body { min-height: 100vh; width: 100%; overflow-x: hidden; }

    /* 🌌 Pitch Obsidian + Emerald Cyber Orbs Theme */
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

    /* 💎 Floating Glass Sidebar */
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
    .nav-links a:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      transform: translateX(4px);
    }
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
      gap: 10px;
    }

    /* Content Layout */
    .main-wrapper {
      margin-left: 280px;
      flex: 1;
      padding: 40px;
      display: flex;
      gap: 30px;
      justify-content: center;
      align-items: flex-start;
      min-width: 0;
    }

    /* 💎 Left Profile Card */
    .profile-card {
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      width: 340px;
      padding: 35px 25px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      text-align: center;
      flex-shrink: 0;
    }

    .avatar-wrapper {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.1);
      margin: 0 auto 16px auto;
      overflow: hidden;
      border: 3px solid #10b981;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.25);
    }
    .avatar-wrapper img { width: 100%; height: 100%; object-fit: cover; }

    .profile-name { font-size: 22px; font-weight: 800; color: #f8fafc; margin-bottom: 4px; }
    .profile-username { color: #94a3b8; font-size: 13px; margin-bottom: 12px; }

    .badge-role {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 4px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 25px;
    }

    .action-btn-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px; }
    .btn-edit {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      padding: 10px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 700;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: 0.2s;
    }
    .btn-edit:hover { background: rgba(16, 185, 129, 0.2); }

    .btn-pwd {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      padding: 10px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 600;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: 0.2s;
    }
    .btn-pwd:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }

    .upload-section { border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 20px; text-align: left; }
    .upload-label { font-size: 12px; font-weight: 600; color: #94a3b8; margin-bottom: 8px; display: block; }
    .file-input-wrapper {
      display: flex;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 12px;
      background: rgba(0, 0, 0, 0.25);
    }
    .file-input-wrapper input[type="file"] { width: 100%; font-size: 12px; padding: 8px 10px; color: #94a3b8; outline: none; }
    .btn-change-pic {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: white;
      border: none;
      padding: 10px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    /* 💎 Right Account Information Card */
    .info-card {
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      flex: 1;
      max-width: 680px;
      padding: 35px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }

    .info-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .info-header h2 { font-size: 18px; font-weight: 800; color: #f8fafc; display: flex; align-items: center; gap: 8px; }

    .details-table { width: 100%; border-collapse: collapse; }
    .details-table tr { border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
    .details-table tr:last-child { border-bottom: none; }
    .details-table td { padding: 18px 8px; font-size: 14px; }
    .label-col { width: 35%; color: #94a3b8; font-weight: 600; }
    .val-col { color: #f8fafc; font-weight: 700; }
    .val-col.link-highlight { color: #06b6d4; }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <div>
      <a href="/student/courses" class="brand-title"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
      <nav class="nav-links">
        <a href="/student/courses"><i class="fa-solid fa-book"></i> All Courses</a>
        <a href="/student/enrolled"><i class="fa-solid fa-circle-check"></i> Enrolled Courses</a>
        <a href="/student/profile" class="active"><i class="fa-solid fa-circle-user"></i> My Profile</a>
        <a href="/student/change-password"><i class="fa-solid fa-key"></i> Change Password</a>
      </nav>
    </div>
    <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <!-- Main View -->
  <main class="main-wrapper">
    <!-- Left Card -->
    <div class="profile-card">
      <div class="avatar-wrapper">
        <img src="${profilePic}" alt="Avatar">
      </div>
      <h2 class="profile-name">${firstName} ${lastName}</h2>
      <p class="profile-username">@${username}</p>
      <div>
        <span class="badge-role"><i class="fa-solid fa-graduation-cap"></i> Student</span>
      </div>

      <div class="action-btn-group">
        <a href="#" class="btn-edit"><i class="fa-solid fa-user-pen"></i> Edit Profile</a>
        <a href="/student/change-password" class="btn-pwd"><i class="fa-solid fa-key"></i> Change Password</a>
      </div>

      <div class="upload-section">
        <span class="upload-label">Update Profile Photo</span>
        <div class="file-input-wrapper">
          <input type="file">
        </div>
        <button type="button" class="btn-change-pic"><i class="fa-solid fa-camera"></i> Change Picture</button>
      </div>
    </div>

    <!-- Right Card -->
    <div class="info-card">
      <div class="info-header">
        <h2><i class="fa-solid fa-circle-info" style="color: #10b981;"></i> Account Information</h2>
      </div>

      <table class="details-table">
        <tr>
          <td class="label-col">First Name</td>
          <td class="val-col">${firstName}</td>
        </tr>
        <tr>
          <td class="label-col">Last Name</td>
          <td class="val-col">${lastName}</td>
        </tr>
        <tr>
          <td class="label-col">Email Address</td>
          <td class="val-col link-highlight">${email}</td>
        </tr>
        <tr>
          <td class="label-col">Date of Birth</td>
          <td class="val-col">${dob}</td>
        </tr>
        <tr>
          <td class="label-col">Role</td>
          <td class="val-col" style="color: #34d399;">Active Member</td>
        </tr>
        <tr>
          <td class="label-col">Username</td>
          <td class="val-col link-highlight">@${username}</td>
        </tr>
      </table>
    </div>
  </main>
</body>
</html>
  `;
};