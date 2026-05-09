
/*
=====================================================
  Dr. Botany — Home Page Logic
=====================================================
*/

const Home = {
  render() {
    this.renderQuickAccess();
    this.renderFeatured();
    this.renderLatest();
  },

  renderQuickAccess() {
    const grid = document.getElementById('quickAccessGrid');
    if (!grid) return;

    const items = [
      { href: 'books.html', icon: 'fa-book', color: 'green', label: 'Books', count: '245 items' },
      { href: 'questions.html', icon: 'fa-file-alt', color: 'amber', label: 'Questions', count: '380 papers' },
      { href: 'suggestions.html', icon: 'fa-lightbulb', color: 'purple', label: 'Suggestions', count: 'Exam tips' },
      { href: 'notices.html', icon: 'fa-bullhorn', color: 'red', label: 'Notices', count: '5 new' },
      { href: 'notes.html', icon: 'fa-sticky-note', color: 'blue', label: 'Notes', count: '1200 files' },
      { href: 'gallery.html', icon: 'fa-images', color: 'teal', label: 'Gallery', count: '150 photos' },
    ];

    grid.innerHTML = items.map(i => `
      <a href="${i.href}" class="card-glass text-center p-5 group" style="text-decoration:none">
        <div class="cat-icon cat-icon-${i.color} mx-auto mb-3 group-hover:scale-110 transition">
          <i class="fas ${i.icon}"></i>
        </div>
        <div style="font-size:14px;font-weight:600;color:var(--text-primary)">${i.label}</div>
        <div style="font-size:12px;color:var(--text-dim);margin-top:4px">${i.count}</div>
      </a>`).join('');
  },

  renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    const featured = DrBotanyData.books.filter(b => b.trending).slice(0, 3);

    grid.innerHTML = featured.map(b => `
      <div class="card book-card">
        <div class="book-card-cover">
          <img src="${b.cover}" alt="${b.title}" loading="lazy">
          <span class="badge badge-new" style="position:absolute;top:12px;right:12px">
            <i class="fas fa-fire"></i>Trending
          </span>
        </div>
        <div class="book-card-body">
          <span class="badge badge-green">${b.categoryLabel}</span>
          <h3 style="font-size:15px;font-weight:600;color:var(--text-primary);margin-top:8px;margin-bottom:4px" class="line-clamp-2">${b.title}</h3>
          <p style="font-size:13px;color:var(--text-dim);margin-bottom:12px">${b.author}</p>
          <a href="books.html" class="btn btn-primary btn-sm" style="width:100%">View Details</a>
        </div>
      </div>`).join('');
  },

  renderLatest() {
    const list = document.getElementById('latestUploads');
    if (!list) return;

    const latest = [
      ...DrBotanyData.notes.slice(0, 3).map(n => ({
        title: n.title, type: 'Note', date: n.date,
        icon: 'fa-sticky-note', color: 'blue', page: 'notes.html'
      })),
      ...DrBotanyData.notices.slice(0, 2).map(n => ({
        title: n.title, type: 'Notice', date: n.date,
        icon: 'fa-bullhorn', color: 'amber', page: 'notices.html'
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    list.innerHTML = latest.map(l => `
      <a href="${l.page}" class="card-glass flex items-center gap-4 p-4" style="text-decoration:none">
        <div class="cat-icon cat-icon-${l.color}" style="width:40px;height:40px;font-size:16px">
          <i class="fas ${l.icon}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div style="font-size:14px;color:var(--text-primary)" class="line-clamp-2">${l.title}</div>
          <div style="font-size:12px;color:var(--text-dim)">${l.type} · ${l.date}</div>
        </div>
        <i class="fas fa-chevron-right" style="color:var(--text-dim);font-size:12px"></i>
      </a>`).join('');
  }
};
