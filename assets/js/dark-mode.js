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
  // Target the correct navigation element
  const navItems = document.querySelector('.greedy-nav__nav-links');
  if (!navItems) {
    console.log('Navigation container not found');
    return;
  }

  const toggleButton = document.createElement('button');
  toggleButton.className = 'dark-mode-toggle';
  toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? 
    '<i class="fas fa-sun"></i>' : 
    '<i class="fas fa-moon"></i>';
  
  const listItem = document.createElement('li');
  listItem.className = 'nav-item';
  listItem.appendChild(toggleButton);
  navItems.appendChild(listItem);

  // Add click event
  toggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
});