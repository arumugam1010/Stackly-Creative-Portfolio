// About page specific JS
document.addEventListener('DOMContentLoaded', () => {
  // Milestones hover interaction details
  const timelineBadges = document.querySelectorAll('.timeline-badge');
  timelineBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'translateX(-50%) scale(1.15)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'translateX(-50%) scale(1)';
    });
  });
});
