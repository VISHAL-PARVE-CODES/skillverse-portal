module.exports = function() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Create Course</title>
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
      border-radius: 14px;
      padding: 35px 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      max-width: 900px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .card-title {
      font-size: 22px;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-back {
      border: 1px solid #94a3b8;
      color: #475569;
      background: transparent;
      padding: 7px 18px;
      border-radius: 20px;
      font-size: 13.5px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-back:hover {
      background-color: #f1f5f9;
      color: #1e293b;
    }

    /* Form Fields */
    .form-group {
      margin-bottom: 24px;
    }
    .form-label {
      display: block;
      font-size: 14.5px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 10px;
    }
    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 14px;
      color: #1e293b;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      border-color: #007bff;
    }

    .file-upload-box {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      background-color: #ffffff;
    }
    .file-input {
      font-size: 13.5px;
      color: #475569;
      width: 100%;
    }

    .btn-publish {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 12px 28px;
      border-radius: 25px;
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 10px;
      transition: background-color 0.2s;
    }
    .btn-publish:hover {
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
        <a href="/instructor/create" class="active">
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

  <!-- Right Content Form Card -->
  <main class="main-content">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">
          <i class="fa-solid fa-square-plus" style="color: #007bff;"></i> Create New Course
        </h2>
        <a href="/instructor/courses" class="btn-back">
          <i class="fa-solid fa-arrow-left"></i> Back to Courses
        </a>
      </div>

      <form action="/instructor/create" method="POST">
        <!-- 1. Course Title -->
        <div class="form-group">
          <label class="form-label">Course Title</label>
          <input type="text" name="title" class="form-control" placeholder="e.g. Web Development Bootcamp" required>
        </div>

        <!-- 2. Course Description -->
        <div class="form-group">
          <label class="form-label">Course Description</label>
          <textarea name="description" class="form-control" rows="4" placeholder="Enter brief overview about this course..."></textarea>
        </div>

        <!-- 3. Course Thumbnail -->
        <div class="form-group">
          <label class="form-label">Course Thumbnail / Cover Image</label>
          <div class="file-upload-box">
            <input type="file" name="thumbnail" class="file-input">
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-publish">
          <i class="fa-solid fa-plus"></i> Publish Course
        </button>
      </form>
    </div>
  </main>

</body>
</html>
  `;
};