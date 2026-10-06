module.exports = function(errorMessage = '', successMessage = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - SkillVerse</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', sans-serif; }
    body { background-color: #121826; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
    
    .login-card { background: white; border-radius: 18px; width: 100%; max-width: 460px; padding: 40px 35px; box-shadow: 0 15px 35px rgba(0,0,0,0.35); text-align: center; }
    
    .brand-icon { color: #2563eb; font-size: 38px; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 800; color: #1e293b; letter-spacing: 0.5px; margin-bottom: 4px; }
    .subtitle { color: #64748b; font-size: 14px; margin-bottom: 22px; font-weight: 500; }

    /* PHP Style Dynamic Alert Boxes */
    .alert-box {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: left;
    }
    .alert-success {
      background-color: #d1fae5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }
    .alert-danger {
      background-color: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .form-group { margin-bottom: 18px; text-align: left; }
    label { display: block; font-size: 13.5px; font-weight: 600; color: #334155; margin-bottom: 6px; }
    .form-control { width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14.5px; outline: none; background: #fff; color: #1e293b; }
    .form-control::placeholder { color: #94a3b8; }
    .form-control:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
    
    .checkbox-container { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #64748b; margin-top: -8px; margin-bottom: 18px; text-align: left; }
    .checkbox-container input { cursor: pointer; width: 15px; height: 15px; accent-color: #2563eb; }

    .btn-login { width: 100%; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none; padding: 13px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; margin-top: 10px; transition: 0.2s; box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
    .btn-login:hover { opacity: 0.95; }

    .bottom-links { margin-top: 22px; font-size: 13.5px; color: #64748b; }
    .bottom-links a { color: #2563eb; font-weight: 700; text-decoration: none; }
    .bottom-links a.home-link { color: #64748b; font-weight: 500; }
    .bottom-links a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="login-card">
    <i class="fa-solid fa-graduation-cap brand-icon"></i>
    <h1 class="title">SIGN IN</h1>
    <p class="subtitle">Access your SkillVerse account</p>

    <!-- Green Success Alert -->
    ${successMessage ? `
      <div class="alert-box alert-success">
        ${successMessage}
      </div>
    ` : ''}

    <!-- Red Error Alert -->
    ${errorMessage ? `
      <div class="alert-box alert-danger">
        ${errorMessage}
      </div>
    ` : ''}

    <form action="/login" method="POST">
      <div class="form-group">
        <label>Username</label>
        <input type="text" name="username" class="form-control" placeholder="Enter username" required>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" id="passwordField" name="password" class="form-control" placeholder="Enter password" required>
      </div>

      <div class="checkbox-container">
        <input type="checkbox" id="showPwd" onclick="togglePassword()">
        <label for="showPwd" style="margin-bottom:0; cursor:pointer; font-weight: normal; color:#64748b;">Show Password</label>
      </div>

      <div class="form-group">
        <label>Role</label>
        <select name="role" class="form-control" required style="cursor:pointer;">
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit" class="btn-login">Login</button>
    </form>

    <div class="bottom-links">
      Don't have an account? <a href="/signup">Sign Up</a> | <a href="/" class="home-link">Home</a>
    </div>
  </div>

  <script>
    function togglePassword() {
      const p = document.getElementById('passwordField');
      p.type = p.type === 'password' ? 'text' : 'password';
    }
  </script>
</body>
</html>
  `;
};