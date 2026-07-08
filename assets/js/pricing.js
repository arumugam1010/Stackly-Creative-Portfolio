// Pricing Toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.pricing-switch');
  const starterPrice = document.getElementById('starter-price');
  const enterprisePrice = document.getElementById('enterprise-price');

  if (toggle && starterPrice && enterprisePrice) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('yearly');
      
      const isYearly = toggle.classList.contains('yearly');
      if (isYearly) {
        starterPrice.textContent = '$490';
        enterprisePrice.textContent = '$1,490';
        window.showToast('Updated to annual billing (15% savings)', 'info');
      } else {
        starterPrice.textContent = '$49';
        enterprisePrice.textContent = '$149';
        window.showToast('Updated to monthly billing', 'info');
      }
    });
  }
});
