module.exports = function() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Add Instructor</title>
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
    .main-content { margin-left: 250px; flex: 1; padding: 40px; display: flex; justify-content: center; }
    .card { background: white; border-radius: 16px; padding: 35px 45px; width: 100%; max-width: 850px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); height: fit-content; }
    
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; }
    .title-box h2 { font-size: 24px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
    .title-box p { color: #64748b; font-size: 14px; margin-top: 4px; }
    .btn-back { border: 1px solid #cbd5e1; color: #475569; padding: 7px 18px; border-radius: 20px; text-decoration: none; font-size: 13.5px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
    .btn-back:hover { background: #f8fafc; }

    /* 2 Column Form Grid */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-group { margin-bottom: 18px; }
    .form-group.full-width { grid-column: span 2; margin-bottom: 18px; }
    
    label { display: block; font-size: 13.5px; font-weight: 600; color: #334155; margin-bottom: 8px; }
    .form-control { width: 100%; padding: 11px 15px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; transition: 0.2s border; }
    .form-control:focus { border-color: #007bff; }

    .checkbox-container { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #64748b; margin-top: 5px; margin-bottom: 30px; }
    .checkbox-container input { cursor: pointer; width: 16px; height: 16px; }

    /* Footer Buttons */
    .form-actions { display: flex; justify-content: flex-end; align-items: center; gap: 14px; border-top: 1px solid #f1f5f9; padding-top: 20px; }
    .btn-cancel { color: #475569; text-decoration: none; font-weight: 700; font-size: 14.5px; padding: 10px 20px; }
    .btn-save { background: #007bff; color: white; border: none; padding: 11px 24px; border-radius: 8px; font-size: 14.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
    .btn-save:hover { background: #0056b3; }
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
      <div class="card-top">
        <div class="title-box">
          <h2><i class="fa-solid fa-user-plus" style="color: #007bff;"></i> Add Instructor Profile</h2>
          <p>Enter instructor details to create a new profile</p>
        </div>
        <a href="/admin/instructors" class="btn-back"><i class="fa-solid fa-arrow-left"></i> Back</a>
      </div>

      <form action="/admin/add-instructor" method="POST">
        <div class="form-grid">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" class="form-control" placeholder="Enter instructor's first name" required>
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" class="form-control" placeholder="Enter instructor's last name" required>
          </div>

          <div class="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" class="form-control" required>
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" class="form-control" placeholder="Enter instructor's email" required>
          </div>

          <div class="form-group full-width">
            <label>Username</label>
            <input type="text" name="username" class="form-control" placeholder="Enter unique username" required>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" id="pwd" name="password" class="form-control" placeholder="••••••" required>
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" id="cpwd" name="confirmPassword" class="form-control" placeholder="Confirm password" required>
          </div>
        </div>

        <div class="checkbox-container">
          <input type="checkbox" id="showPwd" onclick="togglePasswordVisibility()">
          <label for="showPwd" style="margin-bottom:0; cursor:pointer;">Show Password</label>
        </div>

        <div class="form-actions">
          <a href="/admin/instructors" class="btn-cancel">Cancel</a>
          <button type="submit" class="btn-save"><i class="fa-solid fa-check"></i> Save Instructor</button>
        </div>
      </form>
    </div>
  </main>

  <script>
    function togglePasswordVisibility() {
      const p = document.getElementById('pwd');
      const cp = document.getElementById('cpwd');
      const type = p.type === 'password' ? 'text' : 'password';
      p.type = type;
      cp.type = type;
    }
  </script>
</body>
</html>
  `;
};