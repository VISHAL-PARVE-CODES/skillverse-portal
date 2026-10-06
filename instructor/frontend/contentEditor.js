module.exports = function(currentTopic, allTopics = [], courseId = '', chapterName = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillVerse - Edit Content</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; font-family: system-ui, -apple-system, sans-serif; }
    html, body { min-height: 100vh; width: 100%; overflow-x: hidden; }

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
      padding-left: 8px;
      margin-bottom: 25px;
    }
    .brand-title i { -webkit-text-fill-color: initial; color: #10b981; }

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
    .nav-links a:hover { background: rgba(255, 255, 255, 0.05); color: #fff; transform: translateX(4px); }
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
      gap: 8px;
    }

    .main-wrapper {
      margin-left: 280px;
      flex: 1;
      padding: 40px;
      display: flex;
      justify-content: center;
      min-width: 0;
    }

    .editor-card {
      background: rgba(15, 23, 36, 0.65);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      width: 100%;
      max-width: 780px;
      padding: 35px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }

    .form-group { margin-bottom: 20px; }
    label { display: block; font-size: 13px; font-weight: 600; color: #94a3b8; margin-bottom: 6px; }
    .form-control {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      background: rgba(0, 0, 0, 0.35);
      color: #f8fafc;
    }

    .yt-wrapper { display: flex; gap: 10px; }
    .btn-embed {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.3);
      padding: 11px 18px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }

    .editor-box {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.25);
    }
    .toolbar {
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding: 8px 12px;
      display: flex;
      gap: 8px;
    }
    .tb-btn {
      background: none;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 5px 8px;
      cursor: pointer;
      font-size: 13px;
      color: #94a3b8;
      font-weight: 600;
    }
    .tb-btn:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }

    .editor-area {
      min-height: 220px;
      padding: 14px;
      outline: none;
      font-size: 14.5px;
      color: #cbd5e1;
      line-height: 1.6;
    }

    .btn-save {
      background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
      color: white;
      border: none;
      padding: 12px 28px;
      border-radius: 12px;
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 25px;
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
    }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div>
      <a href="/instructor/courses" class="brand-title"><i class="fa-solid fa-graduation-cap"></i> SkillVerse</a>
      <nav class="nav-links">
        <a href="/instructor/courses"><i class="fa-solid fa-table-cells-large"></i> My Courses</a>
        <a href="/instructor/create-course"><i class="fa-solid fa-square-plus"></i> Create Course</a>
        <a href="/instructor/chapters-topics"><i class="fa-solid fa-layer-group"></i> Chapters & Topics</a>
        <a href="/instructor/content-add" class="active"><i class="fa-solid fa-video"></i> Add Content</a>
        <a href="/instructor/profile"><i class="fa-solid fa-circle-user"></i> My Profile</a>
        <a href="/instructor/change-password"><i class="fa-solid fa-key"></i> Change Password</a>
      </nav>
    </div>
    <a href="/logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
  </aside>

  <main class="main-wrapper">
    <div class="editor-card">
      <div class="form-group">
        <label>Select Topic</label>
        <select class="form-control" onchange="location = '/instructor/content-editor?course_id=${courseId}&chapter=' + encodeURIComponent('${chapterName}') + '&topic_id=' + this.value;">
          ${allTopics.map(t => `
            <option value="${t._id}" ${String(t._id) === String(currentTopic._id) ? 'selected' : ''}>${t.topic || t.title}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="form-group">
        <label><i class="fa-brands fa-youtube" style="color:#ef4444;"></i> Video URL</label>
        <div class="yt-wrapper">
          <input type="url" id="videoInput" class="form-control" placeholder="Paste YouTube link" value="${currentTopic.videoUrl || ''}">
          <button type="button" class="btn-embed" onclick="embedVideo()"><i class="fa-solid fa-play"></i> Embed</button>
        </div>
      </div>

      <form action="/instructor/content-save" method="POST" onsubmit="prepareSubmit()">
        <input type="hidden" name="topicId" value="${currentTopic._id}">
        <input type="hidden" name="videoUrl" id="hiddenVideoUrl" value="${currentTopic.videoUrl || ''}">
        <input type="hidden" name="content" id="hiddenContent">

        <div class="form-group">
          <label>Topic Content / Notes</label>
          <div class="editor-box">
            <div class="toolbar">
              <button type="button" class="tb-btn" onclick="document.execCommand('bold')"><b>B</b></button>
              <button type="button" class="tb-btn" onclick="document.execCommand('italic')"><i>I</i></button>
              <button type="button" class="tb-btn" onclick="document.execCommand('underline')"><u>U</u></button>
              <button type="button" class="tb-btn" onclick="document.execCommand('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button>
            </div>
            <div id="editor" class="editor-area" contenteditable="true">
              ${currentTopic.content || ''}
            </div>
          </div>
        </div>

        <button type="submit" class="btn-save">Save Content</button>
      </form>
    </div>
  </main>

  <script>
    function embedVideo() {
      const url = document.getElementById('videoInput').value.trim();
      if(!url) return;
      let videoId = '';
      if(url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
      else if(url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];

      if(videoId) {
        document.getElementById('editor').innerHTML += '<p><iframe width="100%" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen style="border-radius:10px;"></iframe></p><br>';
      }
    }
    function prepareSubmit() {
      document.getElementById('hiddenContent').value = document.getElementById('editor').innerHTML;
      document.getElementById('hiddenVideoUrl').value = document.getElementById('videoInput').value;
    }
  </script>
</body>
</html>
  `;
};