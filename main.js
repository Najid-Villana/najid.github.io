// IFDSS Main JavaScript File
// Handles all interactive elements, animations, and user interactions

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCharts();
    initializeParticleSystem();
    initializeScrollEffects();
    initializeFormHandlers();
    initializeTypedText();
    initializeStatsCounters();
});

// Typed Text Animation
function initializeTypedText() {
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Revolutionary AI technology that sees fire before it spreads.',
                'Millisecond detection with 99.7% accuracy.',
                'Automated suppression with precision targeting.',
                '24/7 monitoring with instant mobile alerts.'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Stats Counter Animation
function initializeStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        statsObserver.observe(counter);
    });
}

// Initialize Animations
function initializeAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.card-hover, .tech-component');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuart',
                    delay: Math.random() * 200
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Hero section animations
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.hero-bg h1',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: 500
    })
    .add({
        targets: '.hero-bg .stats-counter',
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(200)
    }, '-=500')
    .add({
        targets: '.hero-bg button',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100)
    }, '-=300');
}

// Initialize Charts
function initializeCharts() {
    // Response Time Chart
    const responseChart = echarts.init(document.getElementById('response-chart'));
    if (responseChart) {
        const responseOption = {
            backgroundColor: 'transparent',
            textStyle: {
                color: '#FAFAFA'
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#2D3748',
                borderColor: '#FF6B35',
                textStyle: {
                    color: '#FAFAFA'
                }
            },
            legend: {
                data: ['Traditional Smoke Detector', 'IFDSS AI System'],
                textStyle: {
                    color: '#FAFAFA'
                }
            },
            xAxis: {
                type: 'category',
                data: ['Detection', 'Alert', 'Response', 'Suppression'],
                axisLine: {
                    lineStyle: {
                        color: '#4A5568'
                    }
                },
                axisLabel: {
                    color: '#FAFAFA'
                }
            },
            yAxis: {
                type: 'value',
                name: 'Time (seconds)',
                nameTextStyle: {
                    color: '#FAFAFA'
                },
                axisLine: {
                    lineStyle: {
                        color: '#4A5568'
                    }
                },
                axisLabel: {
                    color: '#FAFAFA'
                },
                splitLine: {
                    lineStyle: {
                        color: '#4A5568'
                    }
                }
            },
            series: [
                {
                    name: 'Traditional Smoke Detector',
                    type: 'bar',
                    data: [120, 30, 180, 300],
                    itemStyle: {
                        color: '#E53E3E'
                    }
                },
                {
                    name: 'IFDSS AI System',
                    type: 'bar',
                    data: [0.05, 0.1, 2, 5],
                    itemStyle: {
                        color: '#3182CE'
                    }
                }
            ]
        };
        
        responseChart.setOption(responseOption);
        
        // Make chart responsive
        window.addEventListener('resize', () => {
            responseChart.resize();
        });
    }
    
    // Accuracy Chart
    const accuracyChart = echarts.init(document.getElementById('accuracy-chart'));
    if (accuracyChart) {
        const accuracyOption = {
            backgroundColor: 'transparent',
            textStyle: {
                color: '#FAFAFA'
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: '#2D3748',
                borderColor: '#FF6B35',
                textStyle: {
                    color: '#FAFAFA'
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: {
                    color: '#FAFAFA'
                }
            },
            series: [
                {
                    name: 'False Alarms',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 30, name: 'Traditional Systems (30%)', itemStyle: { color: '#E53E3E' } },
                        { value: 0.3, name: 'IFDSS AI (0.3%)', itemStyle: { color: '#38A169' } }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        accuracyChart.setOption(accuracyOption);
        
        // Make chart responsive
        window.addEventListener('resize', () => {
            accuracyChart.resize();
        });
    }
}

// Particle System for Hero Background
function initializeParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#FF6B35' : '#3182CE';
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            
            // Draw connections
            particles.forEach(particle => {
                const dx = this.x - particle.x;
                const dy = this.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(particle.x, particle.y);
                    ctx.strokeStyle = this.color;
                    ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
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
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('bg-slate-900/95');
            navbar.classList.remove('bg-slate-900/90');
        } else {
            navbar.classList.add('bg-slate-900/90');
            navbar.classList.remove('bg-slate-900/95');
        }
    });
}

// Form Handlers
function initializeFormHandlers() {
    // Demo form submission
    const demoForm = document.getElementById('demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Show success message
                showNotification('Demo request submitted successfully! We\'ll contact you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Close modal
                closeDemoForm();
            }, 2000);
        });
    }
}

// Modal Functions
function openDemoForm() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animate modal appearance
        anime({
            targets: modal.querySelector('.demo-form'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutBack'
        });
    }
}

function closeDemoForm() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        anime({
            targets: modal.querySelector('.demo-form'),
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInBack',
            complete: () => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-600', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-600', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-600', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-600', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-1">${message}</div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Technology Component Interactions
function highlightComponent(componentId) {
    // Remove previous highlights
    document.querySelectorAll('.tech-component').forEach(component => {
        component.classList.remove('ring-2', 'ring-orange-500');
    });
    
    // Add highlight to selected component
    const component = document.getElementById(componentId);
    if (component) {
        component.classList.add('ring-2', 'ring-orange-500');
        
        // Scroll to component
        component.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Animate component
        anime({
            targets: component,
            scale: [1, 1.02, 1],
            duration: 600,
            easing: 'easeInOutQuad'
        });
    }
}

// Simulate Fire Detection (for demo purposes)
function simulateFireDetection() {
    const alertBox = document.querySelector('.alert-notification');
    if (alertBox) {
        // Flash the alert
        anime({
            targets: alertBox,
            scale: [1, 1.05, 1],
            duration: 200,
            easing: 'easeInOutQuad',
            loop: 3
        });
        
        // Update alert text
        const alertText = alertBox.querySelector('.text-xs.font-semibold');
        if (alertText) {
            const originalText = alertText.textContent;
            alertText.textContent = 'FIRE DETECTED - ZONE 3 - SUPPRESSION ACTIVE';
            
            setTimeout(() => {
                alertText.textContent = originalText;
            }, 3000);
        }
    }
}

// WhatsApp Integration
function openWhatsApp() {
    const phoneNumber = '+923327355159'; // Replace with actual WhatsApp number
    const message = 'Hello, I\'m interested in learning more about IFDSS fire detection systems.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Smooth page transitions
function navigateToPage(url) {
    // Add fade out effect
    anime({
        targets: 'body',
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
            window.location.href = url;
        }
    });
}

// Initialize page fade in
anime({
    targets: 'body',
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutQuad'
});

// Export functions for global access
window.openDemoForm = openDemoForm;
window.closeDemoForm = closeDemoForm;
window.toggleMobileMenu = toggleMobileMenu;
window.highlightComponent = highlightComponent;
window.simulateFireDetection = simulateFireDetection;
window.openWhatsApp = openWhatsApp;
window.navigateToPage = navigateToPage;
window.showNotification = showNotification;