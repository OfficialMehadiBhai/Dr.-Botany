/*
=====================================================
  Dr. Botany — Global Search System
=====================================================
*/

const Search = {
  init(inputId, resultsId) {
    const input = document.getElementById(inputId);
    const results = document.getElementById(resultsId);
    if (!input || !results) return;

    input.addEventListener('input', () => this.handleSearch(input.value, results));
    document.addEventListener('click', (e) => {
      if (!e.target.closest(`#${inputId}`) && !e.target.closest(`#${resultsId}`)) {
        results.classList.add('hidden');
      }
    });
  },

  handleSearch(query, resultsEl) {
    if (!query || query.length < 2) {
      resultsEl.classList.add('hidden');
      return;
    }

    const q = query.toLowerCase();
    const index = DrBotanyData.getSearchIndex();
    const matches = index.filter(item =>
      item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q)
    ).slice(0, 8);

    if (matches.length === 0) {
      resultsEl.innerHTML = `<div class="p-4 text-center" style="color:var(--text-dim);font-size:14px">No results found</div>`;
    } else {
      resultsEl.innerHTML = matches.map(m => `
        <a href="${m.page}" class="flex items-center gap-3 p-3 transition" style="color:var(--text-secondary);text-decoration:none;"
           onmouseover="this.style.background='rgba(34,197,94,0.05)'" onmouseout="this.style.background='transparent'">
          <i class="fas ${m.icon}" style="color:var(--green-400);width:20px;text-align:center"></i>
          <div>
            <div style="font-size:14px;color:var(--text-primary)">${m.title}</div>
            <div style="font-size:12px;color:var(--text-dim)">${m.sub}</div>
          </div>
        </a>`).join('');
    }
    resultsEl.classList.remove('hidden');
  }
};
