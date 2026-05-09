/*
=====================================================
  Dr. Botany — Main Application Logic
  প্রতিটি পেজে এই ফাইলটি লোড হবে
=====================================================
*/

const App = {
  init() {
    // লেআউট রেন্ডার
    Layout.init();

    // পার্টিকেল অ্যানিমেশন শুরু
    Particles.init();

    // টোস্ট ইনিশিয়ালাইজ
    Toast.init();

    // বুকমার্ক লোড
    Bookmarks.load();

    console.log('%c🌿 Dr. Botany Portal Loaded', 'color:#22c55e;font-size:16px;font-weight:bold');
  }
};

/* বুকমার্ক ম্যানেজার */
const Bookmarks = {
  STORAGE_KEY: 'drbotany_bookmarks',

  load() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  save(bookmarks) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookmarks));
  },

  toggle(id) {
    let bookmarks = this.load();
    const idx = bookmarks.indexOf(id);
    if (idx > -1) {
      bookmarks.splice(idx, 1);
      Toast.info('Removed from bookmarks');
    } else {
      bookmarks.push(id);
      Toast.success('Added to bookmarks');
    }
    this.save(bookmarks);
    return bookmarks;
  },

  isBookmarked(id) {
    return this.load().includes(id);
  }
};

/* স্ট্যাট কাউন্টার অ্যানিমেশন */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString();
    }, 20);
  });
}

/* Intersection Observer for animations */
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        if (entry.target.hasAttribute('data-count')) {
          animateCounters();
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-animate], [data-count]').forEach(el => observer.observe(el));
}

/* DOM Ready */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  observeElements();
});
