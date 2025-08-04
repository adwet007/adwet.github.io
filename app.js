// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeApp();
});

function initializeApp() {
    // Theme management
    initializeTheme();
    
    // Navigation
    initializeNavigation();
    
    // Loading screen
    initializeLoadingScreen();
    
    // Hero typing animation
    initializeTypingAnimation();
    
    // Scroll animations
    initializeScrollAnimations();
    
    // Statistics counter
    initializeStatsCounter();
    
    // Contact form
    initializeContactForm();
    
    // Scroll to top button
    initializeScrollToTop();
    
    // Project modals
    initializeProjectModals();
    
    // Resume download
    initializeResumeDownload();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Navbar scroll effects
    initializeNavbarScrollEffects();
}

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function setTheme(theme) {
        html.setAttribute('data-color-scheme', theme);
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Navigation
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // Update active nav link on scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 150; // Add offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // If we're at the very top, highlight home
    if (window.scrollY < 100) {
        current = 'home';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
}

// Hero Typing Animation
function initializeTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Databricks Certified Data Engineer',
        'Cloud & Big Data Specialist',
        'ETL Pipeline Expert',
        'Data Migration Specialist'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.slice(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.slice(0, charIndex + 1);
            charIndex++;
        }
        
        let typingSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing animation after loading screen
    setTimeout(typeEffect, 2000);
}

// Scroll Animations
function initializeScrollAnimations() {
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
    
    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll(
        '.skill-category, .timeline-item, .project-card, .cert-card, .stat-card'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Statistics Counter
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.stats-grid'));
    }
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (target === 30 ? 'TB+' : target === 35 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (target === 30 ? 'TB+' : target === 35 ? '%' : '+');
                }
            }, 30);
        });
    }
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 2000);
    });
    
    function validateForm(name, email, subject, message) {
        const errors = [];
        
        if (!name) errors.push('Name is required');
        if (!email) errors.push('Email is required');
        if (!isValidEmail(email)) errors.push('Please enter a valid email');
        if (!subject) errors.push('Subject is required');
        if (!message) errors.push('Message is required');
        
        if (errors.length > 0) {
            showNotification(errors.join('\n'), 'error');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Modals
function initializeProjectModals() {
    // Modal data
    const projectData = {
        'payment-gateway': {
            title: 'Payment Gateway Data Migration',
            description: 'Spearheaded the migration of 30TB of critical user data from Amazon S3 to Databricks Unity Catalog, ensuring schema consistency, secure access control, and data integrity across development, staging, and production environments.',
            technologies: ['Databricks', 'AWS S3', 'Unity Catalog', 'SQL', 'Python'],
            achievements: [
                'Transformed cumbersome Amazon QuickSight SQL queries, optimizing for faster data retrieval and diminishing cloud costs by 30%',
                'Automated the parameterization of 10+ SQL queries in Databricks, ensuring consistent and scalable execution across 4,000+ instances',
                'Maintained 99.9% data integrity during the migration process',
                'Reduced query execution time by 45% through optimized data partitioning'
            ],
            challenges: [
                'Handling 30TB of live data without service interruption',
                'Ensuring schema consistency across multiple environments',
                'Optimizing query performance for large-scale operations'
            ]
        },
        'ecommerce-migration': {
            title: 'E-commerce Marketplace Migration',
            description: 'Migrated over 10,000 tables from Vertica to Databricks, accounting for 30% of the total data migration effort for a major e-commerce platform.',
            technologies: ['Vertica', 'Databricks', 'PySpark', 'Delta Lake', 'JSON'],
            achievements: [
                'Boosted query performance by 35% during data migration by applying efficient partitioning on year, month, and day columns',
                'Implemented transformation logic supporting complex nested types (List, Map or nested struct) with prefix handling and conditional rules from JSON metadata',
                'Reduced data migration time by 40% through the implementation of parallel processing techniques for high-volume table ingestion',
                'Successfully migrated 10,000+ tables with zero data loss'
            ],
            challenges: [
                'Handling complex nested data structures',
                'Managing large-scale parallel processing',
                'Maintaining data consistency across thousands of tables'
            ]
        },
        'entertainment-etl': {
            title: 'Entertainment Platform ETL Optimization',
            description: 'Optimized ETL workloads for an entertainment and online ticketing platform, focusing on performance improvements and resource utilization.',
            technologies: ['PySpark', 'Apache Spark', 'ETL', 'Python', 'SQL'],
            achievements: [
                'Applied query tuning strategies including partitioning, indexing, and caching—improving speed by 30%',
                'Reduced resource utilization and execution time by 20% through PySpark UDF tuning',
                'Conducted performance profiling of ETL workloads to identify and fix bottlenecks',
                'Implemented automated monitoring for ETL job performance'
            ],
            challenges: [
                'Optimizing complex ETL workflows',
                'Reducing resource consumption while maintaining performance',
                'Handling real-time data processing requirements'
            ]
        }
    };
    
    // Make openProjectModal and closeProjectModal global
    window.openProjectModal = function(projectId) {
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        const project = projectData[projectId];
        
        if (!project) return;
        
        modalBody.innerHTML = `
            <div class="project-modal-content">
                <h2 class="project-modal-title">${project.title}</h2>
                <p class="project-modal-description">${project.description}</p>
                
                <div class="project-modal-section">
                    <h3>Technologies Used</h3>
                    <div class="project-modal-tags">
                        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-modal-section">
                    <h3>Key Achievements</h3>
                    <ul class="project-modal-list">
                        ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-modal-section">
                    <h3>Technical Challenges</h3>
                    <ul class="project-modal-list">
                        ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };
    
    window.closeProjectModal = function() {
        const modal = document.getElementById('project-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

// Resume Download
function initializeResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a simple resume content
        const resumeContent = generateResumeContent();
        
        // Create and download the file
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Adwet_Naithani_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('Resume downloaded successfully!', 'success');
    });
}

function generateResumeContent() {
    return `
ADWET NAITHANI
Databricks Certified Data Engineer | Cloud & Big Data Specialist
Email: adwetnaithani@gmail.com
Phone: +91 8755682089
Location: Dehradun, Uttarakhand, India
LinkedIn: linkedin.com/in/adwet
GitHub: github.com/adwet007

PROFESSIONAL SUMMARY
Databricks Certified Data Engineer Associate with over 1 year of hands-on experience, including a 5-month internship and 8 months in a full-time Data Engineer role. Strong foundation in data analytics from a prior 6-month internship, with proven skills in building scalable data pipelines, optimizing ETL workflows, and working with cloud and big data technologies.

WORK EXPERIENCE

Data Engineer | Digivatelabs | December 2024 – Present
• Proven expertise in migrating legacy systems (Cloudera, Redshift, Vertica) to Databricks, enhancing performance and reducing latency
• Built scalable data pipelines using Apache Spark and Databricks, leveraging Medallion Architecture
• Reduced job runtime by 20% by optimizing data processing workflows

Key Projects:
- Payment Gateway Migration: Migrated 30TB of critical user data from Amazon S3 to Databricks Unity Catalog
- E-commerce Marketplace Migration: Migrated over 10,000 tables from Vertica to Databricks

Data Engineer Intern | Digivatelabs | July 2024 - November 2024
• Applied query tuning strategies including partitioning, indexing, and caching—improving speed by 30%
• Reduced resource utilization and execution time by 20% through PySpark UDF tuning
• Conducted performance profiling of ETL workloads to identify and fix bottlenecks

TECHNICAL SKILLS

Programming: Python, R, SQL, Apache Spark SQL
Data Processing: PySpark, Pandas, Delta Lake
Big Data/Cloud: Databricks, AWS (S3, Redshift, RDS), Azure
Data Analysis: Power BI, Matplotlib, Seaborn
Automation: Apache Airflow, Git, DLT
ETL/Governance: Data Modeling, Data Governance
Formats: Parquet, JSON, ORC, Avro, CSV

CERTIFICATIONS
• Databricks Certified Data Engineer Associate
• Astronomer Certification for Apache Airflow 2 Fundamentals
• Databricks Accredited Lakehouse Fundamentals
• Google Data Analytics Professional Certificate
• Microsoft Power BI Data Analyst by Microsoft
• IBM Data Analyst Professional Certificate
• Data Science with Databricks for Data Analyst

EDUCATION
Master of Technology | Graphic Era Hill University | Dehradun, Uttarakhand
Bachelor of Technology | University Of Petroleum and Energy Studies | Dehradun, Uttarakhand

KEY ACHIEVEMENTS
• Migrated 30TB+ of data across multiple projects
• Achieved 35% performance improvement in query execution
• Reduced cloud costs by 30% through optimization
• Successfully handled 10,000+ table migrations
    `.trim();
}

// Smooth Scrolling - Fixed navigation targeting
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const offsetTop = targetElement.offsetTop - navbarHeight - 20; // Extra padding for better positioning
                
                window.scrollTo({
                    top: Math.max(0, offsetTop), // Ensure we don't scroll to negative position
                    behavior: 'smooth'
                });
                
                // Update active nav link immediately
                setTimeout(() => {
                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                        if (navLink.getAttribute('href') === `#${targetId}`) {
                            navLink.classList.add('active');
                        }
                    });
                }, 100);
            }
        });
    });
}

// Navbar Scroll Effects
function initializeNavbarScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-card-border);
        border-radius: var(--radius-lg);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: var(--space-12);
        color: var(--color-text);
        margin-right: var(--space-24);
    `;
    
    const icon = notification.querySelector('i');
    icon.style.color = type === 'success' ? 'var(--color-success)' : 
                      type === 'error' ? 'var(--color-error)' : 
                      'var(--color-primary)';
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: var(--space-8);
        right: var(--space-8);
        background: none;
        border: none;
        color: var(--color-text-secondary);
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-sm);
        transition: background var(--duration-fast) ease;
    `;
    
    closeBtn.addEventListener('mouseover', function() {
        this.style.background = 'var(--color-secondary)';
    });
    
    closeBtn.addEventListener('mouseout', function() {
        this.style.background = 'none';
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .project-modal-content {
        color: var(--color-text);
    }
    
    .project-modal-title {
        color: var(--color-primary);
        margin-bottom: var(--space-16);
        font-size: var(--font-size-2xl);
    }
    
    .project-modal-description {
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin-bottom: var(--space-24);
    }
    
    .project-modal-section {
        margin-bottom: var(--space-24);
    }
    
    .project-modal-section h3 {
        color: var(--color-text);
        margin-bottom: var(--space-12);
        font-size: var(--font-size-lg);
    }
    
    .project-modal-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-8);
        margin-bottom: var(--space-16);
    }
    
    .project-modal-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .project-modal-list li {
        color: var(--color-text-secondary);
        padding: var(--space-8) 0;
        padding-left: var(--space-20);
        position: relative;
        line-height: 1.5;
    }
    
    .project-modal-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--color-success);
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal on Escape
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (!modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    }
});

// Improve accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Add focus management for modals
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Trap focus within modal when open
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = modalContent.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll-heavy functions
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 100);
const debouncedNavbarScrollEffects = debounce(function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

// Replace direct scroll listeners with debounced versions
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// Lazy loading for better performance
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images exist
document.addEventListener('DOMContentLoaded', initializeLazyLoading);