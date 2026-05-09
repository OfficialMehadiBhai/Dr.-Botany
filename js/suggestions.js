
/*
=====================================================
  Dr. Botany — Suggestions Page Logic
=====================================================
*/

const SuggestionsPage = {
  activeTab: 'subjects',

  tabs: [
    { id: 'subjects', label: 'Subject Suggestions', icon: 'fa-book' },
    { id: 'viva', label: 'Viva Suggestions', icon: 'fa-comment-dots' },
    { id: 'shortNotes', label: 'Short Notes', icon: 'fa-sticky-note' },
    { id: 'examPrep', label: 'Exam Preparation', icon: 'fa-graduation-cap' }
  ],

  init() {
    this.renderTabs();
    this.renderContent();
  },

  renderTabs() {
    const container = document.getElementById('suggestionTabs');
    if (!container) return;

    container.innerHTML = this.tabs.map(t => `
      <button class="tab-btn ${t.id === this.activeTab ? 'active' : ''}"
              onclick="SuggestionsPage.setTab('${t.id}', this)">
        <i class="fas ${t.icon}" style="margin-right:6px"></i>${t.label}
      </button>`).join('');
  },

  setTab(tab, el) {
    this.activeTab = tab;
    document.querySelectorAll('#suggestionTabs .tab-btn').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    this.renderContent();
  },

  renderContent() {
    const container = document.getElementById('suggestionsContent');
    if (!container) return;

    const data = DrBotanyData.suggestions;

    switch (this.activeTab) {
      case 'subjects':
        container.innerHTML = data.subjects.map(s => `
          <div class="card-glass" style="padding:24px;margin-bottom:16px">
            <div class="flex items-center gap-3 mb-4">
              <div class="cat-icon ${s.importance === 'high' ? 'cat-icon-red' : 'cat-icon-amber'}">
                <i class="fas fa-exclamation"></i>
              </div>
              <div>
                <h3 style="font-size:18px;font-weight:600;color:var(--text-primary)">${s.subject}</h3>
                <span class="badge ${s.importance === 'high' ? 'badge-red' : 'badge-amber'}" style="margin-top:4px">
                  ${s.importance === 'high' ? 'High Priority' : 'Medium Priority'}
                </span>
              </div>
            </div>
            <ul style="list-style:none;padding:0">
              ${s.topics.map(t => `
                <li style="display:flex;align-items:flex-start;gap:8px;padding:8px 0;border-bottom:1px solid var(--border-subtle)">
                  <i class="fas fa-check-circle" style="color:var(--green-400);margin-top:3px;flex-shrink:0"></i>
                  <span style="font-size:14px;color:var(--text-secondary)">${t}</span>
                </li>`).join('')}
            </ul>
          </div>`).join('');
        break;

      case 'viva':
        container.innerHTML = data.viva.map(s => `
          <div class="card-glass" style="padding:24px;margin-bottom:16px">
            <h3 style="font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:16px">
              <i class="fas fa-comment-dots" style="color:var(--green-400);margin-right:8px"></i>${s.subject} Viva
            </h3>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${s.questions.map((q, i) => `
                <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;border-radius:var(--radius-md);background:var(--bg-input)">
                  <span style="width:28px;height:28px;border-radius:8px;background:rgba(34,197,94,0.1);color:var(--green-400);font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i + 1}</span>
                  <span style="font-size:14px;color:var(--text-secondary)">${q}</span>
                </div>`).join('')}
            </div>
          </div>`).join('');
        break;

      case 'shortNotes':
        container.innerHTML = data.shortNotes.map(s => `
          <div class="card-glass" style="padding:24px;margin-bottom:16px">
            <h3 style="font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:12px">
              <i class="fas fa-sticky-note" style="color:var(--green-400);margin-right:8px"></i>${s.title}
            </h3>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.7">${s.content}</p>
          </div>`).join('');
        break;

      case 'examPrep':
        container.innerHTML = data.examPrep.map(s => `
          <div class="card-glass" style="padding:24px;margin-bottom:16px">
            <h3 style="font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:12px">
              <i class="fas fa-graduation-cap" style="color:var(--green-400);margin-right:8px"></i>${s.title}
            </h3>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.7">${s.content}</p>
          </div>`).join('');
        break;
    }
  }
};
