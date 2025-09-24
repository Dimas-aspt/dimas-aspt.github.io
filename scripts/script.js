// EmailJS Configuration
(function () {
  emailjs.init("VSwMO_6vBF9SXnvee");
})();

// Create particles dynamically (optimized)
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;
  
  const particleCount = window.innerWidth < 768 ? 20 : 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.animationDuration = Math.random() * 8 + 8 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Enhanced animation observer
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Unobserve after animation to improve performance
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Project card observer
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('card-reveal');
        }, index * 100);
        projectObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Splash screen with better error handling
function initSplashScreen() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    createParticles();
  }

  setTimeout(function () {
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    
    if (splashScreen) {
      splashScreen.style.opacity = "0";
      setTimeout(() => {
        splashScreen.style.display = "none";
      }, 800);
    }
    
    if (mainContent) {
      mainContent.style.opacity = "1";
    }
  }, 2000);
}

// Initialize fade-in animations
function initAnimations() {
  document.querySelectorAll(".fade-in").forEach((element) => {
    fadeInObserver.observe(element);
  });

  document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
  });
}

// Enhanced navbar scroll effect with throttling
let ticking = false;

function updateNavbar() {
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("back-to-top");
  
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }
  
  ticking = false;
}

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}

// Hamburger menu toggle
function initMenu() {
  const hamburger = document.getElementById("hamburger");
  const fullscreenMenu = document.getElementById("fullscreen-menu");

  if (hamburger && fullscreenMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      fullscreenMenu.classList.toggle("active");
      document.body.style.overflow = fullscreenMenu.classList.contains("active")
        ? "hidden"
        : "auto";
    });

    // Close menu when clicking on menu links
    document.querySelectorAll(".menu-link").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        fullscreenMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && fullscreenMenu.classList.contains('active')) {
        hamburger.classList.remove("active");
        fullscreenMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }
}

// Enhanced smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute('href') === '#') return;
      
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

// Back to top functionality
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Enhanced email validation
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

// Form validation
function validateForm() {
  const name = document.getElementById("from_name").value.trim();
  const email = document.getElementById("from_email").value.trim();
  const message = document.getElementById("message").value.trim();
  let isValid = true;

  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

  // Name validation
  if (!name || name.length < 2) {
    document.getElementById('name-error').textContent = 'Name must be at least 2 characters long';
    isValid = false;
  }

  // Email validation
  if (!email || !isValidEmail(email)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address';
    isValid = false;
  }

  // Message validation
  if (!message || message.length < 10) {
    document.getElementById('message-error').textContent = 'Message must be at least 10 characters long';
    isValid = false;
  }

  return isValid;
}

// Form submission handler
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      const submitBtn = document.getElementById("submit-btn");
      const btnText = submitBtn?.querySelector(".btn-text");
      const btnLoading = submitBtn?.querySelector(".btn-loading");

      // Show loading state
      if (btnText) btnText.style.display = "none";
      if (btnLoading) btnLoading.style.display = "inline";
      if (submitBtn) submitBtn.disabled = true;

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
          // Reset button state
          if (btnText) btnText.style.display = "inline";
          if (btnLoading) btnLoading.style.display = "none";
          if (submitBtn) submitBtn.disabled = false;
        });
    });

    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', validateForm);
      input.addEventListener('input', function() {
        // Clear error when user starts typing
        const errorId = this.id + '-error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
          errorElement.textContent = '';
        }
      });
    });
  }
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

  // Show modal with better timing
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10);
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

// Enhanced modal event listeners
function initModal() {
  const closeBtn = document.getElementById("close-modal");
  const modal = document.getElementById("notification-modal");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeNotification);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === this) closeNotification();
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeNotification();
    }
  });
}

// Discord functionality
function initDiscord() {
  const discordLink = document.getElementById('discord-link');
  if (discordLink) {
    discordLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      const discordUsername = 'dimasaspt';
      
      // Modern clipboard API with fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(discordUsername).then(() => {
          showNotification(
            'success', 
            'Discord Username Copied!', 
            `${discordUsername} has been copied to clipboard! You can now add me on Discord.`
          );
        }).catch(() => {
          fallbackCopyText(discordUsername);
        });
      } else {
        fallbackCopyText(discordUsername);
      }
    });
  }
}

// Fallback copy function
function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showNotification(
      'success',
      'Discord Username Copied!',
      `${text} has been copied to clipboard!`
    );
  } catch (err) {
    showNotification(
      'success',
      'My Discord Username',
      `My Discord: ${text}\n\nPlease copy this username manually to add me.`
    );
  } finally {
    document.body.removeChild(textArea);
  }
}

// CV Download tracking
function initCVDownload() {
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function() {
      // Add analytics tracking here if needed
      console.log('CV downloaded:', this.href);
      
      // Optional: Show confirmation
      setTimeout(() => {
        showNotification(
          'success',
          'CV Downloaded!',
          'Thank you for downloading my CV. I look forward to hearing from you!'
        );
      }, 500);
    });
  });
}

// Add reading time estimate for about section
function addReadingTime() {
  const aboutText = document.querySelector('.about-text p');
  if (aboutText) {
    const wordCount = aboutText.textContent.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
    
    const readingTimeEl = document.createElement('small');
    readingTimeEl.textContent = `📖 ${readingTime} min read`;
    readingTimeEl.className = 'reading-time';
    aboutText.parentNode.appendChild(readingTimeEl);
  }
}

// Keyboard navigation
function initKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Alt + H = Home
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + A = About
    if (e.altKey && e.key === 'a') {
      e.preventDefault();
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + S = Skills
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + P = Projects
    if (e.altKey && e.key === 'p') {
      e.preventDefault();
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + C = Contact
    if (e.altKey && e.key === 'c') {
      e.preventDefault();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Error handling for images
function handleImageErrors() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });
}

// Initialize all functionality
document.addEventListener("DOMContentLoaded", function() {
  initSplashScreen();
  initAnimations();
  initMenu();
  initSmoothScroll();
  initBackToTop();
  initContactForm();
  initModal();
  initDiscord();
  initCVDownload();
  addReadingTime();
  initKeyboardNavigation();
  handleImageErrors();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Initial navbar state
  updateNavbar();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Page is hidden, pause heavy animations if any
  } else {
    // Page is visible, resume animations
  }
});

// Error boundary for the entire script
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});