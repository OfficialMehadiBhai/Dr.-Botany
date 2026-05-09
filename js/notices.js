
/*
=====================================================
  Dr. Botany — Notices Page Logic
=====================================================
*/

const NoticesPage = {
  activeFilter: 'all',

  init() {
    this.renderFilters();
    this.render();
  },

  renderFilters() {
    const container = document.getElementById('noticeFilters');
    if (!container) return;

    container.innerHTML = DrBotanyData.noticeTypes.map(t => `
      <button class="chip ${t.id === this.activeFilter ? 'active' : ''}"
              onclick="NoticesPage.setFilter('${t.id}', this)">
        ${t.label}
      </button>`).join('');
  },

  setFilter(type, el) {
    this.activeFilter = type;
    document.querySelectorAll('#noticeFilters .chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    this.render();
  },

  getFiltered() {
    if (this.activeFilter === 'all') return DrBotanyData.notices;
    return DrBotanyData.notices.filter(n => n.type === this.activeFilter);
  },

  render() {
    const filtered = this.getFiltered();
    const list = document.getElementById('noticesList');
    if (!list) return;

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-bell-slash"></i></div>
          <div class="empty-state-title">No notices found</div>
          <div class="empty-state-desc">Check back later for updates</div>
        </div>`;
      return;
    }

    const typeConfig = {
      exam:     { icon: 'fa-calendar-alt', colorClass: 'cat-icon-red',    badgeClass: 'badge-red' },
      class:    { icon: 'fa-chalkboard',   colorClass: 'cat-icon-blue',   badgeClass: 'badge-blue' },
      seminar:  { icon: 'fa-microphone',   colorClass: 'cat-icon-purple', badgeClass: 'badge-purple' },
      result:   { icon: 'fa-chart-bar',    colorClass: 'cat-icon-amber',  badgeClass: 'badge-amber' },
      general:  { icon: 'fa-info-circle',  colorClass: 'cat-icon-green',  badgeClass: 'badge-green' }
    };

    list.innerHTML = filtered.map(n => {
      const cfg = typeConfig[n.type] || typeConfig.general;
      return `
        <div class="card notice-card" style="position:relative">
          ${n.isNew ? '<span class="badge badge-new" style="position:absolute;top:16px;right:16px">NEW</span>' : ''}
          <div class="cat-icon ${cfg.colorClass}" style="width:48px;height:48px;font-size:18px">
            <i class="fas ${cfg.icon}"></i>
          </div>
          <div class="flex-1 min-w-0">
            <h3 style="font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:6px">${n.title}</h3>
            <p style="font-size:14px;color:var(--text-muted);margin-bottom:8px;line-height:1.6">${n.content}</p>
            <div class="flex items-center gap-3 flex-wrap">
              <span style="font-size:12px;color:var(--text-dim)"><i class="far fa-calendar" style="margin-right:4px"></i>${n.date}</span>
              <span class="badge ${cfg.badgeClass}">${n.type}</span>
            </div>
          </div>
        </div>`;
    }).join('');
  }
};
