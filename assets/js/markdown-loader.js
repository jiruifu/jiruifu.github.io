/**
 * Markdown Loader
 * Loads and renders Markdown files into HTML elements
 * Uses marked.js library for parsing (loaded from CDN)
 */

/**
 * Load and render a Markdown file into a container
 * @param {string} markdownPath - Path to the markdown file
 * @param {string} containerId - ID of the container element
 * @param {Function} callback - Optional callback function after rendering
 */
async function loadMarkdown(markdownPath, containerId, callback) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    try {
        // Show loading message
        container.innerHTML = '<div class="loading-message">Loading content...</div>';

        // Fetch the markdown file
        const response = await fetch(markdownPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${markdownPath}: ${response.statusText}`);
        }

        const markdownText = await response.text();

        // Check if marked.js is loaded
        if (typeof marked === 'undefined') {
            console.error('marked.js library is not loaded. Please include it from CDN.');
            container.innerHTML = '<p class="error-message">Error: Markdown parser not available. Please include marked.js library.</p>';
            return;
        }

        // Parse markdown to HTML
        const htmlContent = marked.parse(markdownText);

        // Insert into container
        container.innerHTML = htmlContent;

        // Add markdown content class for styling
        container.classList.add('markdown-content');

        // Update social icons after markdown is loaded
        if (typeof updateSocialIcons === 'function') {
            const theme = document.documentElement.getAttribute('data-theme') || 'light';
            setTimeout(() => {
                updateSocialIcons(theme);
            }, 50);
        }

        // Call callback if provided
        if (callback && typeof callback === 'function') {
            callback(container);
        }

    } catch (error) {
        console.error(`Error loading markdown file ${markdownPath}:`, error);
        container.innerHTML = `<p class="error-message">Error loading content: ${error.message}</p>`;
    }
}

/**
 * Load multiple markdown files
 * @param {Array} files - Array of objects with {path, containerId} properties
 */
async function loadMultipleMarkdown(files) {
    const promises = files.map(file => loadMarkdown(file.path, file.containerId, file.callback));
    await Promise.all(promises);
}

/**
 * Initialize markdown content on page load
 */
async function initMarkdownContent() {
    // Load introduction markdown
    const introContainer = document.getElementById('introduction-content');
    if (introContainer) {
        await loadMarkdown('content/introduction.md', 'introduction-content');
    }

    // Load project descriptions from markdown
    await loadProjectMarkdown();
}

/**
 * Load project descriptions from markdown files
 */
async function loadProjectMarkdown() {
    const projects = [
        { id: 'project1', path: 'content/projects/project1.md' },
        { id: 'project2', path: 'content/projects/project2.md' },
        { id: 'project3', path: 'content/projects/project3.md' }
    ];

    for (const project of projects) {
        const container = document.getElementById(`${project.id}-description`);
        if (container) {
            // Only load first paragraph for project cards (preview)
            await loadMarkdown(project.path, `${project.id}-description`, (container) => {
                // Extract first paragraph for preview
                const firstP = container.querySelector('p');
                if (firstP && container.children.length > 1) {
                    // Keep only the first paragraph if there are multiple elements
                    container.innerHTML = firstP.outerHTML;
                }
            });
        }
    }
}

// Wait for marked.js to load before initializing
function waitForMarked() {
    if (typeof marked !== 'undefined') {
        initMarkdownContent();
    } else {
        // Try again after a short delay
        setTimeout(waitForMarked, 100);
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForMarked);
} else {
    waitForMarked();
}

