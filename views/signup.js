module.exports = function(errorMsg) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up - SkillVerse</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
    body {
      background-color: #06080e;
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30px 20px;
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(6, 182, 212, 0.16) 0%, transparent 45%);
      background-attachment: fixed;
    }
    .brand-header { margin-bottom: 22px; text-align: center; }
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
    .brand-logo i { -webkit-text-fill-color: initial; color: #10b981; }
    .auth-card {
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      width: 100%;
      max-width: 560px;
      padding: 36px 32px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
      position: relative;
    }
    .card-top { text-align: center; margin-bottom: 22px; }
    .icon-badge {
      width: 52px; height: 52px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      margin-bottom: 12px;
    }
    .card-top h2 { font-size: 24px; font-weight: 800; color: #ffffff; }
    .card-top p { color: #94a3b8; font-size: 13.5px; margin-top: 4px; }
    .error-banner {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13.5px;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 14px; }
    .form-group { margin-bottom: 14px; }
    .form-label { display: block; color: #cbd5e1; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-wrapper i.field-icon { position: absolute; left: 14px; color: #64748b; font-size: 14px; pointer-events: none; }
    .form-input, .form-select {
      width: 100%;
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #ffffff;
      padding: 11px 14px 11px 40px;
      border-radius: 12px;
      font-size: 13.5px;
      outline: none;
    }
    .form-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); cursor: pointer; }
    .form-select { appearance: none; cursor: pointer; }
    .select-arrow { position: absolute; right: 14px; color: #64748b; pointer-events: none; font-size: 13px; }
    .form-input:focus, .form-select:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); }
    .options-row { margin-bottom: 20px; }
    .checkbox-container { display: flex; align-items: center; gap: 8px; cursor: pointer; color: #94a3b8; font-size: 13px; }
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
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .card-footer { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); color: #94a3b8; font-size: 13.5px; }
    .card-footer a { color: #38bdf8; text-decoration: none; font-weight: 600; }
    @media(max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="brand-header">
    <a href="/" class="brand-logo"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
  </div>

  <div class="auth-card">
    <div class="card-top">
      <div class="icon-badge"><i class="fa-solid fa-user-plus"></i></div>
      <h2>Create New Account</h2>
      <p>Enter your details to register on SkillVerse</p>
    </div>

    ${errorMsg ? `<div class="error-banner"><i class="fa-solid fa-circle-exclamation"></i> ${errorMsg}</div>` : ''}

    <form action="/signup" method="POST">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">First Name</label>
          <div class="input-wrapper">
            <input type="text" name="firstName" class="form-input" placeholder="First name" required>
            <i class="fa-solid fa-user field-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Last Name</label>
          <div class="input-wrapper">
            <input type="text" name="lastName" class="form-input" placeholder="Last name" required>
            <i class="fa-solid fa-user-tag field-icon"></i>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Email Address</label>
        <div class="input-wrapper">
          <input type="email" name="email" class="form-input" placeholder="name@domain.com" required>
          <i class="fa-solid fa-envelope field-icon"></i>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Birth Date</label>
          <div class="input-wrapper">
            <input type="date" name="dob" class="form-input" required>
            <i class="fa-solid fa-calendar field-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Role</label>
          <div class="input-wrapper">
            <select name="role" class="form-select" required>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            <i class="fa-solid fa-id-badge field-icon"></i>
            <i class="fa-solid fa-chevron-down select-arrow"></i>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Username</label>
        <div class="input-wrapper">
          <input type="text" name="username" class="form-input" placeholder="Choose a unique username" required>
          <i class="fa-solid fa-at field-icon"></i>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="input-wrapper">
            <input type="password" id="pass1" name="password" class="form-input" placeholder="Create password" required>
            <i class="fa-solid fa-lock field-icon"></i>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <div class="input-wrapper">
            <input type="password" id="pass2" name="confirmPassword" class="form-input" placeholder="Re-enter password" required>
            <i class="fa-solid fa-shield-halved field-icon"></i>
          </div>
        </div>
      </div>

      <div class="options-row">
        <label class="checkbox-container">
          <input type="checkbox" onclick="togglePass()"> Show Password
        </label>
      </div>

      <button type="submit" class="btn-submit">
        <span>Create Account</span> <i class="fa-solid fa-arrow-right"></i>
      </button>
    </form>

    <div class="card-footer">
      Already have an account? <a href="/login">Sign In</a> | <a href="/">Home</a>
    </div>
  </div>

  <script>
    function togglePass() {
      var p1 = document.getElementById("pass1");
      var p2 = document.getElementById("pass2");
      var t = p1.type === "password" ? "text" : "password";
      p1.type = t;
      p2.type = t;
    }
  </script>
</body>
</html>`;
};