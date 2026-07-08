// Team skill bars animations
document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelectorAll('.team-skill-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const val = fill.getAttribute('data-skill');
        fill.style.width = `${val}%`;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.1 });

  skills.forEach(s => observer.observe(s));
});
