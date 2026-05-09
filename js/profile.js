/*
=====================================================
  Dr. Botany — Profile Page Logic
=====================================================
*/

const ProfilePage = {
  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('profileContent');
    if (!container) return;

    const user = Auth.getCurrentUser();
    const bookmarks = Bookmarks.load();

    if (!user) {
      container.innerHTML = `
        <div class="card-glass" style="padding:64px 32px;text-align:center">
          <div style="font-size:48px;color:var(--text-dim);margin-bottom:16px"><i class="fas fa-user-circle"></i></div>
          <h3 style="font-size:18px;font-weight:600;color:var(--text-secondary);margin-bottom:8px">Please login to view your profile</h3>
          <p style="font-size:14px;color:var(--text-dim);margin-bottom:24px">Access your bookmarks, activity, and settings</p>
          <a href="login.html" class="btn btn-primary"><i class="fas fa-sign-in-alt"></i>Login</a>
        </div>`;
      return;
    }

    container.innerHTML = `
      <!-- প্রোফাইল হেডার -->
      <div class="card-glass" style="padding:24px;margin-bottom:20px">
        <div class="flex items-center gap-4 mb-6">
          <div style="width:64px;height:64px;border-radius:var(--radius-xl);background:linear-gradient(135deg,var(--green-600),var(--green-400));display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:700">
            ${user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style="font-size:20px;font-weight:700;color:var(--text-primary)">${user.name}</h3>
            <p style="font-size:14px;color:var(--text-dim)">${user.email}</p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div style="padding:12px;border-radius:var(--radius-md);background:var(--bg-input)">
            <div style="font-size:12px;color:var(--text-dim);margin-bottom:4px">Student ID</div>
            <div style="font-size:14px;color:var(--text-secondary)">${user.studentId}</div>
          </div>
          <div style="padding:12px;border-radius:var(--radius-md);background:var(--bg-input)">
            <div style="font-size:12px;color:var(--text-dim);margin-bottom:4px">Semester</div>
            <div style="font-size:14px;color:var(--text-secondary)">${user.semester}</div>
          </div>
          <div style="padding:12px;border-radius:var(--radius-md);background:var(--bg-input)">
            <div style="font-size:12px;color:var(--text-dim);margin-bottom:4px">Department</div>
            <div style="font-size:14px;color:var(--text-secondary)">Botany</div>
          </div>
          <div style="padding:12px;border-radius:var(--radius-md);background:var(--bg-input)">
            <div style="font-size:12px;color:var(--text-dim);margin-bottom:4px">Role</div>
            <div style="font-size:14px;color:var(--text-secondary);text-transform:capitalize">${user.role}</div>
          </div>
        </div>
      </div>

      <!-- অ্যাক্টিভিটি -->
      <div class="card-glass" style="padding:24px;margin-bottom:20px">
        <h4 style="font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:16px">Activity</h4>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div style="font-size:28px;font-weight:700;color:var(--green-400)">${bookmarks.length}</div>
            <div style="font-size:12px;color:var(--text-dim)">Bookmarks</div>
          </div>
          <div>
            <div style="font-size:28px;font-weight:700;color:#fbbf24">12</div>
            <div style="font-size:12px;color:var(--text-dim)">Downloads</div>
          </div>
          <div>
            <div style="font-size:28px;font-weight:700;color:#93c5fd">8</div>
            <div style="font-size:12px;color:var(--text-dim)">Viewed</div>
          </div>
        </div>
      </div>

      <!-- বুকমার্কড আইটেম -->
      <div class="card-glass" style="padding:24px;margin-bottom:20px">
        <h4 style="font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:16px">My Bookmarks</h4>
        ${bookmarks.length === 0
          ? '<p style="font-size:14px;color:var(--text-dim)">No bookmarks yet. Save books and resources to see them here.</p>'
          : `<div class="space-y-3">${bookmarks.slice(0, 5).map(id => {
              const book = DrBotanyData.books.find(b => b.id === id);
              if (!book) return '';
              return `
                <div class="flex items-center gap-3" style="padding:10px;border-radius:var(--radius-md);background:var(--bg-input)">
                  <i class="fas fa-bookmark" style="color:#fbbf24"></i>
                  <div class="flex-1 min-w-0">
                    <div style="font-size:14px;color:var(--text-primary)" class="line-clamp-2">${book.title}</div>
                    <div style="font-size:12px;color:var(--text-dim)">${book.author}</div>
                  </div>
                  <button onclick="Bookmarks.toggle('${book.id}');ProfilePage.render();Toast.info('Bookmark removed')"
                          class="btn-icon-sm btn-ghost" style="color:var(--text-dim)"><i class="fas fa-times"></i></button>
                </div>`;
            }).join('')}</div>`
        }
      </div>

      <!-- লগআউট -->
      <button onclick="Auth.logout();window.location.href='index.html'" class="btn btn-secondary btn-block">
        <i class="fas fa-sign-out-alt"></i>Logout
      </button>`;
  }
};
