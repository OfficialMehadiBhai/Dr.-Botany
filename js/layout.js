
/*
=====================================================
  Dr. Botany — Shared Layout Components
  প্রতিটি পেজে একই নেভবার, সাইডবার, ফুটার
=====================================================
*/

const Layout = {

  /* বর্তমান পেজ detect করা */
  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page === 'index' ? 'home' : page;
  },

  /* নেভবার রেন্ডার */
  renderNavbar() {
    const currentPage = this.getCurrentPage();
    return `
    <header class="navbar glass-strong" id="navbar">
      <div class="flex items-center justify-between px-4 lg:px-6 h-16">
        <!-- বাম: মেন্যু + লোগো -->
        <div class="flex items-center gap-3">
          <button id="menuToggle" class="lg:hidden text-xl p-2 rounded-lg transition" style="color:var(--green-400)" onclick="Layout.toggleSidebar()">
            <i class="fas fa-bars"></i>
          </button>
          <a href="index.html" class="flex items-center gap-2 text-decoration-none">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm"
                 style="background:linear-gradient(135deg,var(--green-600),var(--green-400))">
              <i class="fas fa-leaf"></i>
            </div>
            <div>
              <div class="font-display text-sm font-bold leading-tight" style="color:var(--green-300)">Dr. Botany</div>
              <div class="text-[10px] leading-tight" style="color:var(--text-dim)">Department Portal</div>
            </div>
          </a>
        </div>

        <!-- মাঝখানে: নেভিগেশন (ডেস্কটপ) -->
        <nav class="hidden lg:flex items-center gap-1" id="desktopNav">
          ${this.getNavLinks(currentPage)}
        </nav>

        <!-- ডান: থিম + সার্চ + অথ -->
        <div class="flex items-center gap-2">
          <button onclick="Layout.toggleTheme()" class="btn-icon btn-ghost" id="themeToggle" title="Toggle theme">
            <i class="fas fa-moon" id="themeIcon"></i>
          </button>
          <a href="index.html#search" class="btn-icon btn-ghost lg:hidden" title="Search">
            <i class="fas fa-search"></i>
          </a>
          <div id="authBtn"></div>
        </div>
      </div>
    </header>`;
  },

  /* নেভ লিংক তৈরি */
  getNavLinks(current) {
    const links = [
      { href: 'index.html', page: 'home', icon: 'fa-home', label: 'Home' },
      { href: 'books.html', page: 'books', icon: 'fa-book', label: 'Books' },
      { href: 'questions.html', page: 'questions', icon: 'fa-file-alt', label: 'Questions' },
      { href: 'suggestions.html', page: 'suggestions', icon: 'fa-lightbulb', label: 'Suggestions' },
      { href: 'notices.html', page: 'notices', icon: 'fa-bullhorn', label: 'Notices' },
      { href: 'notes.html', page: 'notes', icon: 'fa-sticky-note', label: 'Notes' },
      { href: 'gallery.html', page: 'gallery', icon: 'fa-images', label: 'Gallery' },
    ];
    return links.map(l => `
      <a href="${l.href}" class="nav-link ${current === l.page ? 'active' : ''}" style="font-size:13px">
        <i class="fas ${l.icon}"></i>${l.label}
      </a>`).join('');
  },

  /* সাইডবার রেন্ডার */
  renderSidebar() {
    const current = this.getCurrentPage();
    const links = [
      { href: 'index.html', page: 'home', icon: 'fa-home', label: 'Home' },
      { href: 'books.html', page: 'books', icon: 'fa-book', label: 'Books Library' },
      { href: 'questions.html', page: 'questions', icon: 'fa-file-alt', label: 'Previous Questions' },
      { href: 'suggestions.html', page: 'suggestions', icon: 'fa-lightbulb', label: 'Suggestions' },
      { href: 'notices.html', page: 'notices', icon: 'fa-bullhorn', label: 'Department Notices' },
      { href: 'notes.html', page: 'notes', icon: 'fa-sticky-note', label: 'Lecture Notes' },
      { href: 'gallery.html', page: 'gallery', icon: 'fa-images', label: 'Botanical Gallery' },
      { divider: true },
      { href: 'profile.html', page: 'profile', icon: 'fa-user', label: 'My Profile' },
      { href: 'admin.html', page: 'admin', icon: 'fa-shield-alt', label: 'Admin Panel' },
    ];

    return `
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="Layout.closeSidebar()"></div>
    <aside class="sidebar" id="sidebar">
      <div class="px-4 pb-6">
        <div class="flex flex-col gap-1">
          ${links.map(l => l.divider
            ? '<div style="height:1px;background:var(--border-subtle);margin:12px 0"></div>'
            : `<a href="${l.href}" class="nav-link ${current === l.page ? 'active' : ''}">
                <i class="fas ${l.icon}" style="width:20px;text-align:center"></i>${l.label}
               </a>`
          ).join('')}
        </div>

        <!-- Telegram গ্রুপ -->
        <div class="card-glass" style="margin-top:32px;padding:16px;border-radius:var(--radius-xl)">
          <div style="font-size:14px;font-weight:600;color:var(--green-300);margin-bottom:8px">
            <i class="fab fa-telegram" style="margin-right:8px"></i>Join Our Group
          </div>
          <p style="font-size:12px;color:var(--text-dim);margin-bottom:12px">Stay connected with classmates</p>
          <a href="#" class="btn btn-primary btn-sm btn-block" onclick="Toast.info('Telegram link opened!')">
            <i class="fab fa-telegram-plane"></i>Join Telegram
          </a>
        </div>
      </div>
    </aside>`;
  },

  /* ফুটার রেন্ডার */
  renderFooter() {
    return `
    <footer class="footer">
      <div class="container py-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- কলাম ১: ব্র্যান্ড -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm"
                   style="background:linear-gradient(135deg,var(--green-600),var(--green-400))">
                <i class="fas fa-leaf"></i>
              </div>
              <span class="font-display font-bold" style="color:var(--green-300)">Dr. Botany</span>
            </div>
            <p class="text-sm" style="color:var(--text-dim);line-height:1.7">
              Your comprehensive academic companion for Botany studies. Access all resources in one place.
            </p>
          </div>

          <!-- কলাম ২: রিসোর্স -->
          <div>
            <h4 class="font-semibold mb-3" style="color:var(--text-secondary);font-size:14px">Resources</h4>
            <div class="space-y-2">
              <a href="books.html" class="block text-sm transition" style="color:var(--text-dim)">Books Library</a>
              <a href="questions.html" class="block text-sm transition" style="color:var(--text-dim)">Previous Questions</a>
              <a href="suggestions.html" class="block text-sm transition" style="color:var(--text-dim)">Suggestions</a>
              <a href="notes.html" class="block text-sm transition" style="color:var(--text-dim)">Lecture Notes</a>
            </div>
          </div>

          <!-- কলাম ৩: ডিপার্টমেন্ট -->
          <div>
            <h4 class="font-semibold mb-3" style="color:var(--text-secondary);font-size:14px">Department</h4>
            <div class="space-y-2">
              <a href="notices.html" class="block text-sm transition" style="color:var(--text-dim)">Notices</a>
              <a href="gallery.html" class="block text-sm transition" style="color:var(--text-dim)">Gallery</a>
              <span class="block text-sm" style="color:var(--text-dim)">Faculty Members</span>
              <span class="block text-sm" style="color:var(--text-dim)">Research Labs</span>
            </div>
          </div>

          <!-- কলাম ৪: কন্টাক্ট -->
          <div>
            <h4 class="font-semibold mb-3" style="color:var(--text-secondary);font-size:14px">Connect</h4>
            <div class="flex gap-2 mb-4">
              <a href="#" class="footer-social-link"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="footer-social-link"><i class="fab fa-twitter"></i></a>
              <a href="#" class="footer-social-link"><i class="fab fa-telegram-plane"></i></a>
              <a href="#" class="footer-social-link"><i class="fab fa-youtube"></i></a>
            </div>
            <p class="text-sm" style="color:var(--text-dim)"><i class="fas fa-envelope" style="margin-right:8px"></i>botany@university.edu</p>
            <p class="text-sm" style="color:var(--text-dim);margin-top:4px"><i class="fas fa-phone" style="margin-right:8px"></i>+880 1234-567890</p>
          </div>
        </div>

        <div style="height:1px;background:var(--border-subtle);margin:32px 0"></div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style="color:var(--text-dim)">
          <p>2024 Dr. Botany. Department of Botany.</p>
          <p>Built with <i class="fas fa-heart" style="color:var(--green-500);margin:0 4px"></i> for Botany students</p>
        </div>
      </div>
    </footer>`;
  },

  /* FAB বাটন */
  renderFAB() {
    return `<button class="fab" id="fabBtn" onclick="window.scrollTo({top:0,behavior:'smooth'})"><i class="fas fa-arrow-up"></i></button>`;
  },

  /* সম্পূর্ণ লেআউট ইনিশিয়ালাইজ */
  init() {
    // নেভবার
    const navbarContainer = document.getElementById('navbar-slot');
    if (navbarContainer) navbarContainer.innerHTML = this.renderNavbar();

    // সাইডবার
    const sidebarContainer = document.getElementById('sidebar-slot');
    if (sidebarContainer) sidebarContainer.innerHTML = this.renderSidebar();

    // ফুটার
    const footerContainer = document.getElementById('footer-slot');
    if (footerContainer) footerContainer.innerHTML = this.renderFooter();

    // FAB
    const fabContainer = document.getElementById('fab-slot');
    if (fabContainer) fabContainer.innerHTML = this.renderFAB();

    // Auth UI আপডেট
    Auth.updateUI();

    // Scroll listener
    window.addEventListener('scroll', () => {
      const fab = document.getElementById('fabBtn');
      if (fab) {
        fab.classList.toggle('visible', window.scrollY > 400);
      }
      const nav = document.getElementById('navbar');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 10);
      }
    });
  },

  /* সাইডবার টগল */
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
  },

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
  },

  /* থিম টগল */
  toggleTheme() {
    const html = document.documentElement;
    const isDark = !html.classList.contains('light');
    html.classList.toggle('dark', !isDark);
    html.classList.toggle('light', isDark);
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    Toast.info(isDark ? 'Light mode enabled' : 'Dark mode enabled');
  }
};
