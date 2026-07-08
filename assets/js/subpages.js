// Shared subpage interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Testimonial sliding logic
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;

  if (track && slides.length > 0) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 4500);
  }

  // Gallery Popup Modals
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.gallery-caption').textContent;
      const emoji = card.querySelector('.gallery-card-placeholder').textContent;
      
      window.openModal(title, `
        <div style="text-align: center; padding:2rem; font-size:6rem; background:linear-gradient(135deg, var(--bg-card), rgba(0,242,254,0.1)); border-radius:8px; margin-bottom:1.5rem;">
          ${emoji}
        </div>
        <p style="color:var(--text-secondary); line-height:1.6;">Premium captured image of the corresponding Stackly operations facility or system screen. Standard 2026 enterprise design mockup asset.</p>
      `);
    });
  });

  // Support Submission
  const supportForm = document.getElementById('support-form');
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('Routing ticket packet...', 'info');

      setTimeout(() => {
        window.showToast('Ticket successfully created!', 'success');
        supportForm.reset();
        
        window.openModal('Ticket Created', `
          <div style="text-align: center; padding:1rem;">
            <p style="font-size:3rem; margin-bottom:1rem;">🛠️</p>
            <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">A support engineer has been assigned to your ticket. Ticket tracking ID is <strong>TKT-${Math.floor(Math.random() * 90000) + 10000}</strong>.</p>
            <button class="btn-neon" onclick="window.closeModal()" style="width:100%; justify-content: center;">Dismiss</button>
          </div>
        `);
      }, 1500);
    });
  }
});
