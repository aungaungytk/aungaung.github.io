// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // Theme Management
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Mobile Menu Toggler
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Header Scroll Effect & Active Section Tracker
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section, .hero');
  
  window.addEventListener('scroll', () => {
    // Scroll header background transition
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll active link highlight
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    
    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      if (revealTop < triggerBottom) {
        reveal.classList.add('revealed');
        // Trigger skill bars if revealed and current tab is active
        if (reveal.id === 'content' && document.getElementById('skills-panel').classList.contains('active')) {
          animateSkillBars();
        }
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  // Run once initially to check for elements visible on load
  checkReveal();

  // Tab Control for Content Section
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function animateSkillBars() {
    const barFills = document.querySelectorAll('.skill-bar-fill');
    barFills.forEach(fill => {
      const percentage = fill.getAttribute('data-skill');
      fill.style.width = `${percentage}%`;
    });
  }

  function resetSkillBars() {
    const barFills = document.querySelectorAll('.skill-bar-fill');
    barFills.forEach(fill => {
      fill.style.width = '0';
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      
      // Toggle active states on buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle active states on panels
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${targetId}-panel`) {
          panel.classList.add('active');
          
          // Custom behavior for skills tab animation trigger
          if (targetId === 'skills') {
            setTimeout(animateSkillBars, 100);
          } else {
            resetSkillBars();
          }
        }
      });
    });
  });

  // Project Gallery Data and Details Modal Implementation
  const projectDetails = {
    'ai-vision': {
      title: 'AI Vision Interface',
      desc: 'An AI-powered computer vision application designed to analyze complex real-time camera streams. Built with Node.js backend, Python OpenCV image processing pipeline, and high-performance WebSockets for streaming data to a custom-designed reactive CSS canvas layout. Includes full spatial map analysis, bounding box optimization, and user-facing dashboards with interactive timeline plots.',
      tags: ['Javascript', 'Python', 'OpenCV', 'WebSockets'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
    },
    'glass-dashboard': {
      title: 'Frosted SaaS Hub',
      desc: 'A premium, responsive management dashboard platform for enterprise clients. The application features a glassmorphic dashboard styled entirely using modern CSS nesting and HSL parameters, offering customizable drag-and-drop analytics charts, automated reports export systems, team activity calendars, and multi-tenant access control interfaces.',
      tags: ['React', 'CSS Grid', 'Chart.js', 'Framer Motion'],
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop'
    },
    'creative-studio': {
      title: 'Creative Agency Portal',
      desc: 'A showcase landing page built for a leading visual design studio, focusing on dynamic typography, complex page animations, scroll-triggered audio elements, and interactive 3D WebGL showcase blocks. Supports light-weight responsive design, smooth-scroll polyfill, and customized image slide carousels.',
      tags: ['Three.js', 'GSAP', 'HTML5', 'Vanilla JS'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
    },
    'crypto-visualizer': {
      title: 'Crypto Pulse Engine',
      desc: 'A real-time financial tracking application pulling live tickers from decentralized cryptocurrency exchange APIs. Provides visual feedback using SVG path animations, high-frequency chart plotting, personal portfolio valuation calculations, and threshold price alerts notifications using Web Worker threads.',
      tags: ['Vue.js', 'Tailwind', 'REST API', 'Web Workers'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop'
    },
    'neural-network': {
      title: 'Neural Network Sandbox',
      desc: 'An educational visualizer allowing users to interactively build, train, and test basic single-layer feedforward neural networks right in their web browser. Offers customizable layer sizing, learning rate selectors, activation function options (ReLU, Sigmoid, Tanh), and interactive canvas node activations.',
      tags: ['TypeScript', 'HTML5 Canvas', 'MathJS', 'Sass'],
      image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop'
    },
    'zenith-brand': {
      title: 'Zenith Branding Identity',
      desc: 'A full identity package designed for a high-end luxury wellness brand. Includes structural layout system, color palette selections, premium print media graphics, physical product package renders, and custom SVG animation branding assets for digital campaign platforms.',
      tags: ['Illustrator', 'Figma', 'SVG Animation', 'Brand Kit'],
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop'
    }
  };

  // View Section Card Filter Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Modal Functionality
  const modal = document.querySelector('.modal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const modalImg = modal.querySelector('.modal-img');
  const modalTitle = modal.querySelector('.modal-title');
  const modalTags = modal.querySelector('.modal-tags');
  const modalDesc = modal.querySelector('.modal-desc');

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    
    // Clear previous tags and append new ones
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'modal-tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalDesc.textContent = data.desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Resume background scrolling
  }

  // Bind project details click event
  const viewDetailsBtns = document.querySelectorAll('.project-link-btn');
  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Simple visual success feedback (simulating async post)
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending Message...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        submitBtn.textContent = '✓ Message Sent Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, var(--success) 0%, hsl(142, 60%, 30%) 100%)';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)';
        }, 3000);
      }, 1500);
    });
  }

});
