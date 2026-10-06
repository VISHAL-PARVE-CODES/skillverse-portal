module.exports = function(user) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Instructor Profile</title>
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

    /* Main Content */
    .main-content {
      margin-left: 250px;
      flex: 1;
      padding: 40px;
      display: flex;
      gap: 25px;
      align-items: flex-start;
    }

    /* Left Card */
    .profile-card-left {
      background: #ffffff;
      border-radius: 14px;
      padding: 35px 25px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      width: 320px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .avatar-wrapper {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 18px;
      border: 4px solid #007bff;
    }
    .avatar-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-fullname {
      font-size: 22px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .user-handle {
      font-size: 13.5px;
      color: #64748b;
      margin-bottom: 12px;
    }

    .badge-instructor {
      background-color: #007bff;
      color: #ffffff;
      padding: 6px 18px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 25px;
    }

    .upload-section {
      width: 100%;
      border-top: 1px solid #f1f5f9;
      padding-top: 20px;
      text-align: left;
    }
    .upload-label {
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 8px;
      display: block;
    }
    .file-input-box {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      margin-bottom: 12px;
    }
    .file-input {
      font-size: 12px;
      color: #64748b;
      width: 100%;
    }
    .btn-change-pic {
      width: 100%;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 20px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-change-pic:hover {
      background-color: #0056b3;
    }

    /* Right Card */
    .profile-card-right {
      background: #ffffff;
      border-radius: 14px;
      padding: 35px 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      flex: 1;
      max-width: 650px;
    }

    .account-title {
      font-size: 20px;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 25px;
    }

    .info-table {
      width: 100%;
      border-collapse: collapse;
    }
    .info-table td {
      padding: 16px 10px;
      font-size: 14.5px;
      border-bottom: 1px solid #f1f5f9;
    }
    .label-col {
      width: 35%;
      color: #475569;
      font-weight: 600;
    }
    .value-col {
      width: 65%;
      color: #1e293b;
      font-weight: 700;
    }
    .text-blue {
      color: #007bff;
      text-decoration: none;
    }
    .badge-active-member {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      color: #334155;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
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
        <a href="/profile" class="active">
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

  <!-- Right Content Area -->
  <main class="main-content">
    <!-- Left Profile Box -->
    <div class="profile-card-left">
      <div class="avatar-wrapper">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" alt="Profile Avatar">
      </div>
      <h3 class="user-fullname">${user.firstName}${user.lastName}</h3>
      <p class="user-handle">@${user.username}</p>
      
      <div class="badge-instructor">
        <i class="fa-solid fa-chalkboard-user"></i> Instructor
      </div>

      <div class="upload-section">
        <span class="upload-label">Update Profile Photo</span>
        <div class="file-input-box">
          <input type="file" class="file-input">
        </div>
        <button class="btn-change-pic"><i class="fa-solid fa-camera"></i> Change Picture</button>
      </div>
    </div>

    <!-- Right Account Information Box -->
    <div class="profile-card-right">
      <h2 class="account-title">
        <i class="fa-solid fa-circle-info" style="color: #007bff;"></i> Account Information
      </h2>

      <table class="info-table">
        <tbody>
          <tr>
            <td class="label-col">First Name</td>
            <td class="value-col">${user.firstName}</td>
          </tr>
          <tr>
            <td class="label-col">Last Name</td>
            <td class="value-col">${user.lastName}</td>
          </tr>
          <tr>
            <td class="label-col">Email Address</td>
            <td class="value-col"><a href="mailto:${user.email}" class="text-blue">${user.email}</a></td>
          </tr>
          <tr>
            <td class="label-col">Date of Birth</td>
            <td class="value-col">${user.dob}</td>
          </tr>
          <tr>
            <td class="label-col">Role</td>
            <td class="value-col"><span class="badge-active-member">${user.joinedDate}</span></td>
          </tr>
          <tr>
            <td class="label-col">Username</td>
            <td class="value-col"><a href="#" class="text-blue">@${user.username}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>

</body>
</html>
  `;
};