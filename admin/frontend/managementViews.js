const sharedTheme = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:'Plus Jakarta Sans', sans-serif; }
    html, body { min-height: 100vh; width: 100%; }
    
    /* 🌌 Luxury Obsidian & Neon Cyber Aura (PHP se 100% different) */
    body {
      background-color: #060814;
      background-image: 
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.30) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(14, 165, 233, 0.28) 0px, transparent 50%),
        radial-gradient(at 50% 100%, rgba(168, 85, 247, 0.22) 0px, transparent 50%);
      background-attachment: fixed;
      background-size: cover;
      color: #f8fafc;
      display: flex;
    }

    /* Floating Frosted Glass Sidebar */
    .sidebar {
      width: 260px;
      height: calc(100vh - 32px);
      background: rgba(15, 23, 42, 0.70);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      margin: 16px 0 16px 16px;
      padding: 28px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      background: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      padding-left: 8px;
      margin-bottom: 25px;
    }
    .brand-title i { -webkit-text-fill-color: initial; color: #38bdf8; }
    .nav-links { list-style: none; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .nav-links a {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 13px 18px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      border-radius: 14px;
      transition: all 0.25s ease;
    }
    .nav-links a:hover { background: rgba(255, 255, 255, 0.06); color: #fff; transform: translateX(4px); }
    .nav-links a.active {
      background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);
      color: #fff;
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .btn-logout {
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 12px;
      border-radius: 14px;
      text-align: center;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    /* Main Table Container */
    .main-wrapper {
      margin-left: 285px;
      flex: 1;
      padding: 30px 40px 40px 20px;
      min-width: 0;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
    .page-title { font-size: 24px; font-weight: 800; display: flex; align-items: center; gap: 12px; }
    .badge-count {
      background: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
      border: 1px solid rgba(99, 102, 241, 0.4);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
    }

    /* Frosted Table Card */
    .table-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 24px 30px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.8);
      color: #0f172a;
    }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th {
      font-size: 13px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 14px 16px;
      border-bottom: 2px solid #e2e8f0;
    }
    td { padding: 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #1e293b; }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #f8fafc; }
    
    .status-active { background: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; }
    .status-blocked { background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; }
  </style>
`;

function renderNav(activeTab) {
  return `
    <aside class="sidebar">
      <div>
        <a href="/admin/analysis" class="brand-title"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
        <nav class="nav-links">
          <a href="/admin/students" class="${activeTab === 'students' ? 'active' : ''}"><i class="fa-solid fa-graduation-cap"></i> Students</a>
          <a href="/admin/instructors" class="${activeTab === 'instructors' ? 'active' : ''}"><i class="fa-solid fa-chalkboard-user"></i> Instructors</a>
          <a href="/admin/courses" class="${activeTab === 'courses' ? 'active' : ''}"><i class="fa-solid fa-book-open"></i> Courses</a>
          <a href="/admin/analysis" class="${activeTab === 'analysis' ? 'active' : ''}"><i class="fa-solid fa-chart-line"></i> System Analysis</a>
        </nav>
      </div>
      <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
    </aside>
  `;
}

// 1. Students View
function renderStudents(students = []) {
  return `
    <!DOCTYPE html><html><head><title>Students - SkillVerse</title>${sharedTheme}</head><body>
      ${renderNav('students')}
      <main class="main-wrapper">
        <div class="page-header">
          <h1 class="page-title"><i class="fa-solid fa-graduation-cap" style="color:#6366f1;"></i> Enrolled Students</h1>
          <span class="badge-count">${students.length} Registered</span>
        </div>
        <div class="table-card">
          <table>
            <thead>
              <tr><th>#</th><th>Name</th><th>Email</th><th>Username</th><th>DOB</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${students.length > 0 ? students.map((s, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${s.name || s.firstName + ' ' + (s.lastName || '')}</td>
                  <td style="color:#4f46e5;">${s.email}</td>
                  <td>@${s.username}</td>
                  <td>${s.dob || 'N/A'}</td>
                  <td><span class="status-active">${s.status || 'Active'}</span></td>
                </tr>
              `).join('') : '<tr><td colspan="6" style="text-align:center; padding:30px; color:#64748b;">No students found</td></tr>'}
            </tbody>
          </table>
        </div>
      </main>
    </body></html>
  `;
}

// 2. Instructors View
function renderInstructors(instructors = []) {
  return `
    <!DOCTYPE html><html><head><title>Instructors - SkillVerse</title>${sharedTheme}</head><body>
      ${renderNav('instructors')}
      <main class="main-wrapper">
        <div class="page-header">
          <h1 class="page-title"><i class="fa-solid fa-chalkboard-user" style="color:#0ea5e9;"></i> Registered Instructors</h1>
          <span class="badge-count">${instructors.length} Instructors</span>
        </div>
        <div class="table-card">
          <table>
            <thead>
              <tr><th>#</th><th>Instructor</th><th>Email</th><th>Username</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${instructors.length > 0 ? instructors.map((ins, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${ins.name || ins.firstName}</td>
                  <td style="color:#0284c7;">${ins.email}</td>
                  <td>@${ins.username}</td>
                  <td><span class="status-active">${ins.status || 'Active'}</span></td>
                </tr>
              `).join('') : '<tr><td colspan="5" style="text-align:center; padding:30px; color:#64748b;">No instructors registered yet</td></tr>'}
            </tbody>
          </table>
        </div>
      </main>
    </body></html>
  `;
}

// 3. Courses View
function renderCourses(courses = []) {
  return `
    <!DOCTYPE html><html><head><title>Courses - SkillVerse</title>${sharedTheme}</head><body>
      ${renderNav('courses')}
      <main class="main-wrapper">
        <div class="page-header">
          <h1 class="page-title"><i class="fa-solid fa-book-open" style="color:#a855f7;"></i> Course Catalog</h1>
          <span class="badge-count">${courses.length} Available</span>
        </div>
        <div class="table-card">
          <table>
            <thead>
              <tr><th>#</th><th>Course Title</th><th>Instructor</th><th>Price</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${courses.length > 0 ? courses.map((c, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td><b>${c.title}</b></td>
                  <td>${c.instructor || 'Instructor'}</td>
                  <td><b style="color:#16a34a;">${c.price ? '₹' + c.price : 'Free'}</b></td>
                  <td><span class="status-active">${c.status || 'Public'}</span></td>
                </tr>
              `).join('') : '<tr><td colspan="5" style="text-align:center; padding:30px; color:#64748b;">No courses available</td></tr>'}
            </tbody>
          </table>
        </div>
      </main>
    </body></html>
  `;
}

module.exports = { renderStudents, renderInstructors, renderCourses };