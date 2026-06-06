/* ============================================================
   VITIS — Main JavaScript
   ============================================================ */

const pages = ['home', 'varieties', 'wine', 'health', 'contact'];

// Page switching
function showPage(name) {
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.add('d-none');
  });

  const target = document.getElementById('page-' + name);
  if (target) {
    target.classList.remove('d-none');
    target.classList.add('page-enter');
    setTimeout(() => target.classList.remove('page-enter'), 600);
  }

  // Update nav color per page
  updateNavTheme(name);

  // Trigger page-specific animations
  if (name === 'health') {
    setTimeout(animateNutrientBars, 300);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav if open
  const navMenu = document.getElementById('navMenu');
  if (navMenu && navMenu.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
    if (bsCollapse) bsCollapse.hide();
  }
}

// Nav theme per page
function updateNavTheme(page) {
  const nav = document.getElementById('mainNav');
  nav.style.background = {
    home:      'rgba(10, 5, 20, 0.92)',
    varieties: 'rgba(30, 5, 10, 0.92)',
    wine:      'rgba(10, 3, 3, 0.95)',
    health:    'rgba(5, 25, 12, 0.95)',
    contact:   'rgba(8, 4, 18, 0.95)',
  }[page] || 'rgba(10, 5, 20, 0.92)';
}

// Variety filter
function filterVariety(type, btn) {
  document.querySelectorAll('.var-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.variety-item').forEach(item => {
    if (type === 'all' || item.dataset.type === type) {
      item.style.display = '';
      item.style.animation = 'fadeUp 0.4s ease both';
    } else {
      item.style.display = 'none';
    }
  });
}

// Nutrient bar animation
function animateNutrientBars() {
  document.querySelectorAll('.n-bar').forEach((bar, i) => {
    const targetW = bar.dataset.w || bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = targetW;
    }, i * 150);
  });
}

// Contact form
function sendMessage() {
  const success = document.getElementById('contactSuccess');
  const btn = document.querySelector('.btn-send');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    success.classList.remove('d-none');
    btn.textContent = 'Sent! ✓';
    btn.style.background = 'linear-gradient(135deg, #1a7a44, #52c77a)';
    btn.style.opacity = '1';

    // Reset fields
    document.querySelectorAll('.cf-input').forEach(input => {
      if (input.tagName === 'TEXTAREA' || input.type === 'text' || input.type === 'email') {
        input.value = '';
      }
    });

    setTimeout(() => {
      success.classList.add('d-none');
      btn.textContent = 'Send Message ✈';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }, 1200);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.borderBottom = '1px solid rgba(200,169,110,0.15)';
  } else {
    nav.style.backdropFilter = 'blur(14px)';
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');

  // Run bars on health page load if it were first
  document.querySelectorAll('.n-bar').forEach(bar => {
    const targetW = bar.style.width;
    bar.dataset.w = targetW;
    bar.style.width = '0';
  });

  // Parallax-lite for hero shapes
  window.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth - 0.5) * 20;
    const my = (e.clientY / window.innerHeight - 0.5) * 20;
    const bunch = document.querySelector('.hero-grape-cluster');
    if (bunch) {
      bunch.style.transform = `translateY(calc(-50% + ${my * 0.3}px)) translateX(${mx * 0.2}px)`;
    }
  });
});
