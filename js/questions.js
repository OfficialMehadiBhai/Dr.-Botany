/*
=====================================================
  Dr. Botany — Questions Page Logic
=====================================================
*/

const QuestionsPage = {
  init() {
    this.render();
  },

  getFiltered() {
    const sem = document.getElementById('qSemester')?.value || 'all';
    const year = document.getElementById('qYear')?.value || 'all';
    const subj = document.getElementById('qSubject')?.value || 'all';

    return DrBotanyData.questions.filter(q => {
      const matchSem = sem === 'all' || q.semester === sem;
      const matchYear = year === 'all' || q.year.toString() === year;
      const matchSubj = subj === 'all' || q.category === subj;
      return matchSem && matchYear && matchSubj;
    });
  },

  render() {
    const filtered = this.getFiltered();
    const list = document.getElementById('questionsList');
    if (!list) return;

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-search"></i></div>
          <div class="empty-state-title">No questions found</div>
          <div class="empty-state-desc">Try adjusting your filters</div>
        </div>`;
      return;
    }

    list.innerHTML = filtered.map(q => `
      <div class="card question-card">
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <h3 style="font-size:16px;font-weight:600;color:var(--text-primary)">${q.subject}</h3>
            ${q.repeated >= 3 ? `<span class="badge badge-amber"><i class="fas fa-fire" style="margin-right:3px"></i>${q.repeated} Repeated</span>` : ''}
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-green">${q.semester} Semester</span>
            <span class="badge" style="background:var(--bg-input);color:var(--text-dim)">Year: ${q.year}</span>
            <span class="badge" style="background:var(--bg-input);color:var(--text-dim)">${q.totalQuestions} Questions</span>
          </div>
        </div>
        <div class="flex gap-2 flex-shrink-0 mt-2 sm:mt-0">
          <button onclick="QuestionsPage.viewPDF('${q.subject} - ${q.year}','${q.pdfUrl}')" class="btn btn-primary btn-sm">
            <i class="fas fa-eye"></i>View
          </button>
          <button onclick="PDFConfig.download('${q.pdfUrl}','${q.subject}-${q.year}.pdf');Toast.success('Download started!')" class="btn btn-secondary btn-sm">
            <i class="fas fa-download"></i>
          </button>
        </div>
      </div>`).join('');
  },

  viewPDF(title, url) {
    document.getElementById('pdfTitle').textContent = title;
    document.getElementById('pdfViewerContent').innerHTML = `
      <div class="text-center">
        <i class="fas fa-file-pdf" style="font-size:48px;color:var(--green-400);margin-bottom:16px"></i>
        <p style="color:var(--text-secondary);font-weight:600">${title}</p>
        <p style="color:var(--text-dim);font-size:13px;margin-top:4px">Question paper preview</p>
      </div>`;
    document.getElementById('pdfDownloadBtn').onclick = () => {
      PDFConfig.download(url, title + '.pdf');
      Toast.success('Download started!');
    };
    openModal('pdfModal');
  }
};
