/**
 * Micro-interactions to enhance user engagement
 * - Subtle animations
 * - Mouseover effects
 * - Keyboard accessibility enhancements
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mouse trail effect
    createCursorTrail();
    
    // Add hover effect for buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        // Add subtle sound effect on click (optional)
        button.addEventListener('click', function() {
            // Create subtle feedback (can be disabled by user preference)
            if (window.navigator.vibrate && !prefersReducedMotion()) {
                window.navigator.vibrate(5); // Very subtle vibration on mobile
            }
        });
    });
    
    // Add ripple effect on click
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Check for reduced motion preference
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // Create ripple effect function
    function createRipple(e) {
        if (prefersReducedMotion()) return;
        
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        // Remove existing ripples
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Create cursor trail effect
    function createCursorTrail() {
        // Skip cursor trail on reduced motion preference
        if (prefersReducedMotion()) return;
        
        // Check if user is on a mobile device and skip cursor trail if true
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return; // Exit the function early for mobile devices
        }
        
        const numberOfDots = 12;
        const dots = [];
        
        // Create dots
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('cursor-trail');
            dot.style.opacity = 1 - (i / numberOfDots);
            
            // Adjust base opacity based on theme
            const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
            const baseOpacity = isLightTheme ? 0.9 : 0.6;
            dot.style.opacity = baseOpacity - (i / numberOfDots) * 0.5;
            
            dot.style.transform = 'scale(' + (1 - (i / numberOfDots) * 0.6) + ')';
            document.body.appendChild(dot);
            dots.push({
                element: dot,
                x: 0,
                y: 0
            });
        }
        
        // Update dot positions on mouse move
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Update theme observer for cursor trail
        const themeObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'data-theme') {
                    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
                    dots.forEach((dot, index) => {
                        const baseOpacity = isLightTheme ? 0.9 : 0.6;
                        dot.element.style.opacity = baseOpacity - (index / numberOfDots) * 0.5;
                    });
                }
            });
        });
        
        themeObserver.observe(document.documentElement, { attributes: true });
        
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === 0) {
                    dot.x = mouseX;
                    dot.y = mouseY;
                } else {
                    dot.x += (dots[index - 1].x - dot.x) * 0.3;
                    dot.y += (dots[index - 1].y - dot.y) * 0.3;
                }
                
                dot.element.style.left = dot.x + 'px';
                dot.element.style.top = dot.y + 'px';
            });
            
            requestAnimationFrame(updateDots);
        }
        
        updateDots();
    }
    
    // Enhance accessibility - add keyboard support
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.content');
    
    document.addEventListener('keydown', function(e) {
        // Add Escape key handler
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
});

// Add a helper class for ripple effect
document.head.insertAdjacentHTML('beforeend', `
<style>
.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    background-color: rgba(255, 255, 255, 0.5);
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
</style>
`);



