// Splash screen
        window.addEventListener('load', function() {
            setTimeout(function() {
                const splashScreen = document.getElementById('splash-screen');
                splashScreen.style.opacity = '0';
                splashScreen.style.pointerEvents = 'none';
                
                // Show main content
                document.getElementById('main-content').style.opacity = '1';
            }, 2000);
        });

        // Section focus effect
        const sections = document.querySelectorAll('.section');
        const mainContent = document.getElementById('main-content');
        
        function handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Blur other sections
                    sections.forEach(section => {
                        if (section !== entry.target) {
                            section.classList.add('blur');
                        } else {
                            section.classList.remove('blur');
                        }
                    });
                }
            });
        }

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.2,
            rootMargin: '0px 0px -50% 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Hamburger menu toggle
        const hamburger = document.getElementById('hamburger');
        const fullscreenMenu = document.getElementById('fullscreen-menu');

        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            fullscreenMenu.classList.toggle('active');
            document.body.style.overflow = fullscreenMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking on menu links
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                fullscreenMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (name && email && message) {
                alert('Terima kasih! Pesan Anda telah terkirim.');
                this.reset();
            } else {
                alert('Mohon lengkapi semua field.');
            }
        });

        // Animate elements on scroll
        const animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe all animated elements
        document.querySelectorAll('.skill-item, .project-card, .contact-item, .about-content').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });

        // Hero text typing effect
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            element.style.opacity = '1';
            
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
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero .subtitle');
            
            if (heroTitle) {
                typeWriter(heroTitle, 'Nama Anda', 150);
            }
            
            setTimeout(() => {
                if (heroSubtitle) {
                    typeWriter(heroSubtitle, 'Web Developer & Designer', 80);
                }
            }, 1000);
        }, 2000);