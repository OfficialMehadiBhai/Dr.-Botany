
/*
=====================================================
  Dr. Botany — Gallery Page Logic
=====================================================
*/

const GalleryPage = {
  init() {
    this.render();
  },

  render() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = DrBotanyData.gallery.map(p => `
      <div class="card gallery-card">
        <div class="gallery-card-image" style="position:relative">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div style="position:absolute;inset:0;background:linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)"></div>
        </div>
        <div style="padding:16px">
          <h3 style="font-size:15px;font-weight:600;color:var(--text-primary);font-style:italic;margin-bottom:2px">${p.name}</h3>
          <p style="font-size:13px;color:var(--green-400);margin-bottom:8px">${p.common}</p>
          <div class="flex flex-wrap gap-1.5 mb-3">
            <span class="badge badge-green">Family: ${p.family}</span>
            <span class="badge" style="background:var(--bg-input);color:var(--text-dim)">Order: ${p.order}</span>
          </div>
          <p style="font-size:13px;color:var(--text-muted);line-height:1.6">${p.description}</p>
        </div>
      </div>`).join('');
  }
};
