/*
=====================================================
  Dr. Botany — Authentication System
  বর্তমানে localStorage দিয়ে simulate করছে
  Firebase Auth দিয়ে রিপ্লেস করতে এই ফাইলই পরিবর্তন করবে
=====================================================
*/

const Auth = {

  STORAGE_KEY: 'drbotany_user',

  /* বর্তমান ইউজার পাওয়া */
  getCurrentUser() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  /* লগইন আছে কিনা চেক */
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  /* অ্যাডমিন কিনা চেক */
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  },

  /* লগইন */
  login(email, password) {
    return new Promise((resolve, reject) => {
      // Firebase কানেক্ট করলে এখানে firebase.auth().signInWithEmailAndPassword() ব্যবহার করবে
      if (!email || !password) {
        reject(new Error('Please fill all fields'));
        return;
      }
      if (password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }

      // Simulate successful login
      const user = {
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        semester: '3rd',
        studentId: 'BT-2024-' + Math.floor(Math.random() * 999).toString().padStart(3, '0'),
        role: email.includes('admin') ? 'admin' : 'student',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  /* Google লগইন */
  loginWithGoogle() {
    return new Promise((resolve) => {
      // Firebase কানেক্ট করলে এখানে firebase.auth().signInWithPopup(googleProvider) ব্যবহার করবে
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

  /* রেজিস্টার */
  register(data) {
    return new Promise((resolve, reject) => {
      // Firebase কানেক্ট করলে এখানে firebase.auth().createUserWithEmailAndPassword() ব্যবহার করবে
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
        role: 'student',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    });
  },

  /* পাসওয়ার্ড রিসেট */
  resetPassword(email) {
    return new Promise((resolve) => {
      // Firebase কানেক্ট করলে এখানে firebase.auth().sendPasswordResetEmail() ব্যবহার করবে
      resolve({ message: 'Password reset link sent to ' + email });
    });
  },

  /* লগআউট */
  logout() {
    // Firebase কানেক্ট করলে এখানে firebase.auth().signOut() ব্যবহার করবে
    localStorage.removeItem(this.STORAGE_KEY);
  },

  /* Auth UI আপডেট */
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
          <button onclick="Auth.logout();Auth.updateUI();Toast.info('Logged out successfully');location.reload();" 
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
