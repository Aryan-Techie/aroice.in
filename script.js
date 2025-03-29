document.addEventListener('DOMContentLoaded', function() {
    // The title will still have the initial glitch animation from CSS
    // But we're removing the periodic effect that was causing the blinking
    
    // Improve security by disabling right-click context menu
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        return false;
    });
    
    // Disable developer tools keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Use event.key instead of deprecated event.keyCode for better readability
        if (
            event.key === 'F12' || 
            (event.ctrlKey && event.shiftKey && event.key === 'I') || // Ctrl+Shift+I
            (event.ctrlKey && event.shiftKey && event.key === 'J') || // Ctrl+Shift+J
            (event.ctrlKey && event.key === 'U') // Ctrl+U
        ) {
            event.preventDefault();
            return false;
        }
    });
    
    // Add protection against text selection to prevent easy copying
    document.body.style.userSelect = 'none';
    
    // Optional: Add console warning for curious users
    console.log('%cStop!', 'color: red; font-size: 30px; font-weight: bold;');
    console.log('%cThis is a private browser feature intended for developers.', 'font-size: 18px;');
    
    // Optional: Track and respond to developer tools opening
    let devtoolsOpen = false;
    
    // Method 1: Track resize events that might indicate dev tools opening
    window.addEventListener('resize', function() {
        checkDevTools();
    });
    
    function checkDevTools() {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // Respond to dev tools opening - could redirect, show message, etc.
                // alert("Developer tools detected!");
            }
        } else {
            devtoolsOpen = false;
        }
    }
});
