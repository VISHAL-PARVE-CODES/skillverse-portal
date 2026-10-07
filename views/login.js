module.exports = function(errorMsg = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - SkillVerse</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }

    body {
      background-color: #06080e;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 24px;
      background-image: 
        radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.16) 0%, transparent 45%);
      background-attachment: fixed;
    }

    .brand-header {
      margin-bottom: 28px;
      text-align: center;
    }

    .brand-logo {
      font-size: 26px;
      font-weight: 800;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .brand-logo i {
      -webkit-text-fill-color: initial;
      color: #10b981;
    }

    .auth-card {
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      width: 100%;
      max-width: 440px;
      padding: 38px 34px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
      position: relative;
    }

    .auth-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 15%;
      right: 15%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #10b981, #06b6d4, transparent);
    }

    .card-top {
      text-align: center;
      margin-bottom: 28px;
    }

    .icon-badge {
      width: 56px;
      height: 56px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-bottom: 14px;
    }

    .card-top h2 {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }

    .card-top p {
      color: #94a3b8;
      font-size: 14px;
      margin-top: 6px;
    }

    .error-banner {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13.5px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      color: #cbd5e1;
      font-size: 13.5px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-wrapper i.field-icon {
      position: absolute;
      left: 14px;
      color: #64748b;
      font-size: 15px;
      pointer-events: none;
      transition: color 0.2s ease;
    }

    .form-input, .form-select {
      width: 100%;
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #ffffff;
      padding: 12px 14px 12px 42px;
      border-radius: 12px;
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
    }

    .form-select {
      appearance: none;
      cursor: pointer;
    }

    .select-arrow {
      position: absolute;
      right: 14px;
      color: #64748b;
      pointer-events: none;
      font-size: 13px;
    }

    .form-input:focus, .form-select:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
      background: rgba(30, 41, 59, 0.85);
    }

    .form-input:focus ~ i.field-icon {
      color: #10b981;
    }

    .options-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: -6px;
      margin-bottom: 24px;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: #94a3b8;
      font-size: 13px;
      user-select: none;
    }

    .checkbox-container input {
      accent-color: #10b981;
      width: 15px;
      height: 15px;
      cursor: pointer;
    }

    .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, #059669 0%, #0891b2 100%);
      color: #ffffff;
      padding: 13px;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(16, 185, 129, 0.35);
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(6, 182, 212, 0.45);
    }

    .card-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      font-size: 13.5px;
    }

    .card-footer a {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s;
    }

    .card-footer a:hover {
      color: #7dd3fc;
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <div class="brand-header">
    <a href="/" class="brand-logo">
      <i class="fa-solid fa-graduation-cap"></i> SkillVerse
    </a>
  </div>

  <div class="auth-card">
    <div class="card-top">
      <div class="icon-badge">
        <i class="fa-solid fa-user-shield"></i>
      </div>
      <h2>Welcome Back</h2>
      <p>Sign in to continue your learning journey</p>
    </div>

    ${errorMsg ? \`
      <div class="error-banner">
        <i class="fa-solid fa-circle-exclamation"></i> \${errorMsg}
      </div>
    \` : ''}

    <form action="/login" method="POST">
      <div class="form-group">
        <label class="form-label">Username / Email</label>
        <div class="input-wrapper">
          <input type="text" name="username" class="form-input" placeholder="Enter username or email" required>
          <i class="fa-solid fa-user field-icon"></i>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Password</label>
        <div class="input-wrapper">
          <input type="password" id="loginPassword" name="password" class="form-input" placeholder="Enter password" required>
          <i class="fa-solid fa-lock field-icon"></i>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Role</label>
        <div class="input-wrapper">
          <select name="role" class="form-select" required>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option>
          </select>
          <i class="fa-solid fa-id-badge field-icon"></i>
          <i class="fa-solid fa-chevron-down select-arrow"></i>
        </div>
      </div>

      <div class="options-row">
        <label class="checkbox-container">
          <input type="checkbox" onclick="togglePassword()"> Show Password
        </label>
      </div>

      <button type="submit" class="btn-submit">
        <span>Sign In</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </form>

    <div class="card-footer">
      Don't have an account? <a href="/signup">Sign Up</a> | <a href="/">Home</a>
    </div>
  </div>

  <script>
    function togglePassword() {
      const field = document.getElementById('loginPassword');
      field.type = field.type === 'password' ? 'text' : 'password';
    }
  </script>
</body>
</html>
  `;
};