// Projects progress animations
document.addEventListener('DOMContentLoaded', () => {
  const progressFills = document.querySelectorAll('.progress-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetPercent = fill.getAttribute('data-value');
        fill.style.width = `${targetPercent}%`;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  progressFills.forEach(fill => observer.observe(fill));
});
