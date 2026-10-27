// Common Layout
function getLayout(title, activeNav, contentHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - SkillVerse</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    body {
      background-color: #06080e !important;
      color: #f8fafc !important;
      min-height: 100vh;
      display: flex;
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(6, 182, 212, 0.14) 0%, transparent 45%) !important;
      background-attachment: fixed;
    }

    /* Left Sidebar */
    .sidebar {
      width: 250px;
      min-height: 100vh;
      background: rgba(11, 15, 25, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: sticky;
      top: 0;
      height: 100vh;
    }
    .brand-logo {
      font-size: 20px;
      font-weight: 800;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 10px 24px 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 20px;
      list-style: none;
    }
    .nav-item a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      color: #94a3b8;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      border-radius: 12px;
      transition: all 0.2s ease;
    }
    .nav-item a:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #ffffff;
    }
    .nav-item.active a {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%) !important;
      border: 1px solid rgba(139, 92, 246, 0.5) !important;
      color: #ffffff !important;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3) !important;
    }
    .logout-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 11px;
      background: rgba(239, 68, 68, 0.12);
      border: 1px solid rgba(239, 68, 68, 0.25);
      color: #f87171;
      text-decoration: none;
      font-weight: 600;
      font-size: 13.5px;
      border-radius: 12px;
      transition: all 0.2s;
    }
    .logout-btn:hover { background: rgba(239, 68, 68, 0.25); color: #fff; }

    /* Content Area */
    .main-content {
      flex: 1;
      padding: 34px 40px;
      overflow-y: auto;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 26px;
    }
    .title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .title-group i {
      font-size: 24px;
      color: #6366f1;
    }
    .page-header h2 {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .count-badge {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #818cf8;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
    }

    /* PURE DARK GLASS CARD (Overriding Any White Container) */
    .dark-glass-container {
      background: rgba(15, 23, 42, 0.75) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 20px !important;
      padding: 10px 0 !important;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6) !important;
      overflow: hidden;
    }

    table.dark-table {
      width: 100% !important;
      border-collapse: collapse !important;
      background: transparent !important;
    }
    table.dark-table thead tr {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      background: transparent !important;
    }
    table.dark-table th {
      padding: 16px 24px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      color: #94a3b8 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.8px !important;
      border: none !important;
      background: transparent !important;
    }
    table.dark-table td {
      padding: 18px 24px !important;
      font-size: 14px !important;
      color: #cbd5e1 !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
      background: transparent !important;
    }
    table.dark-table tbody tr:hover {
      background: rgba(255, 255, 255, 0.02) !important;
    }

    .badge-active {
      background: rgba(16, 185, 129, 0.15) !important;
      color: #34d399 !important;
      border: 1px solid rgba(16, 185, 129, 0.3) !important;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }
  </style>
</head>
<body>

  <!-- Left Navigation -->
  <aside class="sidebar">
    <div>
      <a href="/" class="brand-logo">
        <i class="fa-solid fa-graduation-cap"></i> SkillVerse
      </a>
      <ul class="nav-links">
        <li class="nav-item ${activeNav === 'students' ? 'active' : ''}">
          <a href="/admin/students"><i class="fa-solid fa-graduation-cap"></i> Students</a>
        </li>
        <li class="nav-item ${activeNav === 'instructors' ? 'active' : ''}">
          <a href="/admin/instructors"><i class="fa-solid fa-chalkboard-user"></i> Instructors</a>
        </li>
        <li class="nav-item ${activeNav === 'courses' ? 'active' : ''}">
          <a href="/admin/courses"><i class="fa-solid fa-book"></i> Courses</a>
        </li>
        <li class="nav-item ${activeNav === 'analysis' ? 'active' : ''}">
          <a href="/admin/analysis"><i class="fa-solid fa-chart-line"></i> System Analysis</a>
        </li>
      </ul>
    </div>

    <a href="/logout" class="logout-btn">
      <i class="fa-solid fa-right-from-bracket"></i> Logout
    </a>
  </aside>

  <!-- Main View -->
  <main class="main-content">
    ${contentHtml}
  </main>

</body>
</html>`;
}

// 1. Students Page
function renderStudents(students = []) {
  let rows = '';
  if (students && students.length > 0) {
    students.forEach((st, i) => {
      rows += `
        <tr>
          <td style="color:#64748b; font-weight:600;">${i + 1}</td>
          <td style="color:#ffffff; font-weight:700;">${st.name || 'vishal parve'}</td>
          <td style="color:#818cf8;">${st.email || 'N/A'}</td>
          <td style="color:#cbd5e1;">@${st.username || 'user'}</td>
          <td style="color:#94a3b8;">${st.dob || 'N/A'}</td>
          <td><span class="badge-active">Active</span></td>
        </tr>
      `;
    });
  } else {
    rows = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 50px 20px; color:#64748b;">
          <i class="fa-solid fa-user-slash" style="font-size:30px; margin-bottom:10px; display:block;"></i>
          No students found
        </td>
      </tr>
    `;
  }

  const content = `
    <div class="page-header">
      <div class="title-group">
        <i class="fa-solid fa-graduation-cap"></i>
        <h2>Enrolled Students</h2>
      </div>
      <span class="count-badge">${students ? students.length : 0} Registered</span>
    </div>

    <div class="dark-glass-container" style="background: rgba(15, 23, 42, 0.75) !important;">
      <table class="dark-table" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>USERNAME</th>
            <th>DOB</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;

  return getLayout('Enrolled Students', 'students', content);
}

// 2. Instructors Page
function renderInstructors(instructors = []) {
  let rows = '';
  if (instructors && instructors.length > 0) {
    instructors.forEach((ins, i) => {
      rows += `
        <tr>
          <td style="color:#64748b; font-weight:600;">${i + 1}</td>
          <td style="color:#ffffff; font-weight:700;">${ins.name || 'Instructor'}</td>
          <td style="color:#818cf8;">${ins.email || 'N/A'}</td>
          <td style="color:#cbd5e1;">@${ins.username || 'mentor'}</td>
          <td style="color:#94a3b8;">${ins.dob || 'N/A'}</td>
          <td><span class="badge-active">Active</span></td>
        </tr>
      `;
    });
  } else {
    rows = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 50px 20px; color:#64748b;">
          <i class="fa-solid fa-chalkboard-user" style="font-size:30px; margin-bottom:10px; display:block;"></i>
          No instructors found
        </td>
      </tr>
    `;
  }

  const content = `
    <div class="page-header">
      <div class="title-group">
        <i class="fa-solid fa-chalkboard-user"></i>
        <h2>Active Instructors</h2>
      </div>
      <span class="count-badge">${instructors ? instructors.length : 0} Mentors</span>
    </div>

    <div class="dark-glass-container" style="background: rgba(15, 23, 42, 0.75) !important;">
      <table class="dark-table" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>USERNAME</th>
            <th>DOB</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;

  return getLayout('Active Instructors', 'instructors', content);
}

// 3. Courses Page
function renderCourses(courses = []) {
  let rows = '';
  if (courses && courses.length > 0) {
    courses.forEach((c, i) => {
      rows += `
        <tr>
          <td style="color:#64748b; font-weight:600;">${i + 1}</td>
          <td style="color:#ffffff; font-weight:700;">${c.title || 'Course'}</td>
          <td style="color:#818cf8;">${c.instructor || 'Lead Instructor'}</td>
          <td style="color:#34d399; font-weight:700;">₹${c.price || 'Free'}</td>
          <td><span class="badge-active">Public</span></td>
        </tr>
      `;
    });
  } else {
    rows = `
      <tr>
        <td colspan="5" style="text-align:center; padding: 50px 20px; color:#64748b;">
          <i class="fa-solid fa-folder-open" style="font-size:30px; margin-bottom:10px; display:block;"></i>
          No courses found
        </td>
      </tr>
    `;
  }

  const content = `
    <div class="page-header">
      <div class="title-group">
        <i class="fa-solid fa-book"></i>
        <h2>Course Catalog</h2>
      </div>
      <span class="count-badge">${courses ? courses.length : 0} Available</span>
    </div>

    <div class="dark-glass-container" style="background: rgba(15, 23, 42, 0.75) !important;">
      <table class="dark-table" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th>#</th>
            <th>COURSE TITLE</th>
            <th>INSTRUCTOR</th>
            <th>PRICE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;

  return getLayout('Course Catalog', 'courses', content);
}

module.exports = {
  renderStudents,
  renderInstructors,
  renderCourses
};