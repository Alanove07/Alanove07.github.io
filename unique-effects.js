// Ultra-Unique Portfolio Effects - Next Level Interactions
class UniquePortfolioEffects {
    constructor() {
        this.init();
        this.setupUniqueElements();
    }

    init() {
        this.createLiquidCursor();
        this.setupHolographicText();
        this.initMorphingBackground();
        this.createFloatingOrbs();
        this.setupGlitchEffects();
        this.initQuantumParticles();
        this.createNeuralNetwork();
        this.setupVoiceInteraction();
        this.initAIPersonality();
        this.createTimeWarp();
        this.setupGestureControls();
        this.initEyeTracking();
    }

    // Liquid Morphing Cursor
    createLiquidCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'liquid-cursor';
        document.body.appendChild(cursor);

        const liquidBlob = document.createElement('div');
        liquidBlob.className = 'liquid-blob';
        cursor.appendChild(liquidBlob);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let isMoving = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;
            clearTimeout(this.stopTimer);
            this.stopTimer = setTimeout(() => isMoving = false, 100);
        });

        const animateLiquidCursor = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            const speed = Math.sqrt(Math.pow(mouseX - cursorX, 2) + Math.pow(mouseY - cursorY, 2));
            const scale = isMoving ? Math.min(1 + speed * 0.01, 2) : 1;
            const rotation = isMoving ? speed * 2 : 0;

            cursor.style.transform = `translate(${cursorX - 25}px, ${cursorY - 25}px) scale(${scale}) rotate(${rotation}deg)`;
            
            // Morphing effect based on movement
            if (speed > 10) {
                liquidBlob.style.borderRadius = '30% 70% 40% 60%';
            } else {
                liquidBlob.style.borderRadius = '50%';
            }

            requestAnimationFrame(animateLiquidCursor);
        };
        animateLiquidCursor();
    }

    // Holographic Text Effects
    setupHolographicText() {
        const textElements = document.querySelectorAll('.holographic-text');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            [...text].forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${index * 0.1}s`;
                span.className = 'holo-char';
                element.appendChild(span);
            });
        });

        // Dynamic hologram scanner
        const scanner = document.createElement('div');
        scanner.className = 'holo-scanner';
        document.body.appendChild(scanner);

        gsap.to(scanner, {
            duration: 3,
            y: window.innerHeight,
            repeat: -1,
            ease: "none"
        });
    }

    // Morphing Background Geometry
    initMorphingBackground() {
        const canvas = document.createElement('canvas');
        canvas.className = 'morphing-bg';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const vertices = [];
        const numVertices = 8;

        // Create vertices for morphing polygon
        for (let i = 0; i < numVertices; i++) {
            vertices.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 100 + 50
            });
        }

        const animateMorphing = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, `hsla(${Date.now() * 0.01 % 360}, 70%, 50%, 0.1)`);
            gradient.addColorStop(0.5, `hsla(${(Date.now() * 0.01 + 120) % 360}, 70%, 50%, 0.15)`);
            gradient.addColorStop(1, `hsla(${(Date.now() * 0.01 + 240) % 360}, 70%, 50%, 0.1)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();

            // Update vertices
            vertices.forEach((vertex, index) => {
                vertex.x += vertex.vx;
                vertex.y += vertex.vy;

                if (vertex.x < 0 || vertex.x > canvas.width) vertex.vx *= -1;
                if (vertex.y < 0 || vertex.y > canvas.height) vertex.vy *= -1;

                if (index === 0) {
                    ctx.moveTo(vertex.x, vertex.y);
                } else {
                    ctx.lineTo(vertex.x, vertex.y);
                }
            });

            ctx.closePath();
            ctx.fill();
            requestAnimationFrame(animateMorphing);
        };
        animateMorphing();
    }

    // Floating Energy Orbs
    createFloatingOrbs() {
        for (let i = 0; i < 5; i++) {
            const orb = document.createElement('div');
            orb.className = 'energy-orb';
            orb.style.left = Math.random() * 100 + '%';
            orb.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(orb);

            // Orb interaction
            orb.addEventListener('click', () => {
                orb.classList.add('orb-explode');
                setTimeout(() => {
                    orb.classList.remove('orb-explode');
                }, 1000);
            });
        }
    }

    // Glitch Text Effects
    setupGlitchEffects() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(element => {
            const text = element.textContent;
            
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% chance to glitch
                    const glitchedText = text.split('').map(char => 
                        Math.random() < 0.1 ? this.getRandomChar() : char
                    ).join('');
                    
                    element.textContent = glitchedText;
                    element.classList.add('glitching');
                    
                    setTimeout(() => {
                        element.textContent = text;
                        element.classList.remove('glitching');
                    }, 100);
                }
            }, 2000);
        });
    }

    getRandomChar() {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
        return chars[Math.floor(Math.random() * chars.length)];
    }

    // Quantum Particle System
    initQuantumParticles() {
        const canvas = document.createElement('canvas');
        canvas.className = 'quantum-particles';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];

        class QuantumParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.life = Math.random() * 200 + 50;
                this.maxLife = this.life;
                this.quantum = Math.random() * Math.PI * 2;
            }

            update() {
                this.quantum += 0.1;
                this.x += this.vx + Math.sin(this.quantum) * 0.5;
                this.y += this.vy + Math.cos(this.quantum) * 0.5;
                this.life--;

                if (this.life <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.life = this.maxLife;
                }
            }

            draw() {
                const alpha = this.life / this.maxLife;
                const size = Math.sin(this.quantum) * 3 + 3;
                
                ctx.save();
                ctx.globalAlpha = alpha * 0.8;
                ctx.beginPath();
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${this.quantum * 50}, 80%, 60%)`;
                ctx.fill();
                
                // Quantum trail
                ctx.beginPath();
                ctx.arc(this.x - this.vx * 10, this.y - this.vy * 10, size * 0.5, 0, Math.PI * 2);
                ctx.globalAlpha = alpha * 0.3;
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < 30; i++) {
            particles.push(new QuantumParticle());
        }

        const animateQuantum = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateQuantum);
        };
        animateQuantum();
    }

    // Neural Network Visualization
    createNeuralNetwork() {
        const canvas = document.createElement('canvas');
        canvas.className = 'neural-network';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const nodes = [];
        const connections = [];

        // Create nodes
        for (let i = 0; i < 20; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                activity: Math.random()
            });
        }

        const animateNeural = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                node.activity = Math.sin(Date.now() * 0.001 + node.x * 0.01) * 0.5 + 0.5;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 3 + node.activity * 5, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(200, 80%, 60%, ${0.5 + node.activity * 0.5})`;
                ctx.fill();
            });

            // Draw connections
            nodes.forEach((node, i) => {
                nodes.slice(i + 1).forEach(otherNode => {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + 
                        Math.pow(node.y - otherNode.y, 2)
                    );

                    if (distance < 150) {
                        const alpha = (150 - distance) / 150 * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animateNeural);
        };
        animateNeural();
    }

    // Voice Interaction
    setupVoiceInteraction() {
        if ('speechSynthesis' in window && 'webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            const voiceBtn = document.createElement('div');
            voiceBtn.className = 'voice-control';
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            document.body.appendChild(voiceBtn);

            voiceBtn.addEventListener('click', () => {
                recognition.start();
                voiceBtn.classList.add('listening');
            });

            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
                voiceBtn.classList.remove('listening');
            };

            recognition.onerror = () => {
                voiceBtn.classList.remove('listening');
            };
        }
    }

    processVoiceCommand(command) {
        if (command.includes('about')) {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            this.speak("Scrolling to about section");
        } else if (command.includes('projects')) {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            this.speak("Here are my featured projects");
        } else if (command.includes('contact')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            this.speak("Let's get in touch");
        } else if (command.includes('skills')) {
            document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
            this.speak("These are my technical skills");
        }
    }

    speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
    }

    // AI Personality Responses
    initAIPersonality() {
        const responses = [
            "🤖 AI systems online and ready!",
            "🧠 Neural networks processing creativity...",
            "✨ Machine learning meets human imagination",
            "🚀 Building the future with artificial intelligence",
            "💫 Where code becomes consciousness",
            "⚡ Automating creativity, amplifying innovation",
            "🎨 AI-generated art meets human soul",
            "🔮 Predicting tomorrow's design today"
        ];

        const aiMessage = document.createElement('div');
        aiMessage.className = 'ai-message';
        document.body.appendChild(aiMessage);

        let messageIndex = 0;
        setInterval(() => {
            aiMessage.textContent = responses[messageIndex];
            aiMessage.classList.add('show');
            
            setTimeout(() => {
                aiMessage.classList.remove('show');
            }, 4000);
            
            messageIndex = (messageIndex + 1) % responses.length;
        }, 10000);

        // AI assistant for voice commands
        this.initAIAssistant();
    }

    // Enhanced AI Assistant
    initAIAssistant() {
        const aiResponses = {
            'ai skills': "Showcasing my AI and machine learning capabilities",
            'ai projects': "Here are my AI-powered projects and innovations",
            'machine learning': "Exploring my machine learning implementations",
            'artificial intelligence': "Welcome to my AI-enhanced portfolio",
            'automation': "Demonstrating workflow automation solutions",
            'neural networks': "Diving into neural network applications"
        };

        // Override the voice command processor for AI-specific responses
        this.originalProcessVoiceCommand = this.processVoiceCommand;
        this.processVoiceCommand = (command) => {
            const lowerCommand = command.toLowerCase();
            
            // Check for AI-specific commands first
            for (const [keyword, response] of Object.entries(aiResponses)) {
                if (lowerCommand.includes(keyword)) {
                    this.speak(response);
                    if (keyword === 'ai skills') {
                        document.getElementById('ai-skills').scrollIntoView({ behavior: 'smooth' });
                    } else if (keyword === 'ai projects') {
                        document.getElementById('ai-projects').scrollIntoView({ behavior: 'smooth' });
                    }
                    return;
                }
            }
            
            // Fall back to original commands
            this.originalProcessVoiceCommand(command);
        };
    }

    // Time Warp Effect
    createTimeWarp() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            section.addEventListener('mouseenter', () => {
                gsap.to(section, {
                    duration: 0.5,
                    scale: 1.02,
                    filter: 'contrast(1.1) saturate(1.2)',
                    ease: "power2.out"
                });
            });

            section.addEventListener('mouseleave', () => {
                gsap.to(section, {
                    duration: 0.5,
                    scale: 1,
                    filter: 'contrast(1) saturate(1)',
                    ease: "power2.out"
                });
            });
        });
    }

    // Gesture Controls
    setupGestureControls() {
        let startY = 0;
        let currentSection = 0;
        const sections = document.querySelectorAll('section');

        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;

            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentSection < sections.length - 1) {
                    currentSection++;
                } else if (diff < 0 && currentSection > 0) {
                    currentSection--;
                }
                
                sections[currentSection].scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Eye Tracking Simulation
    initEyeTracking() {
        const eyeElements = document.querySelectorAll('.eye-track');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            eyeElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementX = (rect.left + rect.width / 2) / window.innerWidth;
                const elementY = (rect.top + rect.height / 2) / window.innerHeight;
                
                const deltaX = (mouseX - elementX) * 20;
                const deltaY = (mouseY - elementY) * 20;
                
                element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        });
    }

    setupUniqueElements() {
        // Add unique classes to existing elements
        document.querySelector('.hero-title .highlight').classList.add('holographic-text');
        document.querySelector('.hero-subtitle').classList.add('glitch-text');
        
        // Add eye tracking to profile image
        document.querySelector('#profile-img').classList.add('eye-track');
        
        // Add unique hover effects to skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    duration: 0.3,
                    rotationY: 10,
                    z: 50,
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 0.3,
                    rotationY: 0,
                    z: 0,
                    boxShadow: '0 0 0 rgba(99, 102, 241, 0)'
                });
            });
        });
    }
}

// Initialize unique effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new UniquePortfolioEffects();
    }, 1000); // Delay to let other scripts load first
});

// Matrix Rain Effect for Background
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'matrix-rain';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.drops = [];
        
        this.init();
    }
    
    init() {
        const columns = Math.floor(this.canvas.width / 20);
        
        for (let i = 0; i < columns; i++) {
            this.drops[i] = Math.random() * this.canvas.height;
        }
        
        this.animate();
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '15px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(char, i * 20, this.drops[i]);
            
            if (this.drops[i] > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i] += 20;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Cosmic Dust Effect
class CosmicDust {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'cosmic-dust';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.8,
                hue: Math.random() * 360
            });
        }
        
        this.animate();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.hue += 0.5;
            
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = `hsl(${particle.hue}, 100%, 50%)`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cosmic effects
setTimeout(() => {
    new MatrixRain();
    new CosmicDust();
    new AICodeStream();
}, 2000);

// AI Code Stream Effect
class AICodeStream {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'ai-code-stream';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.codes = [
            'def ai_create():', 'import tensorflow as tf', 'model.predict()', 
            'neural_network.train()', 'if ai.conscious:', 'return creativity',
            'machine_learning = True', 'automate_workflow()', 'generate_art()',
            'class AI:', 'def __init__(self):', 'self.creative = True'
        ];
        this.streams = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < 10; i++) {
            this.streams.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 2 + 1,
                code: this.codes[Math.floor(Math.random() * this.codes.length)],
                opacity: Math.random() * 0.7 + 0.3,
                hue: 120 + Math.random() * 60 // Green to cyan range for AI theme
            });
        }
        
        this.animate();
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.streams.forEach(stream => {
            this.ctx.save();
            this.ctx.globalAlpha = stream.opacity;
            this.ctx.fillStyle = `hsl(${stream.hue}, 80%, 60%)`;
            this.ctx.font = '12px "Courier New", monospace';
            
            this.ctx.fillText(stream.code, stream.x, stream.y);
            
            stream.y += stream.speed;
            stream.hue += 0.5;
            
            if (stream.y > this.canvas.height + 50) {
                stream.y = -50;
                stream.x = Math.random() * this.canvas.width;
                stream.code = this.codes[Math.floor(Math.random() * this.codes.length)];
            }
            
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}