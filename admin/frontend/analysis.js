module.exports = function(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - System Analysis</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI', sans-serif; }
    body { background-color: #121826; min-height: 100vh; display: flex; }
    .sidebar { width: 250px; background-color: #171d2b; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; position: fixed; top:0; left:0; bottom:0; padding: 25px 15px; border-right: 1px solid rgba(255,255,255,0.05); }
    .brand-section { display: flex; align-items: center; gap: 12px; padding-left: 10px; margin-bottom: 35px; color: white; font-size: 20px; font-weight: 800; }
    .sidebar-menu a { color: #94a3b8; text-decoration: none; font-size: 15px; font-weight: 600; padding: 12px 18px; border-radius: 8px; display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
    .sidebar-menu a.active { background-color: #007bff; color: white; }
    .btn-logout { background: transparent; color: #ef4444; border: 1px solid #ef4444; padding: 10px; border-radius: 8px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; }
    .main-content { margin-left: 250px; flex: 1; padding: 40px; }
    .card { background: white; border-radius: 12px; padding: 35px 40px; max-width: 1080px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
    .stat-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 25px; text-align: center; }
    .stat-number { font-size: 36px; font-weight: 800; color: #007bff; }
    .stat-label { font-size: 14px; color: #64748b; font-weight: 600; }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <div class="brand-section"><i class="fa-solid fa-graduation-cap" style="color:#007bff; font-size:26px;"></i> SkillVerse Admin</div>
      <nav class="sidebar-menu">
        <a href="/admin/dashboard"><i class="fa-solid fa-user-graduate"></i> Students</a>
        <a href="/admin/instructors"><i class="fa-solid fa-chalkboard-user"></i> Instructors</a>
        <a href="/admin/courses"><i class="fa-solid fa-book"></i> Courses</a>
        <a href="/admin/analysis" class="active"><i class="fa-solid fa-chart-line"></i> System Analysis</a>
      </nav>
    </div>
    <a href="/login" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>
  <main class="main-content">
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
        <h2>System Analysis & Reports</h2>
        <button onclick="window.print()" style="border:1px solid #007bff; color:#007bff; background:white; padding:8px 16px; border-radius:6px; font-weight:600; cursor:pointer;"><i class="fa-solid fa-print"></i> Print Report</button>
      </div>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-number">${data.studentCount}</div><div class="stat-label">Total Students</div></div>
        <div class="stat-card"><div class="stat-number">${data.instructorCount}</div><div class="stat-label">Total Instructors</div></div>
        <div class="stat-card"><div class="stat-number">${data.courseCount}</div><div class="stat-label">Total Courses</div></div>
      </div>
      <div style="height: 250px;"><canvas id="barChart"></canvas></div>
    </div>
  </main>
  <script>
    new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{ label: 'Student Visits', data: [20, 30, 25, 18], backgroundColor: '#007bff', borderRadius: 6 }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  </script>
</body>
</html>
  `;
};