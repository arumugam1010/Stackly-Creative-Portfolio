// Services interactions
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const title = card.querySelector('.service-card-title').textContent;
    const desc = card.querySelector('p').textContent;
    const list = card.querySelector('.service-features-list').innerHTML;
    
    const learnMoreBtn = card.querySelector('.btn-outline');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const content = `
          <p style="margin-bottom:1.5rem;">${desc}</p>
          <h4 style="color:var(--text-primary); margin-bottom:0.75rem;">Core Competencies</h4>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; color:var(--text-secondary); margin-bottom:2rem;">
            ${list}
          </ul>
          <a href="contact.html" class="btn-neon ripple-btn" style="width:100%; justify-content: center;">Initiate Project Discussions</a>
        `;
        window.openModal(title, content);
      });
    }
  });
});
