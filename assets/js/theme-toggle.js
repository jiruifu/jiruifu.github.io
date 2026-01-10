/**
 * Theme Toggle Functionality
 * Handles dark/light mode switching and persistence
 */

(function() {
    // Icon mapping: light mode icon name -> dark mode icon name
    const iconMapping = {
        'email.svg': 'email_dark.svg',
        'github.svg': 'github_dark.svg',
        'googlescholar.svg': 'google_scholar_dark.svg',
        'ORCID_iD.svg': 'ORCID_iD_dark.svg',
        'researchgate.svg': 'researchgate_dark.svg',
        'linkedin.svg': 'linkedin_dark.svg'
    };

    // Reverse mapping: dark mode icon name -> light mode icon name
    const reverseIconMapping = {
        'email_dark.svg': 'email.svg',
        'github_dark.svg': 'github.svg',
        'google_scholar_dark.svg': 'googlescholar.svg',
        'ORCID_iD_dark.svg': 'ORCID_iD.svg',
        'researchgate_dark.svg': 'researchgate.svg',
        'linkedin_dark.svg': 'linkedin.svg'
    };

    // Get dark mode icon name from light mode icon name
    const getDarkIconName = (lightIconName) => {
        return iconMapping[lightIconName] || lightIconName.replace('.svg', '_dark.svg');
    };

    // Get light mode icon name from dark mode icon name
    const getLightIconName = (darkIconName) => {
        return reverseIconMapping[darkIconName] || darkIconName.replace('_dark.svg', '.svg').replace('google_scholar', 'googlescholar');
    };

    // Update social icons based on theme
    const updateSocialIcons = (theme) => {
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            if (icon.tagName === 'IMG') {
                const src = icon.getAttribute('src');
                if (src && src.includes('/icons/')) {
                    // Store original light mode src if not already stored
                    if (!icon.hasAttribute('data-light-src') && !src.includes('/dark/')) {
                        icon.setAttribute('data-light-src', src);
                    }

                    if (theme === 'dark') {
                        // Switch to dark mode icon
                        if (!src.includes('/dark/')) {
                            const iconName = src.split('/').pop();
                            const darkIconName = getDarkIconName(iconName);
                            const darkSrc = src.replace('/icons/', '/icons/dark/').replace(iconName, darkIconName);
                            icon.setAttribute('src', darkSrc);
                        }
                    } else {
                        // Switch to light mode icon
                        if (src.includes('/dark/')) {
                            // Get the stored light mode src, or construct it from the dark src
                            let lightSrc = icon.getAttribute('data-light-src');
                            if (!lightSrc) {
                                const darkIconName = src.split('/').pop();
                                const lightIconName = getLightIconName(darkIconName);
                                lightSrc = src.replace('/icons/dark/', '/icons/').replace(darkIconName, lightIconName);
                            }
                            icon.setAttribute('src', lightSrc);
                        } else {
                            // Already light mode, make sure we're using the correct light icon
                            const storedLightSrc = icon.getAttribute('data-light-src');
                            if (storedLightSrc && storedLightSrc !== src && !src.includes('/dark/')) {
                                icon.setAttribute('src', storedLightSrc);
                            }
                        }
                    }
                }
            }
        });
    };

    // Get theme from localStorage or default to light
    const getStoredTheme = () => localStorage.getItem('theme') || 'light';
    
    // Set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update icons after a short delay to ensure DOM is ready
        setTimeout(() => {
            updateSocialIcons(theme);
        }, 100);
    };
    
    // Initialize theme on page load
    const initTheme = () => {
        const theme = getStoredTheme();
        setTheme(theme);
    };
    
    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };
    
    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
    
    // Add click handler to toggle button
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    });

    // Watch for dynamically loaded content (e.g., markdown content)
    let observer;
    
    const setupIconObserver = () => {
        // Create observer if it doesn't exist
        if (!observer) {
            observer = new MutationObserver((mutations) => {
                // Check if icons were added
                let iconsAdded = false;
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            if (node.classList && node.classList.contains('social-icon')) {
                                iconsAdded = true;
                            }
                            if (node.querySelector && node.querySelector('.social-icon')) {
                                iconsAdded = true;
                            }
                        }
                    });
                });
                
                if (iconsAdded) {
                    const theme = document.documentElement.getAttribute('data-theme') || 'light';
                    // Small delay to ensure icons are fully loaded
                    setTimeout(() => {
                        updateSocialIcons(theme);
                    }, 50);
                }
            });
        }

        // Observe changes to the introduction section and body (for dynamically loaded content)
        const introContainer = document.getElementById('introduction-content');
        if (introContainer) {
            observer.observe(introContainer, { childList: true, subtree: true });
        }
        
        // Also observe body for any dynamically added icons elsewhere
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
    };

    // Set up observer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupIconObserver();
            // Initial update after a delay to catch any icons loaded during page load
            setTimeout(() => {
                const theme = document.documentElement.getAttribute('data-theme') || 'light';
                updateSocialIcons(theme);
            }, 500);
        });
    } else {
        setupIconObserver();
        setTimeout(() => {
            const theme = document.documentElement.getAttribute('data-theme') || 'light';
            updateSocialIcons(theme);
        }, 500);
    }
    
    // Make functions available globally for other scripts
    window.toggleTheme = toggleTheme;
    window.setTheme = setTheme;
    window.getStoredTheme = getStoredTheme;
    window.updateSocialIcons = updateSocialIcons;
})();

