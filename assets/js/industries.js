// Industries interactions
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.industry-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.industry-title').textContent;
      const desc = card.querySelector('p').textContent;
      window.openModal(title, `
        <p style="margin-bottom:1.5rem; line-height:1.6;">${desc}</p>
        <h4 style="margin-bottom:0.75rem;">Sample Deployments</h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; color:var(--text-secondary); margin-bottom:1.5rem;">
          <li>✓ Core ledger scaling architectures</li>
          <li>✓ Automated user compliance filters</li>
        </ul>
        <a href="contact.html" class="btn-neon" style="width:100%; justify-content: center;">Request Industry Case Study</a>
      `);
    });
  });
});
