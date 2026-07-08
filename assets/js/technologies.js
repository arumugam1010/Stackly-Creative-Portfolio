// Technologies specific JS
document.addEventListener('DOMContentLoaded', () => {
  const circles = document.querySelectorAll('.progress-ring-circle');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const percent = circle.getAttribute('data-percent');
        const offset = circumference - (percent / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
        
        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.5 });

  circles.forEach(c => observer.observe(c));

  // Category filter tabs
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.tech-item-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-cat') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
