/*
=====================================================
  Dr. Botany — Authentication & Authorization System
  Role-Based Access Control (RBAC)
=====================================================
*/

const Auth = {

  STORAGE_KEY: 'drbotany_user',

  /* ── অ্যাডমিন ইমেইল হোয়াইটলিস্ট ── */
  /*
   * এখানে শুধুমাত্র অনুমোদিত অ্যাডমিনদের ইমেইল দিবে
   * এই ইমেইল ছাড়া কেউ অ্যাডমিন প্যানেলে ঢুকতে পারবে না
   * Firebase কানেক্ট করলে এটি Firestore এর 'users' collection 
   * এর role field থেকে চেক করবে
   */
  ADMIN_EMAILS: [
    'admin@drbotany.com',
    'chairman@botany.edu',
    'head@botany.edu'
  ],

  MODERATOR_EMAILS: [
    'moderator@drbotany.com',
    'cr@botany.edu'
  ],

  /* ── বর্তমান ইউজার ── */
  getCurrentUser() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  /* ── রোল চেক ── */
  getRole() {
    const user = this.getCurrentUser();
    if (!user) return 'guest';
    return user.role || 'student';
  },

  isAdmin() {
    return this.getRole() === 'admin';
  },

  isModerator() {
    return this.getRole() === 'moderator' || this.getRole() === 'admin';
  },

  isStudent() {
    return this.getRole() === 'student';
  },

  /* ── অ্যাডমিন প্যানেল অ্যাক্সেস চেক ── */
  canAccessAdmin() {
    const role = this.getRole();
    return role === 'admin' || role === 'moderator';
  },

  /* ── নির্দিষ্ট পারমিশন চেক ── */
  canUpload() {
    return this.isModerator(); // Admin + Moderator আপলোড করতে পারবে
  },

  canDelete() {
    return this.isAdmin(); // শুধু Admin ডিলিট করতে পারবে
  },

  canManageUsers() {
    return this.isAdmin(); // শুধু Admin ইউজার ম্যানেজ করতে পারবে
  },

  /* ── ইমেইল থেকে রোল ডিটারমাইন ── */
  determineRole(email) {
    if (this.ADMIN_EMAILS.includes(email)) return 'admin';
    if (this.MODERATOR_EMAILS.includes(email)) return 'moderator';
    return 'student';
  },

  /* ── লগইন ── */
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

      // ইমেইল থেকে রোল অটো-ডিটারমাইন
      const role = this.determineRole(email);

      const user = {
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        semester: role === 'student' ? '3rd' : '-',
        studentId: role === 'student' ? 'BT-2024-' + Math.floor(Math.random() * 999).toString().padStart(3, '0') : 'STAFF',
        role: role,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null,
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  /* ── Google লগইন ── */
  loginWithGoogle() {
    return new Promise((resolve) => {
      // Firebase কানেক্ট করলে এখানে Google Auth থেকে ইমেইল পাওয়া যাবে
      // তারপর determineRole() দিয়ে রোল সেট হবে
      const email = 'user@gmail.com'; // Demo
      const role = this.determineRole(email);

      const user = {
        name: 'Google User',
        email: email,
        semester: '3rd',
        studentId: 'BT-2024-G' + Math.floor(Math.random() * 999).toString().padStart(3, '0'),
        role: role,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null,
        provider: 'google',
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  /* ── রেজিস্টার ── */
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

      // রেজিস্টার করলে ডিফল্ট রোল = student
      // Admin ম্যানুয়ালি পরে role পরিবর্তন করতে পারবে
      const user = {
        name: data.name,
        email: data.email,
        semester: data.semester,
        studentId: data.studentId,
        role: 'student',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null,
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  /* ── পাসওয়ার্ড রিসেট ── */
  resetPassword(email) {
    return new Promise((resolve) => {
      resolve({ message: 'Password reset link sent to ' + email });
    });
  },

  /* ── লগআউট ── */
  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  /* ── Auth UI আপডেট ── */
  updateUI() {
    const authBtn = document.getElementById('authBtn');
    if (!authBtn) return;

    const user = this.getCurrentUser();
    if (user) {
      const roleBadge = user.role === 'admin'
        ? '<span class="badge badge-red" style="font-size:9px;margin-left:4px">ADMIN</span>'
        : user.role === 'moderator'
        ? '<span class="badge badge-amber" style="font-size:9px;margin-left:4px">MOD</span>'
        : '';

      authBtn.innerHTML = `
        <div class="flex items-center gap-2">
          <a href="profile.html" class="flex items-center gap-2" style="text-decoration:none">
            <div class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                 style="background:linear-gradient(135deg,${user.role==='admin'?'#ef4444,#f97316':user.role==='moderator'?'#f59e0b,#fbbf24':'#16a34a,#22c55e'})">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <span class="hidden sm:inline text-sm" style="color:var(--text-secondary)">
              ${user.name}${roleBadge}
            </span>
          </a>
          <button onclick="Auth.logout();Auth.updateUI();Toast.info('Logged out');location.reload();"
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

    // সাইডবারে অ্যাডমিন লিংক শো/হাইড
    const adminLink = document.querySelector('[data-admin-link]');
    if (adminLink) {
      adminLink.style.display = this.canAccessAdmin() ? 'flex' : 'none';
    }
  }
};
