/*
=====================================================
  Dr. Botany — Authentication System (Updated)
=====================================================
*/

const Auth = {

  STORAGE_KEY: 'drbotany_user',

  getCurrentUser() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  },

  /* অ্যাডমিন প্যানেল প্রটেকশন */
  requireAdmin() {
    if (!this.isLoggedIn() || !this.isAdmin()) {
      Toast.error('Access Denied! Admins only.');
      setTimeout(() => window.location.href = 'login.html', 1500);
      return false;
    }
    return true;
  },

  login(email, password) {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        reject(new Error('Please fill all fields'));
        return;
      }
      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }

      // যদি ইমেইলে 'admin' শব্দটা থাকে, তবে রোল Admin হবে
      const isAdmin = email.toLowerCase().includes('admin');

      const user = {
        name: isAdmin ? 'Dr. Admin' : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        semester: isAdmin ? '-' : '3rd',
        studentId: isAdmin ? 'ADMIN-001' : 'BT-2024-' + Math.floor(Math.random() * 999).toString().padStart(3, '0'),
        role: isAdmin ? 'admin' : 'student',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  loginWithGoogle() {
    return new Promise((resolve) => {
      const user = {
        name: 'Google User',
        email: 'user@gmail.com',
        semester: '3rd',
        studentId: 'BT-2024-G' + Math.floor(Math.random() * 999).toString().padStart(3, '0'),
        role: 'student',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null,
        provider: 'google'
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  register(data) {
    return new Promise((resolve, reject) => {
      if (!data.name || !data.email || !data.password || !data.studentId || !data.semester) {
        reject(new Error('Please fill all fields'));
        return;
      }
      if (data.password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }
      const user = {
        name: data.name,
        email: data.email,
        semester: data.semester,
        studentId: data.studentId,
        role: 'student', // রেজিস্ট্রেশন থেকে সবসময় স্টুডেন্ট হবে
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  resetPassword(email) {
    return new Promise((resolve) => {
      resolve({ message: 'Password reset link sent to ' + email });
    });
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  updateUI() {
    const authBtn = document.getElementById('authBtn');
    if (!authBtn) return;

    const user = this.getCurrentUser();
    if (user) {
      authBtn.innerHTML = `
        <div class="flex items-center gap-2">
          <a href="profile.html" class="flex items-center gap-2 text-decoration-none">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white text-xs font-bold">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <span class="hidden sm:inline text-sm" style="color:var(--text-secondary)">${user.name}</span>
          </a>
          <button onclick="Auth.logout();Auth.updateUI();Toast.info('Logged out successfully');window.location.href='index.html';" 
                  class="btn-icon-sm btn-ghost" style="color:var(--text-dim)" title="Logout">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>`;
    } else {
      authBtn.innerHTML = `
        <a href="login.html" class="btn btn-primary btn-sm">
          <i class="fas fa-sign-in-alt"></i><span class="hidden sm:inline">Login</span>
        </a>`;
    }
  }
};
