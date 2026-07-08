// Contact Form validations & triggers
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const category = document.getElementById('contact-category').value;
    const msg = document.getElementById('contact-message').value;

    if (!name || !email || !msg) {
      window.showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Simulate validation and submit
    window.showToast('Transmitting inquiry packet...', 'info');

    setTimeout(() => {
      window.showToast('Inquiry successfully logged in Stackly CRM!', 'success');
      contactForm.reset();
      
      // Trigger a success modal
      window.openModal('Submission Confirmed', `
        <div style="text-align: center; padding:1rem;">
          <p style="font-size:3rem; margin-bottom:1rem;">📨</p>
          <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">Thank you <strong>${name}</strong>, your inquiry regarding <strong>${category}</strong> has been assigned ticket ID <strong>STK-${Math.floor(Math.random() * 90000) + 10000}</strong>.</p>
          <button class="btn-neon ripple-btn" onclick="window.closeModal()" style="width:100%; justify-content: center;">Dismiss</button>
        </div>
      `);
    }, 1500);
  });
});
