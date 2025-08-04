// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initTypingAnimation();
    initScrollAnimations();
    initSkillsCards();
    initContactForm();
    initAdminPanel();
    initBackToTop();
    initDownloadCV();
    initProfilePhoto();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 70;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link immediately
                    updateActiveLink(targetId);
                }
            }
        });
    });

    // Smooth scrolling for hero buttons - FIXED
    const heroContactBtn = document.querySelector('.hero-buttons a[href="#contact"]');
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const offsetTop = contactSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Navbar scroll effect and active link highlighting - FIXED
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        // Add scrolled class to navbar
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Highlight active navigation link
        const sections = document.querySelectorAll('section[id]');
        let activeSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        if (activeSection) {
            updateActiveLink(`#${activeSection}`);
        }
    });

    function updateActiveLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
}

// Theme toggle functionality - FIXED
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add rotation animation
        this.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 300);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        document.body.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const skills = [
        'Data Engineer',
        'Python Developer', 
        'Databricks Expert',
        'ETL Specialist',
        'Cloud Architect',
        'Big Data Analyst'
    ];
    
    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentSkill = skills[skillIndex];
        
        if (isDeleting) {
            typingText.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentSkill.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentSkill.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            skillIndex = (skillIndex + 1) % skills.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Profile photo interactions
function initProfilePhoto() {
    const profilePhoto = document.querySelector('.profile-photo');
    if (!profilePhoto) return;

    // Add click interaction for mobile
    profilePhoto.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Add keyboard accessibility
    profilePhoto.setAttribute('tabindex', '0');
    profilePhoto.setAttribute('role', 'img');
    profilePhoto.setAttribute('aria-label', 'Adwet Naithani professional photo');

    profilePhoto.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .about-stats .stat');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });

    // Add slide animations for alternating elements
    const slideElements = document.querySelectorAll('.about-content > *');
    slideElements.forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        observer.observe(el);
    });

    // Add slide animations for contact section
    const contactElements = document.querySelectorAll('.contact-content > *');
    contactElements.forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        observer.observe(el);
    });
}

// Skills cards animation and interaction - ENHANCED
function initSkillsCards() {
    const skillsSection = document.querySelector('.skills');
    const skillItems = document.querySelectorAll('.skill-item');
    let skillsAnimated = false;

    if (!skillsSection || skillItems.length === 0) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                animateSkillCards();
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);

    function animateSkillCards() {
        skillItems.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        });
    }

    // Enhanced hover effects and interaction - FIXED
    skillItems.forEach((item, index) => {
        // Initialize card state
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.3s ease';
        
        // Make items focusable for accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        const skillName = item.querySelector('.skill-name')?.textContent || 'Skill';
        item.setAttribute('aria-label', `${skillName} technology skill`);

        // FIXED: Enhanced hover effects that actually work
        item.addEventListener('mouseenter', function() {
            // Transform the entire item
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(33, 128, 141, 0.25)';
            this.style.borderColor = 'var(--color-primary)';
            this.style.background = 'var(--color-bg-1)';
            
            // Scale the icon
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15)';
                icon.style.filter = 'drop-shadow(0 4px 8px rgba(33, 128, 141, 0.3))';
            }
            
            // Style the text
            const skillNameEl = this.querySelector('.skill-name');
            if (skillNameEl) {
                skillNameEl.style.color = 'var(--color-primary)';
                skillNameEl.style.fontWeight = 'var(--font-weight-semibold)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset transforms
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-sm)';
            this.style.borderColor = 'var(--color-card-border)';
            this.style.background = 'var(--color-background)';
            
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.filter = 'none';
            }
            
            const skillNameEl = this.querySelector('.skill-name');
            if (skillNameEl) {
                skillNameEl.style.color = 'var(--color-text)';
                skillNameEl.style.fontWeight = 'var(--font-weight-medium)';
            }
        });

        // Touch interactions for mobile
        item.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.borderColor = 'var(--color-primary)';
        });

        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.borderColor = 'var(--color-card-border)';
            }, 150);
        });

        // Keyboard accessibility
        item.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-primary)';
            this.style.outlineOffset = '2px';
        });

        item.addEventListener('blur', function() {
            this.style.outline = 'none';
        });

        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Trigger a brief animation on key press
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }
        });

        // Handle image load errors with enhanced fallbacks - FIXED
        const skillIcon = item.querySelector('.skill-icon');
        if (skillIcon && skillIcon.tagName === 'IMG') {
            skillIcon.addEventListener('error', function(e) {
                console.warn(`Failed to load skill icon: ${this.alt}`);
                // The onerror in HTML should handle the fallback
            });

            skillIcon.addEventListener('load', function() {
                this.style.opacity = '1';
                console.log(`Successfully loaded icon: ${this.alt}`);
            });

            skillIcon.style.opacity = '0';
            skillIcon.style.transition = 'opacity 0.3s ease';
            
            // Force load check after a short delay
            setTimeout(() => {
                if (skillIcon.naturalWidth === 0) {
                    skillIcon.onerror();
                }
            }, 100);
        }
    });
}

// Contact form handling - ENHANCED
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        clearErrorMessages();
        
        const formData = new FormData(form);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const subject = formData.get('subject')?.trim();
        const message = formData.get('message')?.trim();
        
        let hasErrors = false;
        
        // Enhanced validation with better error messages
        if (!name) {
            showFieldError('name', 'Name is required.');
            hasErrors = true;
        } else if (name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters.');
            hasErrors = true;
        }
        
        if (!email) {
            showFieldError('email', 'Email is required.');
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Please enter a valid email address.');
            hasErrors = true;
        }
        
        if (!subject) {
            showFieldError('subject', 'Subject is required.');
            hasErrors = true;
        } else if (subject.length < 3) {
            showFieldError('subject', 'Subject must be at least 3 characters.');
            hasErrors = true;
        }
        
        if (!message) {
            showFieldError('message', 'Message is required.');
            hasErrors = true;
        } else if (message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters.');
            hasErrors = true;
        }
        
        if (hasErrors) {
            showNotification('Please fix the errors below.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Create mailto link
            const mailtoLink = `mailto:adwetnaithani@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.open(mailtoLink, '_blank');
            
            showNotification('Message prepared! Your email client should open now.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        // Remove existing error
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to field
        field.classList.add('error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-4);
            font-weight: var(--font-weight-medium);
        `;
        
        formGroup.appendChild(errorDiv);
    }
    
    function clearErrorMessages() {
        const errorMessages = form.querySelectorAll('.field-error');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = form.querySelectorAll('.form-control.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
}

// Admin panel for CV updates
function initAdminPanel() {
    const adminForm = document.getElementById('admin-form');
    const adminSection = document.getElementById('admin');
    
    if (!adminForm || !adminSection) return;
    
    // Show admin panel with keyboard shortcut (Ctrl+Shift+A)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            adminSection.classList.toggle('hidden');
            if (!adminSection.classList.contains('hidden')) {
                const passwordField = document.getElementById('admin-password');
                if (passwordField) passwordField.focus();
            }
        }
    });
    
    adminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('admin-password')?.value;
        const cvUrl = document.getElementById('cv-url')?.value;
        
        // Simple password check (in production, use proper authentication)
        if (password === 'admin123') {
            if (cvUrl) {
                localStorage.setItem('cvUrl', cvUrl);
                showNotification('CV URL updated successfully!', 'success');
                adminForm.reset();
                adminSection.classList.add('hidden');
            } else {
                showNotification('Please enter a valid CV URL.', 'error');
            }
        } else {
            showNotification('Invalid password.', 'error');
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// CV download functionality
function initDownloadCV() {
    const downloadBtn = document.getElementById('download-cv');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function() {
        const savedCvUrl = localStorage.getItem('cvUrl');
        
        if (savedCvUrl) {
            // Open CV in new tab
            window.open(savedCvUrl, '_blank');
        } else {
            // Show information message
            showNotification('CV will be available soon. Please contact me directly for now!', 'info');
            // Optionally scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const offsetTop = contactSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        word-wrap: break-word;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: var(--font-family-base);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#059669',
        error: '#DC2626',
        warning: '#D97706',
        info: '#2563EB'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        opacity: 0.8;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            removeNotification(notification);
        }
    }, 5000);
    
    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 300);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some interactive hover effects and loading states
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', debounce(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1; // Reduced for smoother effect
            hero.style.transform = `translateY(${rate}px)`;
        }, 10));
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .timeline-content');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Add CSS for loading state and form validation
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-background);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: var(--font-size-xl);
        color: var(--color-primary);
        z-index: 10000;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
    }
    
    .form-control.error {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1) !important;
    }
    
    .field-error {
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
        font-weight: var(--font-weight-medium);
    }
    
    .skill-item {
        cursor: pointer;
        user-select: none;
    }
    
    .skill-item:hover .skill-name {
        transition: all 0.3s ease;
    }
    
    .skill-icon {
        transition: all 0.3s ease;
    }
    
    .skill-icon img {
        transition: all 0.3s ease;
    }
    
    /* Ensure images don't get distorted */
    .skill-icon {
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
    }
    
    /* Profile photo accessibility */
    .profile-photo:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 4px;
    }
    
    /* Enhanced skill fallback styling */
    .skill-fallback {
        width: 48px;
        height: 48px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-xs);
        text-align: center;
        line-height: 1.2;
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);