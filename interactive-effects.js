// Advanced Interactive Portfolio Effects
class PortfolioInteractions {
    constructor() {
        this.cursor = null;
        this.particles = [];
        this.mousePos = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createCustomCursor();
        this.createParticleSystem();
        this.initScrollEffects();
        this.initHoverEffects();
        this.initTypingAnimation();
        this.initFloatingElements();
        this.initSkillBars();
        this.initProjectHovers();
        this.initContactInteractions();
        this.initMagneticButtons();
        this.initWaveAnimation();
    }

    // Custom Cursor with Magnetic Effect
    createCustomCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        const cursorInner = document.createElement('div');
        cursorInner.className = 'cursor-inner';
        this.cursor.appendChild(cursorInner);

        let cursorX = 0, cursorY = 0;
        let targetX = 0, targetY = 0;
        const ease = 0.15;

        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (targetX - cursorX) * ease;
            cursorY += (targetY - cursorY) * ease;
            
            this.cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor hover effects
        document.querySelectorAll('a, button, .project-card, .skill-item').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
    }

    // Particle System
    createParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.life = Math.random() * 200 + 50;
                this.maxLife = this.life;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life--;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                if (this.life <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.life = this.maxLife;
                }

                // Mouse interaction
                const dx = this.mousePos.x - this.x;
                const dy = this.mousePos.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.x -= dx * 0.01;
                    this.y -= dy * 0.01;
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${220 + Math.sin(Date.now() * 0.001) * 40}, 70%, 60%)`;
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Advanced Scroll Effects
    initScrollEffects() {
        gsap.registerPlugin(ScrollTrigger);

        // Parallax sections
        gsap.utils.toArray('.parallax-section').forEach(section => {
            gsap.to(section, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Text reveal animations
        gsap.utils.toArray('.reveal-text').forEach(text => {
            gsap.fromTo(text, 
                { 
                    opacity: 0, 
                    y: 100,
                    skewY: 10 
                },
                {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Stagger animations for cards
        gsap.utils.toArray('.stagger-item').forEach((item, index) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    // Enhanced Hover Effects
    initHoverEffects() {
        // 3D tilt effect for cards
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });

        // Ripple effect on buttons
        document.querySelectorAll('.ripple-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Advanced Typing Animation
    initTypingAnimation() {
        const typewriter = document.querySelector('.typewriter-text');
        if (!typewriter) return;

        const texts = [
            'Graphic Designer',
            'Web Developer', 
            'Digital Artist',
            'PC Builder',
            'Creative Visionary'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        };
        
        type();
    }

    // Floating Elements Animation
    initFloatingElements() {
        gsap.to('.floating-element', {
            y: -20,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.3
        });

        gsap.to('.rotating-element', {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1
        });
    }

    // Animated Skill Bars
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            
            gsap.fromTo(bar,
                { width: '0%' },
                {
                    width: progress + '%',
                    duration: 2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    // Enhanced Project Hovers
    initProjectHovers() {
        document.querySelectorAll('.project-card').forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            const image = card.querySelector('.project-image img');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(overlay, { opacity: 1, duration: 0.3 });
                gsap.to(image, { scale: 1.1, duration: 0.5 });
                gsap.to(card, { y: -10, duration: 0.3 });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(overlay, { opacity: 0, duration: 0.3 });
                gsap.to(image, { scale: 1, duration: 0.5 });
                gsap.to(card, { y: 0, duration: 0.3 });
            });
        });
    }

    // Contact Form Interactions
    initContactInteractions() {
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, { scale: 1.02, duration: 0.2 });
            });
            
            input.addEventListener('blur', () => {
                gsap.to(input, { scale: 1, duration: 0.2 });
            });
        });
    }

    // Magnetic Buttons Effect
    initMagneticButtons() {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    // Wave Animation for sections
    initWaveAnimation() {
        const wave = document.querySelector('.wave-svg');
        if (!wave) return;

        gsap.to(wave, {
            x: -100,
            duration: 10,
            ease: "none",
            repeat: -1
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioInteractions();
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => loader.remove()
        });
    }
});
