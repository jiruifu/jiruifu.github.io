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
if (darkMode === 'enabled' || (darkMode === null && prefersDarkScheme.matches)) {
  enableDarkMode();
}

// Add toggle button to navigation
document.addEventListener('DOMContentLoaded', () => {
  // Create a container for the toggle button
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'dark-mode-container';
  
  const toggleButton = document.createElement('button');
  toggleButton.className = 'dark-mode-toggle';
  toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? 
    '<i class="fas fa-sun"></i>' : 
    '<i class="fas fa-moon"></i>';
  
  toggleContainer.appendChild(toggleButton);
  
  // Add to the body instead of navigation
  document.body.appendChild(toggleContainer);

  // Add click event
  toggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
});