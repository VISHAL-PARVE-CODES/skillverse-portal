module.exports = function(errorMessage = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up - SkillVerse</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', sans-serif; }
    body { background-color: #121826; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 15px; }
    
    .signup-card {
      background: white;
      border-radius: 20px;
      width: 100%;
      max-width: 520px;
      padding: 40px 38px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.35);
      position: relative;
      border-top: 5px solid #6366f1;
    }
    
    .title {
      font-size: 26px;
      font-weight: 800;
      color: #1e293b;
      text-align: center;
      margin-bottom: 4px;
    }
    
    .subtitle {
      color: #64748b;
      font-size: 13.5px;
      text-align: center;
      margin-bottom: 25px;
      font-weight: 500;
    }

    .alert-danger {
      background-color: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
      padding: 11px 14px;
      border-radius: 8px;
      font-size: 13.5px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .form-group {
      margin-bottom: 18px;
    }
    
    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 6px;
    }
    
    .form-control {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14.5px;
      outline: none;
      background: #f8fafc;
      color: #1e293b;
      transition: all 0.2s ease;
    }
    
    .form-control::placeholder {
      color: #94a3b8;
    }
    
    .form-control:focus {
      background: #fff;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }
    
    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      color: #64748b;
      margin-top: -6px;
      margin-bottom: 18px;
    }
    
    .checkbox-group input {
      cursor: pointer;
      accent-color: #6366f1;
      width: 15px;
      height: 15px;
    }

    .btn-signup {
      width: 100%;
      background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
      color: white;
      border: none;
      padding: 13px;
      border-radius: 8px;
      font-size: 15.5px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 10px;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
      transition: opacity 0.2s;
    }
    
    .btn-signup:hover {
      opacity: 0.95;
    }

    .bottom-links {
      margin-top: 22px;
      text-align: center;
      font-size: 13.5px;
      color: #64748b;
    }
    
    .bottom-links a {
      color: #4f46e5;
      font-weight: 700;
      text-decoration: none;
    }
    
    .bottom-links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="signup-card">
    <h1 class="title">Create New Account</h1>
    <p class="subtitle">Enter your details to register on SkillVerse</p>

    ${errorMessage ? `
      <div class="alert-danger">
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>${errorMessage}</span>
      </div>
    ` : ''}

    <form action="/signup" method="POST">
      <!-- 1. First Name -->
      <div class="form-group">
        <label>First Name</label>
        <input type="text" name="firstName" class="form-control" placeholder="First name" required>
      </div>

      <!-- 2. Last Name -->
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" class="form-control" placeholder="Last name" required>
      </div>

      <!-- 3. Email Address -->
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" name="email" class="form-control" placeholder="Email address" required>
      </div>

      <!-- 4. Birth Day -->
      <div class="form-group">
        <label>Birth Day</label>
        <input type="date" name="dob" class="form-control" required>
      </div>

      <!-- 5. Username -->
      <div class="form-group">
        <label>Username</label>
        <input type="text" name="username" class="form-control" placeholder="Username" required>
      </div>

      <!-- 6. New Password -->
      <div class="form-group">
        <label>New Password</label>
        <input type="password" id="pwd" name="password" class="form-control" placeholder="New Password" required>
      </div>

      <!-- 7. Confirm Password -->
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" id="cpwd" name="confirmPassword" class="form-control" placeholder="Confirm Password" required>
      </div>

      <!-- Show Password Checkbox -->
      <div class="checkbox-group">
        <input type="checkbox" id="showPass" onclick="togglePass()">
        <label for="showPass" style="margin-bottom:0; cursor:pointer; font-weight:normal; color:#64748b;">Show Password</label>
      </div>

      <!-- 8. Role Selection -->
      <div class="form-group">
        <label>Role</label>
        <select name="role" class="form-control" required style="cursor:pointer;">
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn-signup">Sign Up</button>
    </form>

    <div class="bottom-links">
      Already have an account? <a href="/login">Login here</a> | <a href="/" style="color:#64748b; font-weight:normal;">Home</a>
    </div>
  </div>

  <script>
    function togglePass() {
      const p1 = document.getElementById('pwd');
      const p2 = document.getElementById('cpwd');
      const type = p1.type === 'password' ? 'text' : 'password';
      p1.type = type;
      p2.type = type;
    }
  </script>
</body>
</html>
  `;
};