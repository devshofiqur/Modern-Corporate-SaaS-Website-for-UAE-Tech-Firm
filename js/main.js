// ===== TECHCONSULT UAE - MAIN JS =====

// Theme Management
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('theme') || 'light';
    this.set(saved);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.set(current === 'dark' ? 'light' : 'dark');
  },
  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
};

// Language Management
const i18n = {
  current: 'en',
  data: {
    en: {
      nav_home: 'Home', nav_about: 'About', nav_services: 'Services',
      nav_products: 'Products', nav_industries: 'Industries',
      nav_cases: 'Case Studies', nav_blog: 'Blog', nav_contact: 'Contact',
      nav_cta: 'Book Consultation',
      hero_label: 'UAE\'s Premier Tech Partner',
      hero_h1_1: 'Custom Software,',
      hero_h1_2: 'Automation & AI',
      hero_h1_3: 'Solutions for UAE',
      hero_sub: 'We transform ambitious businesses with enterprise-grade technology solutions — from AI automation to custom software, built for the UAE market.',
      hero_btn1: '📅 Book Free Consultation',
      hero_btn2: 'Explore Services',
      stat1: 'Projects', stat2: 'Clients', stat3: 'Years', stat4: 'Success',
      trust_title: 'Trusted by UAE\'s Leading Enterprises',
      section_services: 'Our Services',
      section_products: 'Our Products',
      section_industries: 'Industries We Serve',
      section_process: 'Our Process',
      section_why: 'Why Choose NexaTech',
      section_cases: 'Case Studies',
      section_blog: 'Latest Insights',
      footer_rights: '© 2026 Dev-Shofiqur | All rights reserved.',
    },
    ar: {
      nav_home: 'الرئيسية', nav_about: 'من نحن', nav_services: 'الخدمات',
      nav_products: 'المنتجات', nav_industries: 'القطاعات',
      nav_cases: 'دراسات الحالة', nav_blog: 'المدونة', nav_contact: 'اتصل بنا',
      nav_cta: 'احجز استشارة',
      hero_label: 'الشريك التقني الأول في الإمارات',
      hero_h1_1: 'برمجيات مخصصة،',
      hero_h1_2: 'أتمتة وحلول الذكاء',
      hero_h1_3: 'الاصطناعي للإمارات',
      hero_sub: 'نحول الشركات الطموحة بحلول تقنية على مستوى المؤسسات — من أتمتة الذكاء الاصطناعي إلى البرمجيات المخصصة.',
      hero_btn1: '📅 احجز استشارة مجانية',
      hero_btn2: 'استكشف خدماتنا',
      stat1: 'مشروع', stat2: 'عميل', stat3: 'سنوات', stat4: 'نجاح',
      trust_title: 'موثوق به من كبرى شركات الإمارات',
      section_services: 'خدماتنا',
      section_products: 'منتجاتنا',
      section_industries: 'القطاعات التي نخدمها',
      section_process: 'منهجيتنا',
      section_why: 'لماذا تختار نيكساتك',
      section_cases: 'دراسات الحالة',
      section_blog: 'أحدث الرؤى',
      footer_rights: '© 2025 نيكساتك الإمارات. جميع الحقوق محفوظة.',
    },
    fr: {
      nav_home: 'Accueil', nav_about: 'À propos', nav_services: 'Services',
      nav_products: 'Produits', nav_industries: 'Industries',
      nav_cases: 'Études de cas', nav_blog: 'Blog', nav_contact: 'Contact',
      nav_cta: 'Réserver une consultation',
      hero_label: 'Partenaire Tech Premier des EAU',
      hero_h1_1: 'Logiciels sur mesure,',
      hero_h1_2: 'Automatisation & IA',
      hero_h1_3: 'Solutions pour les EAU',
      hero_sub: 'Nous transformons les entreprises ambitieuses avec des solutions technologiques de niveau entreprise.',
      hero_btn1: '📅 Consultation gratuite',
      hero_btn2: 'Explorer les services',
      stat1: 'Projets', stat2: 'Clients', stat3: 'Années', stat4: 'Succès',
      trust_title: 'Approuvé par les grandes entreprises des EAU',
      section_services: 'Nos services',
      section_products: 'Nos produits',
      section_industries: 'Industries desservies',
      section_process: 'Notre processus',
      section_why: 'Pourquoi NexaTech',
      section_cases: 'Études de cas',
      section_blog: 'Dernières perspectives',
      footer_rights: '© 2025 NexaTech UAE. Tous droits réservés.',
    }
  },
  t(key) {
    return (this.data[this.current] || this.data['en'])[key] || key;
  },
  set(lang) {
    this.current = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    this.apply();
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-option').forEach(el => {
      el.classList.toggle('active', el.dataset.lang === lang);
    });
    // Update lang btn
    const labels = { en: '🌐 EN', ar: '🌐 AR', fr: '🌐 FR' };
    const btn = document.getElementById('langBtnLabel');
    if (btn) btn.textContent = labels[lang] || '🌐 EN';
  },
  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });
  }
};

// Navigation / Page Router
const Router = {
  current: 'home',
  navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }
    document.querySelectorAll('.nav-page-link').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });
    this.current = page;
    // Close mobile menu
    document.getElementById('mobileMenu')?.classList.remove('open');
  }
};

// Counter Animation
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 1800;
  const start = performance.now();
  
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Counter
        if (entry.target.hasAttribute('data-target')) {
          animateCounter(entry.target);
        }
        // Progress bars
        entry.target.querySelectorAll('.progress-fill').forEach(bar => {
          const w = bar.getAttribute('data-width') || '0';
          setTimeout(() => bar.style.width = w + '%', 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.reveal, [data-target]').forEach(el => observer.observe(el));
}

// Bar chart animation in hero
function animateBars() {
  const heights = [35, 55, 45, 70, 50, 85, 65, 90, 75, 60];
  const bars = document.querySelectorAll('.db-bar');
  bars.forEach((bar, i) => {
    setTimeout(() => {
      bar.style.height = heights[i % heights.length] + 'px';
    }, i * 80);
  });
}

// Navbar scroll behavior
function initNavbar() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    const backTop = document.querySelector('.back-top');
    if (window.scrollY > 60) {
      nav?.classList.add('scrolled');
      backTop?.classList.add('visible');
    } else {
      nav?.classList.remove('scrolled');
      backTop?.classList.remove('visible');
    }
  });
}

// Multi-step form
const FormManager = {
  step: 1,
  totalSteps: 3,
  
  next() {
    if (this.step < this.totalSteps) {
      document.querySelector(`.step-panel[data-step="${this.step}"]`)?.classList.remove('active');
      this.step++;
      document.querySelector(`.step-panel[data-step="${this.step}"]`)?.classList.add('active');
      this.updateDots();
    }
  },
  
  prev() {
    if (this.step > 1) {
      document.querySelector(`.step-panel[data-step="${this.step}"]`)?.classList.remove('active');
      this.step--;
      document.querySelector(`.step-panel[data-step="${this.step}"]`)?.classList.add('active');
      this.updateDots();
    }
  },
  
  updateDots() {
    document.querySelectorAll('.form-step-dot').forEach((dot, i) => {
      const n = i + 1;
      dot.classList.remove('active', 'done');
      if (n < this.step) dot.classList.add('done'), dot.textContent = '✓';
      else if (n === this.step) dot.classList.add('active'), dot.textContent = n;
      else dot.textContent = n;
    });
    document.querySelectorAll('.form-step-line').forEach((line, i) => {
      line.classList.toggle('active', i < this.step - 1);
    });
  },
  
  submit(e) {
    e.preventDefault();
    showToast('✅', 'Thank you! We\'ll contact you within 24 hours.');
    this.step = 1;
    e.target.reset();
    this.updateDots();
    document.querySelectorAll('.step-panel').forEach((p, i) => {
      p.classList.toggle('active', i === 0);
    });
  }
};

// Toast notifications
function showToast(icon, msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Dashboard bars heights (random-ish for visual)
const BAR_HEIGHTS = [28, 48, 36, 62, 44, 72, 54, 80, 60, 45];

// Filter tabs for case studies / blog
function initFilters() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.filter-tabs');
      parent.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Could filter cards here
    });
  });
}

// Language dropdown
function initLangDropdown() {
  const btn = document.getElementById('langBtn');
  const dropdown = document.getElementById('langDropdown');
  
  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('open');
  });
  
  document.addEventListener('click', () => dropdown?.classList.remove('open'));
  
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      i18n.set(opt.dataset.lang);
      dropdown?.classList.remove('open');
    });
  });
}

// Main init
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  ThemeManager.init();
  
  // Language
  const savedLang = localStorage.getItem('lang') || 'en';
  i18n.set(savedLang);
  
  // Init systems
  initNavbar();
  initScrollAnimations();
  initFilters();
  initLangDropdown();
  
  // Animate hero bars
  setTimeout(animateBars, 600);
  
  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => ThemeManager.toggle());
  
  // Navigation
  document.querySelectorAll('.nav-page-link').forEach(link => {
    link.addEventListener('click', () => Router.navigate(link.dataset.page));
  });
  
  // Hamburger
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('mobileMenu')?.classList.toggle('open');
  });
  
  // Back to top
  document.querySelector('.back-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // WhatsApp sticky
  document.querySelector('.sticky-wa')?.addEventListener('click', () => {
    window.open('https://wa.me/971500000000?text=Hi, I\'m interested in your services', '_blank');
  });
  
  // Sticky book
  document.querySelector('.sticky-book')?.addEventListener('click', () => {
    Router.navigate('contact');
  });
  
  // Forms
  document.querySelectorAll('form[data-multistep]').forEach(form => {
    form.addEventListener('submit', (e) => FormManager.submit(e));
  });
  
  document.querySelectorAll('.form-next').forEach(btn => {
    btn.addEventListener('click', () => FormManager.next());
  });
  
  document.querySelectorAll('.form-prev').forEach(btn => {
    btn.addEventListener('click', () => FormManager.prev());
  });
  
  // Simple contact form
  document.querySelectorAll('form[data-simple]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅', 'Message sent! We\'ll be in touch shortly.');
      form.reset();
    });
  });
  
  // Reveal observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate progress bars
        entry.target.querySelectorAll('.progress-fill[data-width]').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
        });
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  
  // Counter observer
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
  
  // Start router at home
  Router.navigate('home');
});