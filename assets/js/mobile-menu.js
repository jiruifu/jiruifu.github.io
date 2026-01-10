/**
 * Mobile Menu with Lottie Animation
 * Handles mobile menu toggle and animation switching based on theme
 */

(function() {
    let menuAnimation = null;
    let isMenuOpen = false;

    // Initialize mobile menu when DOM is ready
    function initMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const animationContainer = document.getElementById('menu-animation-container');

        if (!menuToggle || !navMenu || !animationContainer) {
            return;
        }

        // Check if Lottie is loaded
        if (typeof lottie === 'undefined') {
            console.error('Lottie library not loaded. Please include lottie.min.js');
            // Fallback to simple SVG icon if Lottie is not available
            animationContainer.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
            return;
        }

        // Load the appropriate animation based on current theme
        function loadMenuAnimation() {
            const theme = document.documentElement.getAttribute('data-theme') || 'light';
            // Determine base path - check if we're in a subdirectory
            const isSubdirectory = window.location.pathname.includes('/research/');
            const basePath = isSubdirectory ? '../' : '';
            const animationPath = theme === 'dark' 
                ? basePath + 'assets/img/menu/menu_dark.json'
                : basePath + 'assets/img/menu/menu_light.json';

            // Destroy existing animation if it exists
            if (menuAnimation) {
                menuAnimation.destroy();
                menuAnimation = null;
            }

            // Clear container
            animationContainer.innerHTML = '';

            // Load animation
            menuAnimation = lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: animationPath
            });

            // Set initial frame based on menu state
            // Animation is 28 frames (0-27)
            // Frame 0: Menu/list icon (closed state)
            // Frame 27: Hamburger lines (open state)
            if (isMenuOpen) {
                menuAnimation.goToAndStop(27, true); // Lines (menu is open)
            } else {
                menuAnimation.goToAndStop(0, true); // Menu icon (menu is closed)
            }
        }

        // Toggle menu
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            
            // Toggle menu visibility
            navMenu.classList.toggle('mobile-open', isMenuOpen);
            
            // Animate menu icon
            if (menuAnimation) {
                if (isMenuOpen) {
                    // Play animation forward (hamburger icon transforms to menu lines)
                    menuAnimation.setDirection(1);
                    menuAnimation.playSegments([0, 28], true);
                } else {
                    // Play animation backward (menu lines transform back to hamburger)
                    menuAnimation.setDirection(-1);
                    menuAnimation.playSegments([27, 0], true);
                }
            }
        }

        // Close menu when clicking outside
        function closeMenuOnClickOutside(event) {
            if (isMenuOpen && 
                !navMenu.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                toggleMenu();
            }
        }

        // Close menu when clicking a nav link
        function closeMenuOnNavClick() {
            if (isMenuOpen) {
                toggleMenu();
            }
        }

        // Event listeners
        menuToggle.addEventListener('click', toggleMenu);
        document.addEventListener('click', closeMenuOnClickOutside);
        
        // Close menu when a nav link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenuOnNavClick);
        });

        // Watch for theme changes and reload animation
        const themeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    loadMenuAnimation();
                }
            });
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        // Initial load
        loadMenuAnimation();

        // Handle window resize - show regular menu on larger screens
        function handleResize() {
            if (window.innerWidth > 768) {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    navMenu.classList.remove('mobile-open');
                    if (menuAnimation) {
                        menuAnimation.goToAndStop(0, true);
                        isMenuOpen = false;
                    }
                }
            }
        }

        window.addEventListener('resize', handleResize);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();

