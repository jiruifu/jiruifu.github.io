// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');

// Check if user prefers dark mode
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Enable dark mode function
const enableDarkMode = () => {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
  const button = document.querySelector('.dark-mode-toggle');
  if (button) {
    button.innerHTML = '<i class="fas fa-sun"></i>';
  }
};

// Disable dark mode function
const disableDarkMode = () => {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
  const button = document.querySelector('.dark-mode-toggle');
  if (button) {
    button.innerHTML = '<i class="fas fa-moon"></i>';
  }
};

// Initialize dark mode based on saved preference or system preference
if (darkMode === 'enabled') {
  enableDarkMode();
}

// Create and add the toggle button
const createToggleButton = () => {
  // Remove any existing button first
  const existingContainer = document.querySelector('.dark-mode-container');
  if (existingContainer) {
    existingContainer.remove();
  }

  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'dark-mode-container';
  
  const toggleButton = document.createElement('button');
  toggleButton.className = 'dark-mode-toggle';
  toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? 
    '<i class="fas fa-sun"></i>' : 
    '<i class="fas fa-moon"></i>';
  
  toggleContainer.appendChild(toggleButton);
  document.body.appendChild(toggleContainer);

  toggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
};

// Add toggle button when DOM is loaded
document.addEventListener('DOMContentLoaded', createToggleButton);

// Add toggle button when turbolinks:load event occurs (if using turbolinks)
document.addEventListener('turbolinks:load', createToggleButton);