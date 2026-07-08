// Careers interaction handler
document.addEventListener('DOMContentLoaded', () => {
  const applyBtns = document.querySelectorAll('.apply-job-btn');

  applyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const jobTitle = btn.getAttribute('data-job') || 'Position';
      
      const formHtml = `
        <form id="apply-form" onsubmit="event.preventDefault(); window.submitJobApplication('${jobTitle}');">
          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            <div>
              <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.35rem;">FullName</label>
              <input type="text" id="apply-name" style="width:100%; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:4px; padding:0.7rem 1rem; color:#fff;" required>
            </div>
            <div>
              <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.35rem;">Email Address</label>
              <input type="email" id="apply-email" style="width:100%; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:4px; padding:0.7rem 1rem; color:#fff;" required>
            </div>
            <div>
              <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.35rem;">CV Summary Link / Brief</label>
              <textarea id="apply-brief" style="width:100%; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:4px; padding:0.7rem 1rem; color:#fff; height:80px; resize:none;" placeholder="Write a short summary or insert link..." required></textarea>
            </div>
            <button type="submit" class="btn-neon ripple-btn" style="justify-content: center;">Submit Application packet</button>
          </div>
        </form>
      `;

      window.openModal(`Apply: ${jobTitle}`, formHtml);
    });
  });

  window.submitJobApplication = function(title) {
    const name = document.getElementById('apply-name').value;
    window.closeModal();
    window.showToast('Transmitting application packet...', 'info');

    setTimeout(() => {
      window.showToast('Application successfully catalogued!', 'success');
      window.openModal('Application Received', `
        <div style="text-align: center; padding:1rem;">
          <p style="font-size:3rem; margin-bottom:1rem;">📄</p>
          <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">Thank you <strong>${name}</strong>, your application details for the <strong>${title}</strong> vacancy have been received and assigned tracking ID <strong>APP-${Math.floor(Math.random() * 90000) + 10000}</strong>.</p>
          <button class="btn-neon" onclick="window.closeModal()" style="width:100%; justify-content: center;">Dismiss</button>
        </div>
      `);
    }, 1500);
  };
});
