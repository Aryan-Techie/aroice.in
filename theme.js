// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        if (!themeToggle || !themeIcon) {
            console.error('Theme toggle elements not found in DOM');
            return;
        }

        // Function to safely access localStorage
        function getLocalStorage(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                console.warn('Local storage access error:', e);
                return null;
            }
        }

        function setLocalStorage(key, value) {
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (e) {
                console.warn('Local storage write error:', e);
                return false;
            }
        }
        
        // Apply theme function
        function applyTheme(theme) {
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                if (themeIcon.classList.contains('fa-moon')) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    themeIcon.classList.add('fa-sun');
                }
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (themeIcon.classList.contains('fa-sun')) {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                } else {
                    themeIcon.classList.add('fa-moon');
                }
            }
        }
        
        // Check for saved theme preference or use device preference
        const savedTheme = getLocalStorage('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (savedTheme === 'light') {
            applyTheme('light');
        } else if (savedTheme === 'dark') {
            applyTheme('dark');
        } else if (prefersDarkScheme.matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
        
        // Toggle theme when button is clicked
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
            setLocalStorage('theme', newTheme);
        });
        
        // Make theme toggle visible after initialization
        themeToggle.style.opacity = '1';
        
    } catch (error) {
        console.error('Theme toggle initialization error:', error);
    }
});
