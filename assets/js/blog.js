// Blog interactions
document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.getElementById('comment-form');
  const commentsList = document.getElementById('comments-list');
  const countEl = document.getElementById('comments-count');

  if (commentForm && commentsList) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const author = document.getElementById('comment-author').value;
      const body = document.getElementById('comment-body-input').value;

      if (!author || !body) {
        window.showToast('Please fill in name and comment details.', 'error');
        return;
      }

      // Add comment mock item
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = `
        <div class="comment-avatar" style="background:var(--primary-cyan); color:#000;">
          ${author.substring(0, 2).toUpperCase()}
        </div>
        <div class="comment-body">
          <div class="comment-header">
            <strong style="color:var(--text-primary);">${author}</strong>
            <span style="font-size:0.8rem; color:var(--text-muted);">Just Now</span>
          </div>
          <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.5;">${body}</p>
        </div>
      `;

      commentsList.appendChild(item);
      window.showToast('Comment published!', 'success');

      // Update count
      if (countEl) {
        let currentCount = parseInt(countEl.textContent.split(' ')[0]);
        countEl.textContent = `${currentCount + 1} Comments`;
      }

      commentForm.reset();
    });
  }
});
