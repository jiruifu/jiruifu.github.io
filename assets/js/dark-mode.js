// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');

// Check if user prefers dark mode
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Get the toggle button
const darkModeToggle = document.querySelector('.dark-mode-toggle');

// Enable dark mode function
const enableDarkMode = () => {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'enabled');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
};

// Disable dark mode function
const disableDarkMode = () => {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', null);
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
};

// Initialize dark mode based on saved preference or system preference
if (darkMode === 'enabled' || (darkMode === null && prefersDarkScheme.matches)) {
  enableDarkMode();
}

// Add toggle button to navigation
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelector('.masthead__menu-item ul');
  const toggleButton = document.createElement('button');
  toggleButton.className = 'dark-mode-toggle';
  toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? 
    '<i class="fas fa-sun"></i>' : 
    '<i class="fas fa-moon"></i>';
  
  const listItem = document.createElement('li');
  listItem.className = 'masthead__menu-item';
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