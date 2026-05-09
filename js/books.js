
/*
=====================================================
  Dr. Botany — Books Page Logic (Complete)
=====================================================
*/

const BooksPage = {
  filter: 'all',
  page: 1,
  perPage: 8,

  init() {
    this.renderFilters();
    this.renderBooks();
  },

  renderFilters() {
    const container = document.getElementById('bookFilters');
    if (!container) return;
    const categories = [{ id: 'all', label: 'All Books' }, ...DrBotanyData.bookCategories];
    container.innerHTML = categories.map(c => `
      <button class="chip ${c.id === this.filter ? 'active' : ''}"
              onclick="BooksPage.setFilter('${c.id}', this)">
        ${c.label}
      </button>`).join('');
  },

  setFilter(cat, el) {
    this.filter = cat;
    this.page = 1;
    document.querySelectorAll('#bookFilters .chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    this.renderBooks();
  },

  getFilteredBooks() {
    const search = (document.getElementById('bookSearch')?.value || '').toLowerCase();
    return DrBotanyData.books.filter(b => {
      const matchCat = this.filter === 'all' || b.category === this.filter;
      const matchSearch = !search || b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search);
      return matchCat && matchSearch;
    });
  },

  renderBooks() {
    const filtered = this.getFilteredBooks();
    const totalPages = Math.ceil(filtered.length / this.perPage);
    const start = (this.page - 1) * this.perPage;
    const paged = filtered.slice(start, start + this.perPage);
    const grid = document.getElementById('booksGrid');
    if (!grid) return;

    if (paged.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state-icon"><i class="fas fa-search"></i></div>
          <div class="empty-state-title">No books found</div>
          <div class="empty-state-desc">Try adjusting your search or filter</div>
        </div>`;
      document.getElementById('booksPagination').innerHTML = '';
      return;
    }

    grid.innerHTML = paged.map(b => `
      <div class="card book-card">
        <div class="book-card-cover">
          <img src="${b.cover}" alt="${b.title}" loading="lazy">
          ${b.trending ? '<span class="badge badge-new" style="position:absolute;top:12px;right:12px"><i class="fas fa-fire"></i>Trending</span>' : ''}
          <button class="bookmark-btn ${Bookmarks.isBookmarked(b.id) ? 'active' : ''}"
                  style="position:absolute;top:12px;left:12px;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(6,13,9,0.6);backdrop-filter:blur(8px)"
                  onclick="event.stopPropagation();Bookmarks.toggle('${b.id}');BooksPage.renderBooks()">
            <i class="fas fa-bookmark"></i>
          </button>
        </div>
        <div class="book-card-body">
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="badge badge-green">${b.categoryLabel}</span>
            <span class="badge" style="background:var(--bg-input);color:var(--text-dim)">${b.semester} Sem</span>
          </div>
          <h3 style="font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:4px" class="line-clamp-2">${b.title}</h3>
          <p style="font-size:12px;color:var(--text-dim);margin-bottom:12px">${b.author}</p>
          <div class="book-card-actions">
            <button onclick="BooksPage.viewPDF('${b.title}','${b.pdfUrl}')" class="btn btn-primary btn-sm flex-1">
              <i class="fas fa-eye"></i>View
            </button>
            <button onclick="BooksPage.downloadPDF('${b.pdfUrl}','${b.title}')" class="btn btn-secondary btn-sm">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>`).join('');

    /* পেজিনেশন */
    const pg = document.getElementById('booksPagination');
    if (totalPages > 1) {
      let html = '<div class="pagination">';
      for (let i = 1; i <= totalPages; i++) {
        html += `<button class="pagination-btn ${i === this.page ? 'active' : 'default'}"
                         onclick="BooksPage.goToPage(${i})">${i}</button>`;
      }
      html += '</div>';
      pg.innerHTML = html;
    } else {
      pg.innerHTML = '';
    }
  },

  goToPage(p) {
    this.page = p;
    this.renderBooks();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  viewPDF(title, url) {
    document.getElementById('pdfTitle').textContent = title;
    document.getElementById('pdfViewerContent').innerHTML = `
      <div class="text-center">
        <i class="fas fa-file-pdf" style="font-size:48px;color:var(--green-400);margin-bottom:16px"></i>
        <p style="color:var(--text-secondary);font-weight:600">${title}</p>
        <p style="color:var(--text-dim);font-size:13px;margin-top:4px">PDF preview would render here</p>
        <p style="color:var(--text-dim);font-size:12px;margin-top:8px">Connect Firebase Storage for real PDF viewing</p>
      </div>`;
    document.getElementById('pdfDownloadBtn').onclick = () => {
      PDFConfig.download(url, title + '.pdf');
      Toast.success('Download started!');
    };
    openModal('pdfModal');
  },

  downloadPDF(url, title) {
    PDFConfig.download(url, title + '.pdf');
    Toast.success('Download started!');
  }
};
