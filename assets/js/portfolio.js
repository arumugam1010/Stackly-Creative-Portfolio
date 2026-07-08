// Portfolio filtering & modal triggers
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.portfolio-card');
  const searchInput = document.querySelector('.portfolio-search');

  function filterProjects() {
    const activeTab = document.querySelector('.filter-tab.active').getAttribute('data-filter');
    const query = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.portfolio-card-title').textContent.toLowerCase();
      const desc = card.querySelector('.portfolio-card-desc').textContent.toLowerCase();
      
      const matchesCategory = (activeTab === 'all' || category === activeTab);
      const matchesSearch = title.includes(query) || desc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        card.style.animation = 'fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterProjects();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }

  // Card clicks - Redirect to 404.html instead of opening modal
  cards.forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = '../404.html';
    });
  });
});
