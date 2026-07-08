// Home Page Specific Logic
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initCounters();
  initHeroSlider();
});

// Canvas node network animation (replacing background video for performance & direct compatibility)
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const nodes = [];
  const maxNodes = 65;
  const connectionDistance = 120;

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < maxNodes; i++) {
    nodes.push(new Node());
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          const opacity = (1 - dist / connectionDistance) * 0.12;
          ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Counters animation
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  const speed = 200; // lower is faster

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animateCount = (counter) => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const inc = target / speed;

          const update = () => {
            count += inc;
            if (count < target) {
              counter.textContent = Math.ceil(count).toLocaleString();
              setTimeout(update, 1);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };
          update();
        };

        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// Auto-scrolling horizontal projects slider
document.addEventListener('DOMContentLoaded', () => {
  initProjectsSliderAutoScroll();
});

function initProjectsSliderAutoScroll() {
  const slider = document.querySelector('.projects-slider');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let autoScrollTimer = null;
  const scrollSpeed = 1; // pixels per frame
  let autoScrollActive = true;

  // Touch and mouse drag functionality
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.scrollBehavior = 'auto';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    pauseAutoScroll();
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    resumeAutoScroll();
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    resumeAutoScroll();
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchstart', () => {
    slider.style.scrollBehavior = 'auto';
    pauseAutoScroll();
  }, { passive: true });

  slider.addEventListener('touchend', () => {
    resumeAutoScroll();
  }, { passive: true });

  // Auto scroll loop
  function startAutoScroll() {
    if (autoScrollTimer) return;
    autoScrollTimer = setInterval(() => {
      if (!autoScrollActive || isDown) return;
      
      slider.scrollLeft += scrollSpeed;
      
      // If we reach the end, reset scroll back to start
      if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 2)) {
        slider.scrollLeft = 0;
      }
    }, 20); // 50fps smooth scroll
  }

  function pauseAutoScroll() {
    autoScrollActive = false;
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  }

  function resumeAutoScroll() {
    autoScrollActive = true;
    startAutoScroll();
  }

  // Start scrolling
  startAutoScroll();

  // Pause on hover
  slider.addEventListener('mouseenter', pauseAutoScroll);
  slider.addEventListener('mouseleave', resumeAutoScroll);
}

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  let slideInterval = null;
  const intervalTime = 6000; // 6 seconds per slide
  
  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  
  function startSlideShow() {
    stopSlideShow();
    slideInterval = setInterval(nextSlide, intervalTime);
  }
  
  function stopSlideShow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }
  
  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startSlideShow(); // reset timer
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startSlideShow(); // reset timer
    });
  }
  
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'));
      goToSlide(slideIndex);
      startSlideShow(); // reset timer
    });
  });
  
  // Start slider auto-rotate
  startSlideShow();
  
  // Optional: Pause on hover
  const sliderContainer = document.querySelector('.hero-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideShow);
    sliderContainer.addEventListener('mouseleave', startSlideShow);
  }
}

