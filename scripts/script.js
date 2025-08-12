// Create particles dynamically
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Splash screen
window.addEventListener("load", function () {
  createParticles();
  setTimeout(function () {
    const splashScreen = document.getElementById("splash-screen");
    splashScreen.style.opacity = "0";
    splashScreen.style.pointerEvents = "none";

    // Show main content
    document.getElementById("main-content").style.opacity = "1";
  }, 2000);
});

// Section focus effect
const sections = document.querySelectorAll(".section");
const mainContent = document.getElementById("main-content");

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Blur other sections
      sections.forEach((section) => {
        if (section !== entry.target) {
          section.classList.add("blur");
        } else {
          section.classList.remove("blur");
        }
      });
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.2,
  rootMargin: "0px 0px -50% 0px",
});

sections.forEach((section) => {
  observer.observe(section);
});

// Fade in animation observer
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }
);

document.querySelectorAll(".fade-in").forEach((element) => {
  fadeInObserver.observe(element);
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Enhanced Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const fullscreenMenu = document.getElementById("fullscreen-menu");

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

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (name && email && message) {
      alert("Terima kasih! Pesan Anda telah terkirim.");
      this.reset();
    } else {
      alert("Mohon lengkapi semua field.");
    }
  });

// Animate elements on scroll
const animationObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

// Observe all animated elements
document
  .querySelectorAll(".skill-item, .project-card, .contact-item, .about-content")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    animationObserver.observe(element);
  });

// Hero text typing effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  element.style.opacity = "1";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect after splash screen
setTimeout(() => {
  const heroTitle = document.querySelector(".hero h1");
  const heroSubtitle = document.querySelector(".hero .subtitle");

  if (heroTitle) {
    typeWriter(heroTitle, "Dimas Adisaputra", 200);
  }

  setTimeout(() => {
    if (heroSubtitle) {
      typeWriter(heroSubtitle, "Full Stack Web Developer", 80);
    }
  }, 1000);
}, 2000);

// Add mouse movement effect to hero shapes
document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    const xMove = (x - 0.5) * speed * 20;
    const yMove = (y - 0.5) * speed * 20;

    shape.style.transform += ` translate(${xMove}px, ${yMove}px)`;
  });
});

// Add scroll parallax effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
