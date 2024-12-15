// Enable dark mode function
const enableDarkMode = () => {
  document.documentElement.classList.add('dark-mode');
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
  const button = document.querySelector('.dark-mode-toggle');
  if (button) {
    button.innerHTML = '<i class="fas fa-sun"></i>';
  }
};

// Disable dark mode function
const disableDarkMode = () => {
  document.documentElement.classList.remove('dark-mode');
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
  const button = document.querySelector('.dark-mode-toggle');
  if (button) {
    button.innerHTML = '<i class="fas fa-moon"></i>';
  }
};

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');

// Initialize dark mode based on saved preference
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
  toggleButton.setAttribute('aria-label', 'Toggle dark mode');
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

// Initialize the button
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createToggleButton);
} else {
  createToggleButton();
}

// Re-initialize on navigation (if using turbolinks)
document.addEventListener('turbolinks:load', createToggleButton);