// EmailJS Configuration
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("VSwMO_6vBF9SXnvee");
  }
})();

// Global variables for performance optimization
let animationRunning = false;
let ticking = false;
let particles = [];

// Create particles dynamically (optimized)
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;
  
  const particleCount = window.innerWidth < 768 ? 15 : 25;
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.animationDuration = Math.random() * 8 + 8 + "s";
    particlesContainer.appendChild(particle);
    particles.push(particle);
  }
}

// Enhanced animation observer
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Initialize fade-in animations
function initializeFadeAnimations() {
  document.querySelectorAll(".fade-in").forEach((element) => {
    fadeInObserver.observe(element);
  });
}

// Enhanced navbar scroll effect with throttling
function updateNavbar() {
  const navbar = document.getElementById("navbar");
  const progress = document.getElementById("page-progress");
  
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  
  // Update progress bar
  if (progress) {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = Math.min(scrolled, 100) + "%";
  }
  
  // Back to top button
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }
  
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}

// Splash screen handler
function handleSplashScreen() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    const splashScreen = document.getElementById("splash-screen");
    if (splashScreen) {
      splashScreen.style.display = "none";
    }
    return;
  }

  // Create particles after a delay
  setTimeout(() => {
    createParticles();
  }, 500);

  setTimeout(() => {
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    
    if (splashScreen) {
      splashScreen.style.opacity = "0";
      splashScreen.style.pointerEvents = "none";
      
      setTimeout(() => {
        splashScreen.style.display = "none";
      }, 800);
    }
    
    if (mainContent) {
      mainContent.style.opacity = "1";
    }
  }, 2000);
}

// Hamburger menu functionality
function initializeMenuToggle() {
  const hamburger = document.getElementById("hamburger");
  const fullscreenMenu = document.getElementById("fullscreen-menu");

  if (!hamburger || !fullscreenMenu) return;

  hamburger.addEventListener("click", function () {
    const isActive = hamburger.classList.contains("active");
    
    if (isActive) {
      hamburger.classList.remove("active");
      fullscreenMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    } else {
      hamburger.classList.add("active");
      fullscreenMenu.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });

  // Close menu when clicking on menu links
  document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      fullscreenMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && fullscreenMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      fullscreenMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Enhanced smooth scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      
      if (target) {
        const navbar = document.getElementById("navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// Enhanced email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Enhanced notification system
function showNotification(type, title, message) {
  const modal = document.getElementById("notification-modal");
  const modalIcon = document.getElementById("modal-icon");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  if (!modal || !modalIcon || !modalTitle || !modalMessage) return;

  // Set content
  modalTitle.textContent = title;
  modalMessage.textContent = message;

  // Set icon based on type
  if (type === "success") {
    modalIcon.innerHTML = "✓";
    modalIcon.className = "modal-icon success";
  } else {
    modalIcon.innerHTML = "✗";
    modalIcon.className = "modal-icon error";
  }

  // Show modal with animation
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("show");
  });

  // Auto close after 5 seconds
  setTimeout(() => {
    closeNotification();
  }, 5000);
}

function closeNotification() {
  const modal = document.getElementById("notification-modal");
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

// Form handling with improved validation
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameField = document.getElementById("from_name");
    const emailField = document.getElementById("from_email");
    const messageField = document.getElementById("message");

    const name = nameField?.value?.trim() || "";
    const email = emailField?.value?.trim() || "";
    const message = messageField?.value?.trim() || "";

    // Enhanced validation
    if (!name || name.length < 2) {
      showNotification("error", "Validation Error", "Please enter a valid name (at least 2 characters).");
      nameField?.focus();
      return;
    }

    if (!email || !isValidEmail(email)) {
      showNotification("error", "Invalid Email", "Please enter a valid email address.");
      emailField?.focus();
      return;
    }

    if (!message || message.length < 10) {
      showNotification("error", "Validation Error", "Please enter a message (at least 10 characters).");
      messageField?.focus();
      return;
    }

    const submitBtn = document.getElementById("submit-btn");
    const btnText = submitBtn?.querySelector(".btn-text");
    const btnLoading = submitBtn?.querySelector(".btn-loading");

    // Show loading state
    if (btnText) btnText.style.display = "none";
    if (btnLoading) btnLoading.style.display = "inline";
    if (submitBtn) submitBtn.disabled = true;

    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
      console.error("EmailJS not loaded");
      showNotification(
        "error",
        "Service Unavailable",
        "Email service is currently unavailable. Please try again later or contact me directly."
      );
      resetSubmitButton(btnText, btnLoading, submitBtn);
      return;
    }

    // Send email using EmailJS
    emailjs
      .sendForm("service_ql8k7j9", "template_dx20h89", this)
      .then(() => {
        showNotification(
          "success",
          "Message Sent!",
          "Thank you! Your message has been successfully sent. I will respond to you shortly."
        );
        this.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showNotification(
          "error",
          "Failed to Send",
          "Sorry, there was an error sending your message. Please try again or contact me directly via email."
        );
      })
      .finally(() => {
        resetSubmitButton(btnText, btnLoading, submitBtn);
      });
  });
}

function resetSubmitButton(btnText, btnLoading, submitBtn) {
  if (btnText) btnText.style.display = "inline";
  if (btnLoading) btnLoading.style.display = "none";
  if (submitBtn) submitBtn.disabled = false;
}

// Modal event listeners
function initializeModal() {
  const closeBtn = document.getElementById("close-modal");
  const modal = document.getElementById("notification-modal");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeNotification);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeNotification();
      }
    });
  }

  // Close modal on escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeNotification();
    }
  });
}

// Enhanced Discord functionality with better error handling
function initializeDiscordLink() {
  const discordLink = document.getElementById('discord-link');
  
  if (!discordLink) return;

  discordLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    const discordUsername = '@dimasaspt';
    
    // Modern clipboard API with comprehensive fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(discordUsername)
        .then(() => {
          showNotification(
            'success', 
            'Discord Username Copied!', 
            `${discordUsername} has been copied to clipboard! You can now add me on Discord.`
          );
        })
        .catch((error) => {
          console.error('Clipboard error:', error);
          fallbackCopyText(discordUsername);
        });
    } else {
      fallbackCopyText(discordUsername);
    }
  });
}

// Fallback copy function with better UX
function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  textArea.setAttribute('readonly', '');
  textArea.setAttribute('aria-hidden', 'true');
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showNotification(
        'success',
        'Discord Username Copied!',
        `${text} has been copied to clipboard!`
      );
    } else {
      throw new Error('Copy command failed');
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showNotification(
      'success',
      'My Discord Username',
      `My Discord: ${text}\n\nPlease copy this username manually to add me.`
    );
  } finally {
    document.body.removeChild(textArea);
  }
}

// Back to top functionality
function initializeBackToTop() {
  const backToTop = document.getElementById("back-to-top");
  
  if (!backToTop) return;

  backToTop.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Enhanced CV download tracking
function initializeCVDownload() {
  const cvLinks = document.querySelectorAll('a[download]');
  
  cvLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Check if file exists (basic check)
      const href = this.getAttribute('href');
      if (href && href.includes('.pdf')) {
        console.log('CV download initiated:', href);
        
        setTimeout(() => {
          showNotification(
            'success',
            'CV Downloaded!',
            'Thank you for downloading my CV. I look forward to hearing from you!'
          );
        }, 1000);
      }
    });
  });
}

// Enhanced social link interactions
function initializeSocialLinks() {
  const socialLinks = document.querySelectorAll('.social-link:not(#discord-link)');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add analytics tracking placeholder
      const platform = this.querySelector('span')?.textContent || 'Unknown';
      console.log(`Social link clicked: ${platform}`);
    });
  });
}

// Lazy loading for images (if needed in the future)
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Enhanced project animations
function initializeProjectAnimations() {
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!projectCards.length) return;

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('card-reveal');
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  projectCards.forEach(card => {
    cardObserver.observe(card);
  });
}

// Skill hover effects
function initializeSkillEffects() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(skill => {
    skill.addEventListener('mouseenter', function() {
      this.classList.add('skill-active');
    });
    
    skill.addEventListener('mouseleave', function() {
      this.classList.remove('skill-active');
    });
  });
}

// Mouse parallax effect for hero section
function initializeParallaxEffect() {
  let mouseX = 0;
  let mouseY = 0;
  let isHeroVisible = false;

  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  // Check if hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
      if (!isHeroVisible) {
        // Reset shapes position when hero is not visible
        resetShapesPosition();
      }
    });
  }, { threshold: 0.1 });

  heroObserver.observe(heroSection);

  // Mouse move handler
  document.addEventListener("mousemove", (e) => {
    if (!isHeroVisible) return;
    
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    updateShapes();
  });

  function updateShapes() {
    const shapes = document.querySelectorAll(".floating-shapes .shape");
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.3;
      const xMove = (mouseX - 0.5) * speed * 10;
      const yMove = (mouseY - 0.5) * speed * 10;

      shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
  }

  function resetShapesPosition() {
    const shapes = document.querySelectorAll(".floating-shapes .shape");
    shapes.forEach(shape => {
      shape.style.transform = 'translate(0, 0)';
    });
  }
}

// Keyboard navigation shortcuts
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Only activate shortcuts when no input is focused
    const activeElement = document.activeElement;
    const isInputFocused = activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA' || 
      activeElement.contentEditable === 'true'
    );

    if (isInputFocused) return;

    // Alt + H = Home
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + A = About
    if (e.altKey && e.key === 'a') {
      e.preventDefault();
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + S = Skills
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + P = Projects
    if (e.altKey && e.key === 'p') {
      e.preventDefault();
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + C = Contact
    if (e.altKey && e.key === 'c') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Performance optimizations
function optimizePerformance() {
  // Preload critical images
  const criticalImages = [
    'assets/dimas.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Clean up particles on page unload
  window.addEventListener('beforeunload', () => {
    particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    particles = [];
  });
}

// Error handling for missing elements
function handleMissingElements() {
  const criticalElements = [
    'navbar',
    'hamburger',
    'fullscreen-menu',
    'contact-form'
  ];

  criticalElements.forEach(id => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Critical element missing: ${id}`);
    }
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing portfolio...');
  
  try {
    // Core functionality
    initializeFadeAnimations();
    initializeMenuToggle();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeModal();
    initializeBackToTop();
    
    // Enhanced features
    initializeDiscordLink();
    initializeCVDownload();
    initializeSocialLinks();
    initializeProjectAnimations();
    initializeSkillEffects();
    initializeParallaxEffect();
    initializeKeyboardShortcuts();
    
    // Performance optimizations
    optimizePerformance();
    handleMissingElements();
    
    console.log('Portfolio initialized successfully');
  } catch (error) {
    console.error('Error during portfolio initialization:', error);
  }
});

// Handle page load events
window.addEventListener("load", function () {
  handleSplashScreen();
});

// Optimized scroll handler
window.addEventListener("scroll", requestTick, { passive: true });

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Recreate particles with new window size
    const particlesContainer = document.getElementById("particles");
    if (particlesContainer && particles.length > 0) {
      particlesContainer.innerHTML = '';
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        createParticles();
      }
    }
  }, 250);
});

// Handle visibility change (performance optimization)
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    animationRunning = false;
  }
});

// Export functions for potential external use (optional)
window.portfolioAPI = {
  showNotification,
  closeNotification,
  scrollToSection: function(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};