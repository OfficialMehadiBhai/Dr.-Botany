/*
=====================================================
  Dr. Botany — Admin Page Logic (Fully Functional)
=====================================================
*/

const AdminPage = {
  currentTab: 'upload',
  selectedFile: null,

  init() {
    // অ্যাডমিন চেক - যদি অ্যাডমিন না হয়, পেজে ঢুকতে পারবে না
    if (!Auth.requireAdmin()) return;

    this.renderStats();
    this.render();
    
    // ড্র্যাগ এন্ড ড্রপ ইফেক্ট
    this.setupDropZone();
  },

  renderStats() {
    const container = document.getElementById('adminStats');
    if (!container) return;

    const stats = [
      { label: 'Total Books', value: DrBotanyData.books.length, icon: 'fa-book', color: 'var(--green-400)' },
      { label: 'Question Papers', value: '380', icon: 'fa-file-alt', color: '#fbbf24' },
      { label: 'Users', value: '520', icon: 'fa-users', color: '#93c5fd' },
      { label: 'Notices', value: DrBotanyData.notices.length, icon: 'fa-bullhorn', color: '#c4b5fd' }
    ];

    container.innerHTML = stats.map(s => `
      <div class="card-glass admin-stat" style="border-radius:var(--radius-2xl)">
        <div style="font-size:14px;color:var(--text-dim);margin-bottom:8px"><i class="fas ${s.icon}" style="margin-right:6px;color:${s.color}"></i>${s.label}</div>
        <div class="admin-stat-value" style="color:${s.color}">${s.value}</div>
      </div>`).join('');
  },

  setTab(tab, el) {
    this.currentTab = tab;
    document.querySelectorAll('#adminTabs .tab-btn').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    this.render();
  },

  setupDropZone() {
    setTimeout(() => {
      const dropZone = document.getElementById('dropZone');
      const fileInput = document.getElementById('pdfFileInput');
      if(!dropZone || !fileInput) return;

      dropZone.addEventListener('click', () => fileInput.click());

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragging');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragging');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragging');
        if (e.dataTransfer.files.length) {
          fileInput.files = e.dataTransfer.files;
          this.handleFileSelect(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if(e.target.files.length) {
          this.handleFileSelect(e.target.files[0]);
        }
      });
    }, 100);
  },

  handleFileSelect(file) {
    this.selectedFile = file;
    const fileNameDisplay = document.getElementById('selectedFileName');
    if(fileNameDisplay) {
      fileNameDisplay.textContent = file.name;
      fileNameDisplay.style.display = 'block';
    }
  },

  render() {
    const container = document.getElementById('adminContent');
    if (!container) return;

    switch(this.currentTab) {
      case 'upload':
        container.innerHTML = `
          <div class="card-glass p-6" style="border-radius:var(--radius-2xl)">
            <h3 style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:20px">Upload New Resource</h3>
            <form id="uploadForm" onsubmit="AdminPage.handleUpload(event)">
              <div class="grid sm:grid-cols-2 gap-4 mb-4">
                <div class="input-group">
                  <label class="input-label">Resource Type</label>
                  <select class="input" id="uploadType"><option>Book</option><option>Note</option><option>Question Paper</option></select>
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
                <input type="text" class="input" id="uploadTitle" placeholder="Enter resource title" required>
              </div>
              <div class="input-group">
                <label class="input-label">Author / Source</label>
                <input type="text" class="input" id="uploadAuthor" placeholder="Author name or source" required>
              </div>
              <div class="input-group">
                <label class="input-label">Upload PDF</label>
                <input type="file" id="pdfFileInput" accept=".pdf" hidden>
                <div class="drop-zone" id="dropZone">
                  <i class="fas fa-cloud-upload-alt" style="font-size:36px;color:var(--green-400);margin-bottom:8px"></i>
                  <p style="font-size:14px;color:var(--text-muted)">Drag and drop your PDF here or click to browse</p>
                  <p style="font-size:12px;color:var(--text-dim);margin-top:4px">Supports PDF files up to 50MB</p>
                  <p id="selectedFileName" style="font-size:14px;color:var(--green-400);margin-top:12px;font-weight:600;display:none"></p>
                </div>
              </div>
              <div class="grid sm:grid-cols-2 gap-4 mb-6">
                <div class="input-group">
                  <label class="input-label">Semester</label>
                  <select class="input" id="uploadSemester"><option value="">Select</option><option>1st</option><option>2nd</option><option>3rd</option><option>4th</option><option>5th</option><option>6th</option><option>7th</option><option>8th</option></select>
                </div>
                <div class="input-group">
                  <label class="input-label">Year</label>
                  <input type="text" class="input" id="uploadYear" placeholder="e.g., 2024">
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block btn-lg">
                <i class="fas fa-upload"></i>Upload Resource
              </button>
            </form>
          </div>`;
        this.setupDropZone(); // রি-রেন্ডার হলে আবার ইফেক্ট সেটআপ
        break;

      case 'books':
        container.innerHTML = `
          <div class="card-glass" style="border-radius:var(--radius-2xl);overflow:hidden">
            <div style="overflow-x:auto">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th class="hidden sm:table-cell">Author</th>
                    <th class="hidden md:table-cell">Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${DrBotanyData.books.map(b => `
                    <tr>
                      <td style="color:var(--text-primary)">${b.title}</td>
                      <td class="hidden sm:table-cell">${b.author}</td>
                      <td class="hidden md:table-cell"><span class="badge badge-green">${b.categoryLabel}</span></td>
                      <td>
                        <div class="flex gap-2">
                          <button class="btn-icon-sm btn-ghost" style="color:var(--green-400)" onclick="Toast.info('Edit mode — connect Firebase')"><i class="fas fa-edit"></i></button>
                          <button class="btn-icon-sm btn-ghost" style="color:#f87171" onclick="AdminPage.deleteBook('${b.id}')"><i class="fas fa-trash"></i></button>
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
          <div class="card-glass p-6 mb-6" style="border-radius:var(--radius-2xl)">
            <h3 style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:20px">Publish New Notice</h3>
            <form onsubmit="AdminPage.publishNotice(event)">
              <div class="input-group">
                <label class="input-label">Notice Title</label>
                <input type="text" class="input" id="noticeTitle" placeholder="Enter notice title" required>
              </div>
              <div class="input-group">
                <label class="input-label">Type</label>
                <select class="input" id="noticeType"><option value="exam">Exam</option><option value="class">Class</option><option value="seminar">Seminar</option><option value="result">Result</option><option value="general">General</option></select>
              </div>
              <div class="input-group">
                <label class="input-label">Content</label>
                <textarea class="input" id="noticeContent" rows="4" placeholder="Notice content..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                <i class="fas fa-paper-plane"></i>Publish Notice
              </button>
            </form>
          </div>
          <div class="space-y-3">
            ${DrBotanyData.notices.map(n => `
              <div class="card-glass p-4 flex items-center justify-between" style="border-radius:var(--radius-lg)">
                <div>
                  <div style="font-size:14px;color:var(--text-primary)">${n.title}</div>
                  <div style="font-size:12px;color:var(--text-dim)">${n.date}</div>
                </div>
                <button class="btn-icon-sm btn-ghost" style="color:#f87171" onclick="AdminPage.deleteNotice('${n.id}')"><i class="fas fa-trash"></i></button>
              </div>`).join('')}
          </div>`;
        break;

      case 'users':
        container.innerHTML = `
          <div class="card-glass" style="border-radius:var(--radius-2xl);overflow:hidden">
            <div style="overflow-x:auto">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th class="hidden sm:table-cell">Email</th>
                    <th class="hidden md:table-cell">Semester</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  ${DrBotanyData.users.map(u => `
                    <tr>
                      <td style="color:var(--text-primary)">${u.name}</td>
                      <td class="hidden sm:table-cell">${u.email}</td>
                      <td class="hidden md:table-cell">${u.semester}</td>
                      <td><span class="badge ${u.role === 'admin' ? 'badge-red' : 'badge-green'}">${u.role}</span></td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>`;
        break;

      case 'analytics':
        const barData = [35, 48, 22, 60, 45, 72, 55];
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const categories = [
          { name: 'Cell Biology', pct: 85 },
          { name: 'Genetics', pct: 72 },
          { name: 'Physiology', pct: 65 },
          { name: 'Microbiology', pct: 48 },
          { name: 'Ecology', pct: 35 }
        ];

        container.innerHTML = `
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="card-glass p-5" style="border-radius:var(--radius-2xl)">
              <h4 style="font-size:14px;font-weight:600;color:var(--text-secondary);margin-bottom:16px">Downloads This Week</h4>
              <div class="admin-chart-bar">
                ${barData.map(v => `<div class="admin-chart-bar-item" style="height:${v}%"></div>`).join('')}
              </div>
              <div class="flex justify-between mt-2" style="font-size:10px;color:var(--text-dim)">
                ${days.map(d => `<span>${d}</span>`).join('')}
              </div>
            </div>
            <div class="card-glass p-5" style="border-radius:var(--radius-2xl)">
              <h4 style="font-size:14px;font-weight:600;color:var(--text-secondary);margin-bottom:16px">Popular Categories</h4>
              <div class="space-y-3">
                ${categories.map(c => `
                  <div>
                    <div class="flex justify-between" style="font-size:12px;margin-bottom:4px">
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

  // ═══ আপলোড হ্যান্ডলার ═══
  handleUpload(e) {
    e.preventDefault();

    const title = document.getElementById('uploadTitle').value;
    const author = document.getElementById('uploadAuthor').value;
    const category = document.getElementById('uploadCategory').value;
    const semester = document.getElementById('uploadSemester').value || 'N/A';
    const year = document.getElementById('uploadYear').value || new Date().getFullYear();
    const type = document.getElementById('uploadType').value;

    // ক্যাটেগরি লেবেল বের করা
    const catObj = DrBotanyData.bookCategories.find(c => c.id === category);
    const categoryLabel = catObj ? catObj.label : category;

    // নতুন বই/রিসোর্স অবজেক্ট তৈরি
    const newResource = {
      id: 'book-' + Date.now(),
      title: title,
      author: author,
      category: category,
      categoryLabel: categoryLabel,
      semester: semester,
      year: parseInt(year),
      pages: 0,
      trending: false,
      cover: `https://picsum.photos/seed/${Date.now()}/300/420.jpg`,
      description: `Uploaded by Admin. Type: ${type}`,
      pdfUrl: this.selectedFile ? `uploads/${this.selectedFile.name}` : `pdfs/${category}/${title.toLowerCase().replace(/\s+/g, '-')}.pdf`
    };

    // ডেটাতে যোগ করা এবং সেভ করা
    DrBotanyData.books.unshift(newResource);
    saveBooksData();

    Toast.success(`"${title}" uploaded successfully!`);
    this.renderStats();
    
    // ফর্ম রিসেট
    e.target.reset();
    this.selectedFile = null;
    document.getElementById('selectedFileName').style.display = 'none';
  },

  // ═══ বই ডিলিট হ্যান্ডলার ═══
  deleteBook(id) {
    if(confirm('Are you sure you want to delete this resource?')) {
      DrBotanyData.books = DrBotanyData.books.filter(b => b.id !== id);
      saveBooksData();
      Toast.warning('Resource deleted successfully!');
      this.renderStats();
      this.render(); // টেবিল রি-রেন্ডার
    }
  },

  // ═══ নোটিশ পাবলিশ হ্যান্ডলার ═══
  publishNotice(e) {
    e.preventDefault();

    const title = document.getElementById('noticeTitle').value;
    const type = document.getElementById('noticeType').value;
    const content = document.getElementById('noticeContent').value;

    const newNotice = {
      id: 'n-' + Date.now(),
      title: title,
      type: type,
      date: new Date().toISOString().split('T')[0],
      isNew: true,
      content: content
    };

    DrBotanyData.notices.unshift(newNotice);
    saveNoticesData();

    Toast.success('Notice published successfully!');
    this.renderStats();
    this.render();
  },

  // ═══ নোটিশ ডিলিট হ্যান্ডলার ═══
  deleteNotice(id) {
    if(confirm('Are you sure you want to delete this notice?')) {
      DrBotanyData.notices = DrBotanyData.notices.filter(n => n.id !== id);
      saveNoticesData();
      Toast.warning('Notice deleted successfully!');
      this.renderStats();
      this.render();
    }
  }
};
