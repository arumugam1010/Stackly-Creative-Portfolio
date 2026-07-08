// FAQ accordion panels height animations
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSearch = document.getElementById('faq-search');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other panels
      faqItems.forEach(x => {
        x.classList.remove('active');
        x.querySelector('.faq-answer-panel').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Search filter
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});
