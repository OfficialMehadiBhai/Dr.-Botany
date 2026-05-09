
/*
=====================================================
  Dr. Botany — Notes Page Logic
=====================================================
*/

const NotesPage = {
  activeFilter: 'all',

  init() {
    this.renderFilters();
    this.render();
  },

  renderFilters() {
    const container = document.getElementById('noteFilters');
    if (!container) return;

    container.innerHTML = DrBotanyData.noteTypes.map(t => `
      <button class="chip ${t.id === this.activeFilter ? 'active' : ''}"
              onclick="NotesPage.setFilter('${t.id}', this)">
        ${t.label}
      </button>`).join('');
  },

  setFilter(type, el) {
    this.activeFilter = type;
    document.querySelectorAll('#noteFilters .chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    this.render();
  },

  getFiltered() {
    if (this.activeFilter === 'all') return DrBotanyData.notes;
    return DrBotanyData.notes.filter(n => n.type === this.activeFilter);
  },

  render() {
    const filtered = this.getFiltered();
    const grid = document.getElementById('notesGrid');
    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state-icon"><i class="fas fa-folder-open"></i></div>
          <div class="empty-state-title">No notes found</div>
          <div class="empty-state-desc">Try a different filter</div>
        </div>`;
      return;
    }

    const typeConfig = {
      handwritten: { icon: 'fa-pen-fancy',    colorClass: 'cat-icon-purple' },
      teacher:     { icon: 'fa-chalkboard-teacher', colorClass: 'cat-icon-amber' },
      class:       { icon: 'fa-book-open',     colorClass: 'cat-icon-blue' },
      practical:   { icon: 'fa-flask',         colorClass: 'cat-icon-teal' },
      lab:         { icon: 'fa-microscope',    colorClass: 'cat-icon-red' }
    };

    grid.innerHTML = filtered.map(n => {
      const cfg = typeConfig[n.type] || typeConfig.class;
      return `
        <div class="card-glass" style="padding:20px">
          <div class="flex items-start gap-4 mb-4">
            <div class="cat-icon ${cfg.colorClass}">
              <i class="fas ${cfg.icon}"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h3 style="font-size:14px;font-weight:600;color:var(--text-primary)" class="line-clamp-2">${n.title}</h3>
              <p style="font-size:12px;color:var(--text-dim);margin-top:2px">${n.author}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="badge badge-green">${n.subject}</span>
            <span class="badge" style="background:var(--bg-input);color:var(--text-dim)">${n.semester} Sem</span>
            <span class="badge" style="background:var(--bg-input);color:var(--text-dim)">${n.pages} pages</span>
          </div>
          <div class="flex items-center justify-between">
            <span style="font-size:12px;color:var(--text-dim)">${n.date}</span>
            <div class="flex gap-2">
              <button onclick="NotesPage.viewPDF('${n.title}','${n.pdfUrl}')" class="btn btn-primary btn-sm">
                <i class="fas fa-eye"></i>View
              </button>
              <button onclick="PDFConfig.download('${n.pdfUrl}','${n.title}.pdf');Toast.success('Download started!')" class="btn btn-secondary btn-sm">
                <i class="fas fa-download"></i>
              </button>
            </div>
          </div>
        </div>`;
    }).join('');
  },

  viewPDF(title, url) {
    document.getElementById('pdfTitle').textContent = title;
    document.getElementById('pdfViewerContent').innerHTML = `
      <div class="text-center">
        <i class="fas fa-file-pdf" style="font-size:48px;color:var(--green-400);margin-bottom:16px"></i>
        <p style="color:var(--text-secondary);font-weight:600">${title}</p>
        <p style="color:var(--text-dim);font-size:13px;margin-top:4px">Notes preview would render here</p>
      </div>`;
    document.getElementById('pdfDownloadBtn').onclick = () => {
      PDFConfig.download(url, title + '.pdf');
      Toast.success('Download started!');
    };
    openModal('pdfModal');
  }
};
