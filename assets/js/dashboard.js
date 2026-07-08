// Dashboard actions
document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  initDashboardCharts();
  initKanbanDragDrop();
  initDashboardSearches();
  initDashboardButtonRedirects();
});

// Redirect all action buttons to 404 (except sidebar toggles)
function initDashboardButtonRedirects() {
  const excludedIds = new Set(['sidebar-toggle', 'mobile-sidebar-toggle']);
  const notFoundUrl = '../404.html';

  document.querySelectorAll('button').forEach((btn) => {
    if (excludedIds.has(btn.id) || btn.hasAttribute('data-no-redirect')) return;

    btn.removeAttribute('onclick');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = notFoundUrl;
    });
  });
}

// Collapsible sidebar
function initSidebarToggle() {
  const container = document.querySelector('.dashboard-container');
  if (!container) return;

  // Create blurred background overlay for dashboard mobile view if not present
  let overlay = document.querySelector('.db-sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'db-sidebar-overlay';
    container.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', () => {
      container.classList.remove('sidebar-open');
      overlay.classList.remove('open');
      document.documentElement.classList.remove('sidebar-open-lock');
      document.body.classList.remove('sidebar-open-lock');
    });
  }

  const toggleBtn = document.getElementById('sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      // Close the sidebar and overlay on mobile views instead of collapsing/redirecting
      if (window.innerWidth <= 1000) {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove('sidebar-open');
        const overlay = document.querySelector('.db-sidebar-overlay');
        if (overlay) {
          overlay.classList.remove('open');
        }
        document.documentElement.classList.remove('sidebar-open-lock');
        document.body.classList.remove('sidebar-open-lock');
        return;
      }

      container.classList.toggle('sidebar-collapsed');
      
      // Save state
      const collapsed = container.classList.contains('sidebar-collapsed');
      toggleBtn.textContent = collapsed ? '▶' : '◀';
      localStorage.setItem('sidebar_collapsed', collapsed ? 'true' : 'false');
    });

    // Restore state
    const isCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
    if (isCollapsed) {
      container.classList.add('sidebar-collapsed');
      toggleBtn.textContent = '▶';
    }
  }

  // Mobile sidebar toggle
  const mobileToggleBtn = document.getElementById('mobile-sidebar-toggle');
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      container.classList.toggle('sidebar-open');
      const isOpen = container.classList.contains('sidebar-open');
      
      const overlay = document.querySelector('.db-sidebar-overlay');
      if (overlay) {
        overlay.classList.toggle('open', isOpen);
      }
      
      if (isOpen) {
        document.documentElement.classList.add('sidebar-open-lock');
        document.body.classList.add('sidebar-open-lock');
      } else {
        document.documentElement.classList.remove('sidebar-open-lock');
        document.body.classList.remove('sidebar-open-lock');
      }
    });
  }

  // Close mobile sidebar when clicking outside of it
  document.addEventListener('click', (e) => {
    if (container.classList.contains('sidebar-open')) {
      const sidebar = document.querySelector('.db-sidebar');
      if (sidebar && !sidebar.contains(e.target) && e.target !== mobileToggleBtn && !mobileToggleBtn.contains(e.target)) {
        container.classList.remove('sidebar-open');
        const overlay = document.querySelector('.db-sidebar-overlay');
        if (overlay) {
          overlay.classList.remove('open');
        }
        document.documentElement.classList.remove('sidebar-open-lock');
        document.body.classList.remove('sidebar-open-lock');
      }
    }
  });

  // Close sidebar drawer, remove backdrop blur overlay, and unlock scroll when switching tabs
  document.querySelectorAll('.sidebar-menu-item a').forEach(link => {
    link.addEventListener('click', () => {
      container.classList.remove('sidebar-open');
      const overlay = document.querySelector('.db-sidebar-overlay');
      if (overlay) {
        overlay.classList.remove('open');
      }
      document.documentElement.classList.remove('sidebar-open-lock');
      document.body.classList.remove('sidebar-open-lock');
    });
  });
}

// Chart animations
function initDashboardCharts() {
  const bars = document.querySelectorAll('.chart-bar-col');
  bars.forEach(bar => {
    const val = bar.getAttribute('data-height') || '50';
    setTimeout(() => {
      bar.style.height = `${val}%`;
    }, 300);
  });
}

// Kanban Drag and Drop simulations (touch-friendly mouse event fallback for compatibility)
function initKanbanDragDrop() {
  const cards = document.querySelectorAll('.kanban-card-item');
  const columns = document.querySelectorAll('.kanban-cards-wrapper');
  let draggedCard = null;

  cards.forEach(card => {
    card.setAttribute('draggable', 'true');
    
    card.addEventListener('dragstart', (e) => {
      draggedCard = card;
      card.style.opacity = '0.5';
    });

    card.addEventListener('dragend', () => {
      draggedCard = null;
      card.style.opacity = '1';
    });
  });

  columns.forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    col.addEventListener('dragenter', (e) => {
      e.preventDefault();
      col.style.background = 'rgba(255, 255, 255, 0.03)';
    });

    col.addEventListener('dragleave', () => {
      col.style.background = 'transparent';
    });

    col.addEventListener('drop', (e) => {
      col.style.background = 'transparent';
      if (draggedCard) {
        col.appendChild(draggedCard);
        window.showToast('Task position updated', 'info');
      }
    });
  });
}

// Header search toast trigger
function initDashboardSearches() {
  const searchInput = document.querySelector('.db-search-bar');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const val = searchInput.value;
        window.showToast(`Search query logged: ${val}`, 'info');
        searchInput.value = '';
      }
    });
  }
}
