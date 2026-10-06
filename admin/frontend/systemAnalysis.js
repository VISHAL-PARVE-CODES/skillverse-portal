module.exports = function(stats = {}) {
  const studentCount = Number(stats.studentCount || 0);
  const instructorCount = Number(stats.instructorCount || 0);
  const courseCount = Number(stats.courseCount || 0);
  const moduleCount = Number(stats.moduleCount || 0);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - System Analytics</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
    
    html, body { min-height: 100vh; width: 100%; overflow-x: hidden; }

    /* 🌌 Pitch Obsidian + Emerald Cyber Orbs (Zero Blue - 100% Unique) */
    body {
      background-color: #06080b;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.22) 0%, transparent 45%),
        radial-gradient(circle at 90% 15%, rgba(6, 182, 212, 0.20) 0%, transparent 40%),
        radial-gradient(circle at 50% 90%, rgba(99, 102, 241, 0.18) 0%, transparent 50%);
      background-attachment: fixed;
      background-size: cover;
      color: #f1f5f9;
      display: flex;
    }

    /* 💎 Floating Dark Obsidian Glass Sidebar */
    .sidebar {
      width: 255px;
      height: calc(100vh - 32px);
      background: rgba(11, 15, 22, 0.75);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 20px;
      margin: 16px 0 16px 16px;
      padding: 28px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
    }

    .brand-box { padding-left: 10px; margin-bottom: 25px; }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    .brand-title i { -webkit-text-fill-color: initial; color: #10b981; }
    .brand-sub { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-left: 36px; margin-top: 2px; }

    .nav-links { list-style: none; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .nav-links a {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 600;
      border-radius: 12px;
      transition: all 0.25s ease;
      border: 1px solid transparent;
    }
    .nav-links a:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      transform: translateX(4px);
    }
    .nav-links a.active {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: #ffffff;
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 12px;
      border-radius: 12px;
      text-align: center;
      text-decoration: none;
      font-weight: 700;
      font-size: 13.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    /* Content Area */
    .main-wrapper {
      margin-left: 280px;
      flex: 1;
      padding: 30px 40px 40px 20px;
      min-width: 0;
    }

    /* 💎 Sleek Dark Obsidian Glass Cards (No Pure White Box) */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 26px;
    }

    .stat-card {
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(16px);
      border-radius: 20px;
      padding: 24px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.06);
      transition: all 0.3s ease;
    }
    .stat-card:hover {
      transform: translateY(-5px);
      border-color: rgba(16, 185, 129, 0.4);
      box-shadow: 0 20px 40px rgba(16, 185, 129, 0.12);
    }

    .stat-info .stat-label { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .stat-info .stat-val { font-size: 34px; font-weight: 800; color: #f8fafc; margin-bottom: 10px; }
    .stat-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
    }
    
    .badge-emerald { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge-cyan { background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3); }
    .badge-violet { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); }
    .badge-amber { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }

    .stat-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .icon-emerald { background: rgba(16, 185, 129, 0.12); color: #10b981; }
    .icon-cyan { background: rgba(6, 182, 212, 0.12); color: #06b6d4; }
    .icon-violet { background: rgba(139, 92, 246, 0.12); color: #8b5cf6; }
    .icon-amber { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }

    /* 📊 Analytics Charts Container */
    .charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 22px;
    }

    .chart-card {
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(16px);
      border-radius: 20px;
      padding: 26px;
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .chart-header {
      font-size: 16px;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 22px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .canvas-container { position: relative; height: 320px; width: 100%; display: flex; align-items: center; justify-content: center; }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <div>
      <div class="brand-box">
        <a href="/admin/analysis" class="brand-title"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
        <div class="brand-sub">Platform Core</div>
      </div>
      <nav class="nav-links">
        <a href="/admin/students"><i class="fa-solid fa-graduation-cap"></i> Students</a>
        <a href="/admin/instructors"><i class="fa-solid fa-chalkboard-user"></i> Instructors</a>
        <a href="/admin/courses"><i class="fa-solid fa-book-open"></i> Courses</a>
        <a href="/admin/analysis" class="active"><i class="fa-solid fa-chart-line"></i> System Analysis</a>
      </nav>
    </div>
    <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <!-- Main Content -->
  <main class="main-wrapper">
    <div class="stats-grid">
      <!-- 1. Students -->
      <div class="stat-card">
        <div class="stat-info">
          <div class="stat-label">Total Students</div>
          <div class="stat-val">${studentCount}</div>
          <span class="stat-badge badge-emerald"><i class="fa-solid fa-arrow-trend-up"></i> Active Users</span>
        </div>
        <div class="stat-icon icon-emerald"><i class="fa-solid fa-graduation-cap"></i></div>
      </div>

      <!-- 2. Instructors -->
      <div class="stat-card">
        <div class="stat-info">
          <div class="stat-label">Total Instructors</div>
          <div class="stat-val">${instructorCount}</div>
          <span class="stat-badge badge-cyan"><i class="fa-solid fa-users"></i> Mentors</span>
        </div>
        <div class="stat-icon icon-cyan"><i class="fa-solid fa-user-tie"></i></div>
      </div>

      <!-- 3. Courses -->
      <div class="stat-card">
        <div class="stat-info">
          <div class="stat-label">Total Courses</div>
          <div class="stat-val">${courseCount}</div>
          <span class="stat-badge badge-violet"><i class="fa-solid fa-book"></i> Catalog</span>
        </div>
        <div class="stat-icon icon-violet"><i class="fa-solid fa-book-bookmark"></i></div>
      </div>

      <!-- 4. Modules -->
      <div class="stat-card">
        <div class="stat-info">
          <div class="stat-label">Course Modules</div>
          <div class="stat-val">${moduleCount}</div>
          <span class="stat-badge badge-amber"><i class="fa-solid fa-layer-group"></i> Chapters</span>
        </div>
        <div class="stat-icon icon-amber"><i class="fa-solid fa-list-check"></i></div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header">
          <i class="fa-solid fa-chart-column" style="color: #10b981;"></i> Platform Activity Distribution
        </div>
        <div class="canvas-container">
          <canvas id="distributionChart"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <i class="fa-solid fa-chart-pie" style="color: #06b6d4;"></i> User Ratio
        </div>
        <div class="canvas-container">
          <canvas id="ratioChart"></canvas>
        </div>
      </div>
    </div>
  </main>

  <script>
    const ctxBar = document.getElementById('distributionChart').getContext('2d');
    
    // Gradients for Modern Tech Look
    const gEmerald = ctxBar.createLinearGradient(0, 0, 0, 300);
    gEmerald.addColorStop(0, '#34d399');
    gEmerald.addColorStop(1, '#059669');

    const gCyan = ctxBar.createLinearGradient(0, 0, 0, 300);
    gCyan.addColorStop(0, '#38bdf8');
    gCyan.addColorStop(1, '#0891b2');

    const gViolet = ctxBar.createLinearGradient(0, 0, 0, 300);
    gViolet.addColorStop(0, '#a78bfa');
    gViolet.addColorStop(1, '#6d28d9');

    const gAmber = ctxBar.createLinearGradient(0, 0, 0, 300);
    gAmber.addColorStop(0, '#fcd34d');
    gAmber.addColorStop(1, '#d97706');

    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Students', 'Instructors', 'Courses', 'Modules'],
        datasets: [{
          data: [${studentCount}, ${instructorCount}, ${courseCount}, ${moduleCount}],
          backgroundColor: [gEmerald, gCyan, gViolet, gAmber],
          borderRadius: 10,
          barThickness: 45
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0, color: '#64748b', font: { weight: 600 } },
            grid: { color: 'rgba(255, 255, 255, 0.05)' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8', font: { weight: 600 } }
          }
        }
      }
    });

    const ctxPie = document.getElementById('ratioChart').getContext('2d');
    const totalUsers = ${studentCount} + ${instructorCount};

    new Chart(ctxPie, {
      type: 'doughnut',
      data: {
        labels: ['Students', 'Instructors'],
        datasets: [{
          data: totalUsers === 0 ? [1, 1] : [${studentCount}, ${instructorCount}],
          backgroundColor: totalUsers === 0 ? ['#1e293b', '#334155'] : ['#10b981', '#06b6d4'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { weight: 600 }, color: '#94a3b8', padding: 20 }
          }
        },
        cutout: '74%'
      }
    });
  </script>
</body>
</html>
  `;
};