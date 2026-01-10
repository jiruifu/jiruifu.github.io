/**
 * Navigation functionality for single-page website
 * Handles smooth scrolling and active link highlighting
 */

/**
 * Handle anchor navigation when page loads with hash
 */
function handleAnchorNavigation() {
    // Check if URL has a hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            // Wait for page to be fully loaded and images to load
            setTimeout(() => {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // Update active link - check both #hash and *hash formats
                const navLink = document.querySelector(`.nav-link[href="#${hash}"], .nav-link[href*="#${hash}"]`);
                if (navLink) {
                    updateActiveLink(navLink);
                }
            }, 500);
        }
    } else {
        // If no hash and on homepage, scroll to top (home) and set home as active
        const isHomepage = window.location.pathname.endsWith('index.html') || 
                           window.location.pathname === '/' || 
                           window.location.pathname.endsWith('/') ||
                           !window.location.pathname.match(/\.html$/);
        if (isHomepage) {
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
            const homeLink = document.querySelector('.nav-link[href="#home"], .nav-link[href*="#home"]');
            if (homeLink) {
                updateActiveLink(homeLink);
            }
        }
    }
}

// Handle anchor navigation on page load (for when navigating from external pages)
window.addEventListener('load', function() {
    const isHomepage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/') ||
                       !window.location.pathname.match(/\.html$/);
    if (isHomepage && window.location.hash) {
        handleAnchorNavigation();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the homepage (index.html)
    const isHomepage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/') ||
                       !window.location.pathname.match(/\.html$/);
    
    if (isHomepage) {
        // Get all navigation links with anchor hrefs
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = this.getAttribute('href');
                const targetId = href.substring(1); // Remove #
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calculate offset for sticky navbar
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without triggering scroll
                    window.history.pushState(null, null, `#${targetId}`);
                    
                    // Update active link
                    updateActiveLink(this);
                }
            });
        });
        
        // Update active link on scroll
        window.addEventListener('scroll', updateActiveOnScroll);
        
        // Handle anchor navigation on page load
        if (window.location.hash) {
            handleAnchorNavigation();
        } else {
            // If no hash, set home as active
            const homeLink = document.querySelector('.nav-link[href="#home"], .nav-link[href*="#home"]');
            if (homeLink) {
                updateActiveLink(homeLink);
            }
        }
        
        // Handle hash changes (when clicking links from same page)
        window.addEventListener('hashchange', handleAnchorNavigation);
    }
});

/**
 * Update active navigation link
 */
function updateActiveLink(activeLink) {
    // Only update if we're on the homepage
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-link[href*="#"]');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

/**
 * Update active link based on scroll position
 */
function updateActiveOnScroll() {
    const isHomepage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/') ||
                       !window.location.pathname.match(/\.html$/);
    
    if (!isHomepage) return;
    
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const scrollPosition = window.pageYOffset + navbarHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"], .nav-link[href*="#${sectionId}"]`);
            if (navLink) {
                updateActiveLink(navLink);
            }
        }
    });
    
    // Handle home section (special case)
    if (window.pageYOffset < 100) {
        const homeLink = document.querySelector('.nav-link[href="#home"], .nav-link[href*="#home"]');
        if (homeLink) {
            updateActiveLink(homeLink);
        }
    }
}
