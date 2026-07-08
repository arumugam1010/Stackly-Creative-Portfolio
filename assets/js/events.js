// Events specific JS
document.addEventListener('DOMContentLoaded', () => {
  const events = document.querySelectorAll('.event-item-row');
  events.forEach(ev => {
    ev.addEventListener('click', () => {
      const title = ev.querySelector('h3').textContent;
      const desc = ev.querySelector('p').textContent;
      window.openModal(title, `
        <p style="margin-bottom:1.5rem; line-height:1.6;">${desc}</p>
        <h4 style="margin-bottom:0.75rem;">Timetable & Registration</h4>
        <p style="color:var(--text-secondary); margin-bottom:1.5rem;">The session starts at 14:00 SGT. Broadcast feeds will be routed directly to registered client emails.</p>
        <button class="btn-neon" onclick="window.showToast('Registered for event!', 'success'); window.closeModal();" style="width:100%; justify-content: center;">Register Seat</button>
      `);
    });
  });
});
