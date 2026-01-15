/**
 * Mohd Waqar Azim Portfolio - Interactive Features
 * Mouse spotlight effect and scroll-based navigation
 */

(function() {
    'use strict';

    // ========================================
    // MOUSE SPOTLIGHT EFFECT
    // ========================================
    const spotlight = document.getElementById('spotlight');
    
    function updateSpotlight(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        spotlight.style.setProperty('--mouse-x', `${x}px`);
        spotlight.style.setProperty('--mouse-y', `${y}px`);
    }
    
    // Only enable spotlight on larger screens
    function initSpotlight() {
        if (window.innerWidth > 1024) {
            document.addEventListener('mousemove', updateSpotlight);
            spotlight.style.display = 'block';
        } else {
            document.removeEventListener('mousemove', updateSpotlight);
            spotlight.style.display = 'none';
        }
    }
    
    initSpotlight();
    window.addEventListener('resize', debounce(initSpotlight, 250));

    // ========================================
    // SCROLL-BASED NAVIGATION HIGHLIGHTING
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNav(id);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    function updateActiveNav(activeId) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // ========================================
    // CARD HOVER EFFECT ENHANCEMENT
    // ========================================
    const cards = document.querySelectorAll('.experience-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.setProperty('--card-opacity', '1');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--card-opacity', '0');
        });
    });

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
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

    // ========================================
    // PAGE LOAD ANIMATION
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('loaded');
        
        // Set initial active nav based on URL hash or first section
        const hash = window.location.hash;
        if (hash) {
            updateActiveNav(hash.substring(1));
        } else {
            updateActiveNav('about');
        }
    });

    // ========================================
    // HANDLE HASH CHANGES
    // ========================================
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash;
        if (hash) {
            updateActiveNav(hash.substring(1));
        }
    });

    // ========================================
    // EXTERNAL LINK HANDLING
    // ========================================
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Ensure security attributes
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    console.log(
        '%c👋 Hello, curious developer!',
        'color: #5eead4; font-size: 20px; font-weight: bold;'
    );
    console.log(
        '%cInterested in working together? Reach out at waqarworks11@gmail.com',
        'color: #94a3b8; font-size: 14px;'
    );

})();
