/*
=====================================================
  Dr. Botany — Admin Page Logic
=====================================================
*/

const AdminPage = {
  activeTab: 'upload',

  tabs: [
    { id: 'upload', label: 'Upload PDF', icon: 'fa-cloud-upload-alt' },
    { id: 'books', label: 'Manage Books', icon: 'fa-book' },
    { id: 'notices', label: 'Notices', icon: 'fa-bullhorn' },
    { id: 'users', label: 'Users', icon: 'fa-users' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-chart-line' }
  ],

  init() {
    this.renderStats();
    this.renderTabs();
    this.renderContent();
  },

  renderStats() {
    const container = document.getElementById('adminStats');
    if (!container) return;

    const stats = [
      { label: 'Total Books', value: DrBotanyData.books.length, color: 'var(--green-400)' },
      { label: 'Question Papers', value: DrBotanyData.questions.length, color: '#fbbf24' },
      { label: 'Users', value: DrBotanyData.users.length, color: '#93c5fd' },
      { label: 'Downloads', value: '1.2K', color: '#c4b5fd' }
    ];

    container.innerHTML = stats.map(s => `
      <div class="card-glass admin-stat">
        <div class="admin-stat-value" style="color:${s.color}">${s.value}</div>
        <div style="font-size:12px;color:var(--text-dim)">${s.label}</div>
      </div>`).join('');
  },

  renderTabs() {
    const container = document.getElementById('adminTabs');
    if (!container) return;

    container.innerHTML = this.tabs.map(t => `
      <button class="tab-btn ${t.id === this.activeTab ? 'active' : ''}"
              onclick="AdminPage.setTab('${t.id}', this)">
        <i class="fas ${t.icon}" style="margin-right:6px"></i>${t.label}
      </button>`).join('');
  },

  setTab(tab, el) {
    this.activeTab = tab;
    document.querySelectorAll('#adminTabs .tab-btn').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    this.renderContent();
  },

  renderContent() {
    const container = document.getElementById('adminContent');
    if (!container) return;

    switch (this.activeTab) {

      case 'upload':
        container.innerHTML = `
          <div class="card-glass" style="padding:24px">
            <h3 style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:20px">Upload New Resource</h3>
            <div class="grid sm:grid-cols-2 gap-4 mb-4">
              <div class="input-group">
                <label class="input-label">Resource Type</label>
                <select class="input" id="uploadType">
                  <option value="book">Book</option>
                  <option value="note">Note</option>
                  <option value="question">Question Paper</option>
                  <option value="notice">Notice</option>
                </select>
              </div>
              <div class="input-group">
                <label class="input-label">Category</label>
                <select class="input" id="uploadCategory">
                  ${DrBotanyData.bookCategories.map(c => `<option value="${c.id}">${c.label}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="input-group">
              <label class="input-label">Title</label>
              <input type="text" class="input" id="uploadTitle" placeholder="Enter resource title">
            </div>
            <div class="input-group">
              <label class="input-label">Author / Source</label>
              <input type="text" class="input" id="uploadAuthor" placeholder="Author name or source">
            </div>
            <div class="input-group">
              <label class="input-label">Upload PDF</label>
              <div class="drop-zone" id="dropZone" onclick="document.getElementById('fileInput').click()">
                <i class="fas fa-cloud-upload-alt" style="font-size:32px;color:var(--green-400);margin-bottom:8px"></i>
                <p style="font-size:14px;color:var(--text-muted)">Drag and drop your PDF here or click to browse</p>
                <p style="font-size:12px;color:var(--text-dim);margin-top:4px">Supports PDF, DOC, DOCX up to 50MB</p>
                <input type="file" id="fileInput" accept=".pdf,.doc,.docx" style="display:none" onchange="AdminPage.handleFile(this)">
              </div>
              <div id="fileInfo" style="display:none;margin-top:8px;padding:8px 12px;border-radius:var(--radius-md);background:rgba(34,197,94,0.08);font-size:13px;color:var(--green-400)"></div>
            </div>
            <div class="grid sm:grid-cols-2 gap-4 mb-4">
              <div class="input-group">
                <label class="input-label">Semester</label>
                <select class="input" id="uploadSemester">
                  <option value="">Select Semester</option>
                  <option>1st</option><option>2nd</option><option>3rd</option><option>4th</option>
                  <option>5th</option><option>6th</option><option>7th</option><option>8th</option>
                </select>
              </div>
              <div class="input-group">
                <label class="input-label">Year</label>
                <input type="text" class="input" id="uploadYear" placeholder="e.g., 2024">
              </div>
            </div>
            <button onclick="AdminPage.handleUpload()" class="btn btn-primary btn-block">
              <i class="fas fa-upload"></i>Upload Resource
            </button>
          </div>`;

        /* Drag & Drop */
        const dz = document.getElementById('dropZone');
        if (dz) {
          dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('dragging'); });
          dz.addEventListener('dragleave', () => dz.classList.remove('dragging'));
          dz.addEventListener('drop', (e) => {
            e.preventDefault();
            dz.classList.remove('dragging');
            if (e.dataTransfer.files.length) {
              document.getElementById('fileInput').files = e.dataTransfer.files;
              AdminPage.handleFile(document.getElementById('fileInput'));
            }
          });
        }
        break;

      case 'books':
        container.innerHTML = `
          <div class="card-glass" style="padding:0;overflow:hidden">
            <div style="overflow-x:auto">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th class="hidden sm:table-cell">Author</th>
                    <th class="hidden md:table-cell">Category</th>
                    <th class="hidden lg:table-cell">Semester</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${DrBotanyData.books.map(b => `
                    <tr>
                      <td style="color:var(--text-primary)">${b.title}</td>
                      <td class="hidden sm:table-cell">${b.author}</td>
                      <td class="hidden md:table-cell"><span class="badge badge-green">${b.categoryLabel}</span></td>
                      <td class="hidden lg:table-cell">${b.semester}</td>
                      <td>
                        <div class="flex gap-2">
                          <button onclick="Toast.info('Edit mode — connect Firebase')" class="btn-icon-sm btn-ghost" style="color:var(--green-400)"><i class="fas fa-edit"></i></button>
                          <button onclick="Toast.warning('Deleted — connect Firebase')" class="btn-icon-sm btn-ghost" style="color:#f87171"><i class="fas fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>`;
        break;

      case 'notices':
        container.innerHTML = `
          <div class="card-glass" style="padding:24px;margin-bottom:20px">
            <h3 style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:16px">Publish New Notice</h3>
            <div class="input-group">
              <label class="input-label">Notice Title</label>
              <input type="text" class="input" id="noticeTitle" placeholder="Enter notice title">
            </div>
            <div class="input-group">
              <label class="input-label">Type</label>
              <select class="input" id="noticeType">
                <option value="exam">Exam</option>
                <option value="class">Class</option>
                <option value="seminar">Seminar</option>
                <option value="result">Result</option>
                <option value="general">General</option>
              </select>
            </div>
            <div class="input-group">
              <label class="input-label">Content</label>
              <textarea class="input" id="noticeContent" rows="4" placeholder="Notice content..."></textarea>
            </div>
            <button onclick="AdminPage.publishNotice()" class="btn btn-primary btn-block">
              <i class="fas fa-paper-plane"></i>Publish Notice
            </button>
          </div>

          <div class="space-y-3">
            <h4 style="font-size:14px;font-weight:600;color:var(--text-muted);margin-bottom:12px">Existing Notices</h4>
            ${DrBotanyData.notices.map(n => `
              <div class="card-glass" style="padding:16px;display:flex;align-items:center;justify-content:space-between">
                <div>
                  <div style="font-size:14px;color:var(--text-primary)">${n.title}</div>
                  <div style="font-size:12px;color:var(--text-dim)">${n.date} · ${n.type}</div>
                </div>
                <div class="flex gap-2">
                  <button onclick="Toast.info('Edit — connect Firebase')" class="btn-icon-sm btn-ghost" style="color:var(--green-400)"><i class="fas fa-edit"></i></button>
                  <button onclick="Toast.warning('Deleted — connect Firebase')" class="btn-icon-sm btn-ghost" style="color:#f87171"><i class="fas fa-trash"></i></button>
                </div>
              </div>`).join('')}
          </div>`;
        break;

      case 'users':
        container.innerHTML = `
          <div class="card-glass" style="padding:0;overflow:hidden">
            <div style="overflow-x:auto">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="hidden sm:table-cell">Email</th>
                    <th class="hidden md:table-cell">Semester</th>
                    <th>Role</th>
                    <th class="hidden lg:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  ${DrBotanyData.users.map(u => `
                    <tr>
                      <td style="color:var(--text-primary)">${u.name}</td>
                      <td class="hidden sm:table-cell">${u.email}</td>
                      <td class="hidden md:table-cell">${u.semester}</td>
                      <td>
                        <span class="badge ${u.role === 'admin' ? 'badge-red' : u.role === 'moderator' ? 'badge-amber' : 'badge-green'}">
                          ${u.role}
                        </span>
                      </td>
                      <td class="hidden lg:table-cell">${u.joinDate}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>`;
        break;

      case 'analytics':
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const values = [35, 48, 22, 60, 45, 72, 55];
        const maxVal = Math.max(...values);

        const categories = [
          { name: 'Cell Biology', pct: 85 },
          { name: 'Genetics', pct: 72 },
          { name: 'Physiology', pct: 65 },
          { name: 'Microbiology', pct: 48 },
          { name: 'Ecology', pct: 35 }
        ];

        container.innerHTML = `
          <div class="grid sm:grid-cols-2 gap-4">
            <!-- Downloads Chart -->
            <div class="card-glass" style="padding:20px">
              <h4 style="font-size:14px;font-weight:600;color:var(--text-secondary);margin-bottom:16px">Downloads This Week</h4>
              <div class="admin-chart-bar">
                ${values.map(v => `
                  <div class="admin-chart-bar-item" style="height:${(v / maxVal) * 100}%" title="${v} downloads"></div>`).join('')}
              </div>
              <div class="flex justify-between mt-2" style="font-size:10px;color:var(--text-dim)">
                ${days.map(d => `<span>${d}</span>`).join('')}
              </div>
            </div>

            <!-- Popular Categories -->
            <div class="card-glass" style="padding:20px">
              <h4 style="font-size:14px;font-weight:600;color:var(--text-secondary);margin-bottom:16px">Popular Categories</h4>
              <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px">
                ${categories.map(c => `
                  <div>
                    <div class="flex justify-between" style="font-size:13px;margin-bottom:4px">
                      <span style="color:var(--text-secondary)">${c.name}</span>
                      <span style="color:var(--text-dim)">${c.pct}%</span>
                    </div>
                    <div class="progress-bar progress-green">
                      <div class="progress-bar-fill" style="width:${c.pct}%"></div>
                    </div>
                  </div>`).join('')}
              </div>
            </div>
          </div>`;
        break;
    }
  },

  handleFile(input) {
    const fileInfo = document.getElementById('fileInfo');
    if (input.files && input.files[0]) {
      const file = input.files[0];
      fileInfo.style.display = 'block';
      fileInfo.innerHTML = `<i class="fas fa-file-pdf" style="margin-right:8px"></i>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    }
  },

  handleUpload() {
    const title = document.getElementById('uploadTitle')?.value;
    const author = document.getElementById('uploadAuthor')?.value;
    if (!title) { Toast.warning('Please enter a title'); return; }
    if (!author) { Toast.warning('Please enter author/source'); return; }
    Toast.success('Resource uploaded successfully!');
    /* Firebase কানেক্ট করলে এখানে Firestore এ ডেটা সেভ এবং Storage এ ফাইল আপলোড করবে */
  },

  publishNotice() {
    const title = document.getElementById('noticeTitle')?.value;
    const content = document.getElementById('noticeContent')?.value;
    if (!title) { Toast.warning('Please enter notice title'); return; }
    if (!content) { Toast.warning('Please enter notice content'); return; }
    Toast.success('Notice published successfully!');
    /* Firebase কানেক্ট করলে এখানে Firestore এ নোটিশ সেভ করবে */
  }
};
