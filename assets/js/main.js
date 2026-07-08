document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initThemeToggle();
  initScrollEffects();
  initIntersectionObserver();
  initRippleEffect();
  initMobileNav();
  initToastSystem();
  initModalSystem();
  initDynamicTyping();
  initGlobalButtonRedirects();
  initDashboardUserDisplay();
});

// Custom Cursor
function initCustomCursor() {
  const cursor = document.createElement('div');
  const dot = document.createElement('div');
  cursor.className = 'custom-cursor';
  dot.className = 'custom-cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(dot);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    
    // Smooth trailing
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover animations on links/buttons
  const hoverables = document.querySelectorAll('a, button, .clickable, input, select, textarea');
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'var(--primary-magenta)';
      cursor.style.backgroundColor = 'rgba(255, 0, 127, 0.05)';
    });
    item.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderColor = 'var(--primary-cyan)';
      cursor.style.backgroundColor = 'transparent';
    });
  });
}

// Theme Toggle
function initThemeToggle() {
  document.documentElement.setAttribute('data-theme', 'light');
}

// Scroll Effects (Navbar shrinking, Back-to-Top display)
function initScrollEffects() {
  const header = document.querySelector('.header-glass');
  
  // Create Back to Top button dynamically
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
}

// Intersection Observer for scroll reveal animations
function initIntersectionObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once animation triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(element => observer.observe(element));
}

// Ripple Effect for buttons
function initRippleEffect() {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.ripple-btn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-span';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Mobile Nav Toggle
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  // Create a dynamic full-screen blur overlay
  let overlay = document.querySelector('.mobile-drawer-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-drawer-overlay';
    document.body.appendChild(overlay);
  }

  // Create a separate mobile-nav-drawer so the desktop nav-menu stays 100% clean and untouched!
  let drawer = document.querySelector('.mobile-nav-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'mobile-nav-drawer';
    document.body.appendChild(drawer);

    const originalItems = Array.from(menu.children);
    
    const wrapper = document.createElement('div');
    wrapper.className = 'mobile-sidebar-wrapper';
    wrapper.style.cssText = 'display: flex; flex-direction: column; width: 100%; height: 100%; text-align: left;';
    
    // 1. Sidebar Header
    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'mobile-sidebar-header';
    sidebarHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; width: 100%;';
    
    const isSubPage = window.location.pathname.includes('/pages/');
    const logoSrc = isSubPage ? '../assets/images/logo-stackly.png' : 'assets/images/logo-stackly.png';
    const homeHref = isSubPage ? '../index.html' : 'index.html';
    
    sidebarHeader.innerHTML = `
      <a href="${homeHref}" style="display: flex; align-items: center; text-decoration: none;">
        <img src="${logoSrc}" alt="Stackly Logo" style="height: 24px; width: auto; filter: none; display: block;">
      </a>
      <button class="sidebar-close-btn" style="background: none; border: none; color: var(--text-primary); font-size: 1.5rem; cursor: pointer; padding: 0.5rem; line-height: 1;">✕</button>
    `;
    wrapper.appendChild(sidebarHeader);
    
    // 2. Search Box
    const searchBox = document.createElement('div');
    searchBox.className = 'mobile-sidebar-search';
    searchBox.style.cssText = 'margin-bottom: 2rem; width: 100%;';
    searchBox.innerHTML = `
      <h4 style="font-family: var(--font-title); color: var(--text-primary); font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem;">Search Now!</h4>
      <div style="display: flex; align-items: center; background: #ffffff; border: 1px solid var(--border-color); border-radius: 8px; padding: 0.25rem 0.75rem; width: 100%;">
        <input type="text" placeholder="Search here.." style="background: transparent; border: none; outline: none; color: var(--text-primary); font-size: 0.85rem; flex-grow: 1; padding: 0.5rem 0;">
        <span style="color: var(--text-muted); font-size: 0.9rem; cursor: pointer; padding-left: 0.5rem;">🔍</span>
      </div>
    `;
    wrapper.appendChild(searchBox);
    
    // 3. Navigation Links List
    const linksList = document.createElement('ul');
    linksList.className = 'mobile-sidebar-links';
    linksList.style.cssText = 'list-style: none; display: flex; flex-direction: column; width: 100%; margin-bottom: 2rem; padding: 0;';
    
    originalItems.forEach(li => {
      const clonedLi = li.cloneNode(true);
      clonedLi.style.cssText = 'width: 100%; list-style: none; padding: 0; margin: 0;';
      const a = clonedLi.querySelector('a');
      if (a) {
        a.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 0; color: var(--text-primary); text-decoration: none; font-size: 0.95rem; font-weight: 600; font-family: var(--font-title); border-bottom: 1px solid var(--border-color); width: 100%; transition: color 0.2s;';
        
        if (a.textContent.trim().toLowerCase() === 'home' || a.textContent.trim().toLowerCase() === 'services' || a.textContent.trim().toLowerCase() === 'blog') {
          a.innerHTML = `<span>${a.textContent}</span><span style="font-size: 0.65rem; color: var(--text-muted); transition: transform 0.3s;">▼</span>`;
        }
        
        a.addEventListener('mouseover', () => a.style.color = 'var(--primary-cyan)');
        a.addEventListener('mouseout', () => a.style.color = 'var(--text-primary)');

        // Tap/click dropdown toggle support for mobile screens (since hover doesn't exist on touch devices)
        if (clonedLi.classList.contains('nav-item-dropdown')) {
          const dropdownMenu = clonedLi.querySelector('.nav-dropdown-menu');
          const caret = a.querySelector('span:last-child');
          
          a.addEventListener('click', (e) => {
            if (dropdownMenu) {
              e.preventDefault();
              e.stopPropagation();
              const isClosed = !dropdownMenu.classList.contains('mobile-open');
              
              // Close other open dropdowns first to keep it clean
              linksList.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
                menu.classList.remove('mobile-open');
                menu.style.display = 'none';
              });
              linksList.querySelectorAll('.nav-item-dropdown a span:last-child').forEach(c => {
                c.style.transform = 'rotate(0deg)';
              });

              if (isClosed) {
                dropdownMenu.classList.add('mobile-open');
                dropdownMenu.style.setProperty('display', 'block', 'important');
                if (caret) caret.style.transform = 'rotate(180deg)';
              }
            }
          });
        }
      }
      linksList.appendChild(clonedLi);
    });
    wrapper.appendChild(linksList);
    
    // 3.5. Portal Login Button inside Mobile Sidebar
    const portalLoginContainer = document.createElement('div');
    portalLoginContainer.className = 'mobile-sidebar-actions';
    portalLoginContainer.style.cssText = 'width: 100%; margin-bottom: 2rem;';
    const loginUrl = isSubPage ? '../authentication/login.html' : 'authentication/login.html';
    portalLoginContainer.innerHTML = `
      <a href="${loginUrl}" class="btn-neon ripple-btn" style="display: block; text-align: center; padding: 0.8rem 1.5rem; font-size: 0.9rem; font-weight: 700; border-radius: 30px; text-decoration: none; width: 100%; background: var(--primary-blue); color: #ffffff; box-shadow: var(--shadow-neon-cyan);">Portal Login</a>
    `;
    wrapper.appendChild(portalLoginContainer);
    
    // 4. Contact Info
    const contactInfo = document.createElement('div');
    contactInfo.className = 'mobile-sidebar-contact';
    contactInfo.style.cssText = 'margin-top: auto; margin-bottom: 1.5rem; width: 100%; border-top: 1px solid var(--border-color); padding-top: 1.5rem;';
    contactInfo.innerHTML = `
      <h4 style="font-family: var(--font-title); color: var(--text-primary); font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem;">Contact Info</h4>
      <div style="margin-bottom: 0.85rem;">
        <span style="display: block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.15rem; text-transform: uppercase; letter-spacing: 0.5px;">Phone</span>
        <a href="tel:+917010792745" style="color: var(--text-primary); text-decoration: none; font-size: 0.85rem; font-weight: 500;">+91 7010792745</a>
      </div>
      <div style="margin-bottom: 0.85rem;">
        <span style="display: block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.15rem; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
        <a href="mailto:info@thestackly.com" style="color: var(--text-primary); text-decoration: none; font-size: 0.85rem; font-weight: 500;">info@thestackly.com</a>
      </div>
      <div>
        <span style="display: block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.15rem; text-transform: uppercase; letter-spacing: 0.5px;">Location</span>
        <span style="color: var(--text-primary); font-size: 0.85rem; font-weight: 500;">Stackly, Salem</span>
      </div>
    `;
    wrapper.appendChild(contactInfo);
    
    drawer.appendChild(wrapper);

    const closeBtn = sidebarHeader.querySelector('.sidebar-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        toggle.innerHTML = '☰';
        document.body.style.overflow = '';
      });
    }
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      toggle.innerHTML = '✕';
      document.body.style.overflow = 'hidden';
    } else {
      toggle.innerHTML = '☰';
      document.body.style.overflow = '';
    }
  });

  // Clicking on the blurred overlay closes the sidebar
  overlay.addEventListener('click', () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggle.innerHTML = '☰';
    document.body.style.overflow = '';
  });
}

// Toast Notification System
function initToastSystem() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);

  window.showToast = function(message, type = 'info', duration = 3000) {
    const card = document.createElement('div');
    card.className = `toast-card ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';

    card.innerHTML = `
      <div style="display:flex; align-items: center; gap: 0.75rem;">
        <span>${icon}</span>
        <span style="font-size:0.9rem; font-weight:500;">${message}</span>
      </div>
      <button class="toast-close">✕</button>
    `;

    container.appendChild(card);

    const closeBtn = card.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      card.style.animation = 'none';
      card.style.transform = 'translateX(120%)';
      card.style.transition = '0.3s';
      setTimeout(() => card.remove(), 300);
    });

    setTimeout(() => {
      card.style.animation = 'none';
      card.style.transform = 'translateX(120%)';
      card.style.transition = '0.3s';
      setTimeout(() => card.remove(), 300);
    }, duration);
  };
}

// Modal System
function initModalSystem() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-window">
      <button class="modal-close">✕</button>
      <h3 class="modal-title" style="font-family: var(--font-title); font-size:1.8rem; margin-bottom:1.25rem;"></h3>
      <div class="modal-body" style="font-size:1rem; line-height:1.6; color: var(--text-secondary);"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const titleEl = overlay.querySelector('.modal-title');
  const bodyEl = overlay.querySelector('.modal-body');
  const closeBtn = overlay.querySelector('.modal-close');

  window.openModal = function(title, contentHtml) {
    titleEl.textContent = title;
    bodyEl.innerHTML = contentHtml;
    overlay.classList.add('active');
  };

  window.closeModal = function() {
    overlay.classList.remove('active');
  };

  closeBtn.addEventListener('click', window.closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) window.closeModal();
  });
}

// Typing Effect Animation helper
function initDynamicTyping() {
  const elements = document.querySelectorAll('.typewriter-effect');
  elements.forEach(el => {
    const textArray = el.getAttribute('data-words').split(',');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentWord = textArray[wordIndex];
      if (isDeleting) {
        el.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let speed = isDeleting ? 50 : 150;
      
      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % textArray.length;
        speed = 500;
      }
      
      setTimeout(type, speed);
    }
    
    type();
  });
}

// Global button redirect to 404.html except Portal Login
function initGlobalButtonRedirects() {
  document.addEventListener('click', (e) => {
    // Find closest anchor tag
    const link = e.target.closest('a');
    
    // If it is a link
    if (link) {
      const text = link.textContent.trim().toLowerCase();
      const href = link.getAttribute('href');
      
      // Skip redirect if pointing to index.html or having skip-404 class
      if (href && (href.includes('index.html') || link.classList.contains('skip-404'))) {
        return;
      }
        
      // Global logout trigger interceptor
      if (href && href.includes('logout.html')) {
        e.preventDefault();
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_user');
        sessionStorage.removeItem('auth_role');
        const path = window.location.pathname;
        let loginUrl = 'authentication/login.html';
        if (path.includes('/dashboard/') || path.includes('/pages/') || path.includes('/authentication/')) {
          loginUrl = '../authentication/login.html';
        }
        window.location.href = loginUrl;
        return;
      }

      // Skip Portal Login
      if (text.includes('portal login') || (href && href.includes('login.html'))) {
        return;
      }

      // Skip dropdown triggers or links acting as menu categories
      if (link.classList.contains('nav-link') && (link.nextElementSibling || link.querySelector('.nav-caret'))) {
        return;
      }

      // Skip all navigation menu and drawer links
      if (link.closest('.nav-menu') || link.closest('.mobile-nav-drawer') || link.classList.contains('nav-link') || link.closest('.nav-dropdown-menu')) {
        return;
      }

      // Check if the link has a button-like style class
      const hasBtnClass = link.classList.contains('btn') || 
                          link.classList.contains('btn-neon') || 
                          link.classList.contains('btn-outline') || 
                          link.classList.contains('btn-white-pill') || 
                          link.classList.contains('btn-primary') || 
                          link.classList.contains('ripple-btn') || 
                          link.closest('.service-card-actions') || 
                          link.closest('.pricing-card-action') || 
                          link.closest('.hero-actions') || 
                          link.closest('.cta-banner-section') || 
                          text.includes('apply now') || 
                          text.includes('pricing') ||
                          text.includes('details') ||
                          text.includes('book consultation') ||
                          text.includes('choose plan');

      if (hasBtnClass) {
        e.preventDefault();
        // Find path relative to 404.html
        const path = window.location.pathname;
        let redirectUrl = '404.html';
        if (path.includes('/pages/') || path.includes('/dashboard/') || path.includes('/authentication/')) {
          redirectUrl = '../404.html';
        }
        window.location.href = redirectUrl;
      }
    }

    // If it is a button tag (or input type submit)
    const button = e.target.closest('button, input[type="submit"]');
    if (button && !link) {
      // Skip mobile navigation menu toggle and other UI elements
      if (button.classList.contains('mobile-nav-toggle') || 
          button.classList.contains('sidebar-close-btn') || 
          button.classList.contains('theme-toggle-btn') || 
          button.classList.contains('back-to-top') || 
          button.closest('.nav-actions') || 
          button.classList.contains('close-btn') ||
          button.classList.contains('modal-close') ||
          button.closest('.auth-container') ||
          button.closest('.login-card') ||
          button.closest('.auth-card') ||
          button.closest('.auth-wrapper') ||
          button.closest('.panel') ||
          button.closest('.signin-signup') ||
          button.closest('.db-header') ||
          button.closest('.db-sidebar') ||
          button.closest('.dashboard-container') ||
          button.classList.contains('mobile-db-sidebar-toggle')) {
        return;
      }

      e.preventDefault();
      const path = window.location.pathname;
      let redirectUrl = '404.html';
      if (path.includes('/pages/') || path.includes('/dashboard/') || path.includes('/authentication/')) {
        redirectUrl = '../404.html';
      }
      window.location.href = redirectUrl;
    }
  });
}

// Synchronize logged-in user profile details inside dashboard screens
function initDashboardUserDisplay() {
  const email = sessionStorage.getItem('auth_user') || '';
  if (!email) return;

  // Extract display name: e.g. saravanan@company.com -> Saravanan
  // e.g. john.doe@company.com -> John Doe
  let displayName = email.split('@')[0];
  displayName = displayName.split(/[._-]/).map(part => {
    if (part.length === 0) return '';
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).filter(Boolean).join(' ');

  const firstName = displayName.split(' ')[0] || 'User';

  // 1. Update Profile Menu Name Tag
  const profileNameEl = document.querySelector('.db-profile-menu .sidebar-collapsed-text');
  if (profileNameEl) {
    profileNameEl.textContent = displayName;
  }

  // 2. Update Profile Menu Avatar Initials
  const profileAvatarEl = document.querySelector('.db-profile-menu .comment-avatar');
  if (profileAvatarEl) {
    const parts = displayName.split(' ');
    let initials = 'U';
    if (parts.length >= 2) {
      initials = (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    } else if (parts[0].length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
    profileAvatarEl.textContent = initials;
  }

  // 3. Update Hero Title greeting
  const heroTitle = document.querySelector('.db-hero-title');
  if (heroTitle) {
    if (heroTitle.textContent.includes('Online,')) {
      heroTitle.innerHTML = `Operations Centre Online, ${firstName}! 👋`;
    } else if (heroTitle.textContent.includes('deploy,')) {
      heroTitle.innerHTML = `Ready to deploy, ${firstName}! 👋`;
    } else if (heroTitle.textContent.includes('Centre,')) {
      heroTitle.innerHTML = `Sprints & Slices Centre, ${firstName}! 👋`;
    }
  }

  // 4. Update Profile Page Form Inputs if they exist
  const profileNameInput = document.querySelector('form input[type="text"][value="Marcus Thorne"]');
  if (profileNameInput) {
    profileNameInput.value = displayName;
  }
  const profileEmailInput = document.querySelector('form input[type="email"][value="marcus@stackly.io"]');
  if (profileEmailInput) {
    profileEmailInput.value = email;
  }
}



