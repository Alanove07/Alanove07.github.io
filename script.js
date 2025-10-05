// Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
        }
    }
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        handleNavbarScroll();
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .stat, .contact-item, .about-text, .about-image'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Enhanced counter animation for stats
    function animateCounter(element, target, duration = 2000, suffix = '') {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        // Add counting animation class
        element.classList.add('counting');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                // Remove counting animation class when done
                element.classList.remove('counting');
                element.classList.add('count-complete');
            }
            
            // Handle different number formats
            if (suffix === '%') {
                element.textContent = Math.floor(current) + '%';
            } else if (suffix === '+') {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current).toString();
            }
        }, 16);
    }
    
    // Animate counters when about section is visible
    const aboutSection = document.querySelector('#about');
    let countersAnimated = false;
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                const counters = document.querySelectorAll('.stat h3');
                counters.forEach(counter => {
                    const originalText = counter.textContent;
                    
                    // Parse different number formats
                    if (originalText.includes('%')) {
                        const target = parseInt(originalText);
                        if (!isNaN(target)) {
                            counter.textContent = '0%';
                            animateCounter(counter, target, 2000, '%');
                        }
                    } else if (originalText.includes('+')) {
                        const target = parseInt(originalText);
                        if (!isNaN(target)) {
                            counter.textContent = '0+';
                            animateCounter(counter, target, 2000, '+');
                        }
                    } else {
                        const target = parseInt(originalText);
                        if (!isNaN(target)) {
                            counter.textContent = '0';
                            animateCounter(counter, target, 2000);
                        }
                    }
                });
                countersAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // Enhanced Contact form handling with Formspree
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            formStatus.style.display = 'none';
            
            try {
                // Submit form to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    contactForm.reset();
                    formStatus.style.display = 'block';
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    
                    // Reset button after delay
                    setTimeout(() => {
                        btnText.style.display = 'inline';
                        btnLoading.style.display = 'none';
                        submitBtn.disabled = false;
                        formStatus.style.display = 'none';
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error handling
                console.error('Form submission error:', error);
                formStatus.style.display = 'block';
                successMessage.style.display = 'none';
                errorMessage.style.display = 'block';
                
                // Reset button
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Hide error message after delay
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Image placeholder handling
    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        
        images.forEach((img, index) => {
            img.addEventListener('error', function() {
                // Create a placeholder gradient
                const canvas = document.createElement('canvas');
                canvas.width = 400;
                canvas.height = 300;
                const ctx = canvas.getContext('2d');
                
                // Create gradient
                const gradient = ctx.createLinearGradient(0, 0, 400, 300);
                const colors = [
                    ['#6366f1', '#8b5cf6'],
                    ['#8b5cf6', '#d946ef'],
                    ['#06b6d4', '#3b82f6']
                ];
                
                const colorSet = colors[index % colors.length];
                gradient.addColorStop(0, colorSet[0]);
                gradient.addColorStop(1, colorSet[1]);
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 400, 300);
                
                // Add text
                ctx.fillStyle = 'white';
                ctx.font = 'bold 20px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Image Coming Soon', 200, 150);
                
                this.src = canvas.toDataURL();
            });
        });
    }
    
    // Initialize image error handling
    handleImageErrors();
    
    // Parallax effect for hero section
    function handleParallax() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
    
    // Add parallax on scroll (optional - uncomment if desired)
    // window.addEventListener('scroll', handleParallax);
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Add smooth reveal animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    console.log('Portfolio loaded successfully! 🎨✨');
});

// Add smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
});

// Performance optimization
if ('IntersectionObserver' in window) {
    // Use Intersection Observer for better performance
} else {
    // Fallback for older browsers
    console.log('Intersection Observer not supported, using fallback animations');
}