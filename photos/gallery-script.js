/**
 * Gallery Script for Aroice Photography Portfolio
 * Handles image filtering, lazy loading, and user interactions
 */

class PhotoGallery {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.photoItems = document.querySelectorAll('.photo-item');
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupLazyLoading();
        this.setupImageErrorHandling();
        this.setupKeyboardNavigation();
        this.preloadCriticalImages();
    }

    setupEventListeners() {
        // Filter button clicks
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // Image click for potential lightbox or full-screen view
        this.photoItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleImageClick(e);
            });
            
            // Keyboard support for image items
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleImageClick(e);
                }
            });
        });

        // Performance: Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleFilterClick(button) {
        const filter = button.dataset.filter;
        
        if (filter === this.currentFilter) return;
        
        // Update active button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        
        // Filter images
        this.filterImages(filter);
        this.currentFilter = filter;
        
        // Analytics tracking (if implemented)
        this.trackFilterUsage(filter);
    }

    filterImages(filter) {
        this.photoItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const shouldShow = filter === 'all' || itemCategory === filter;
            
            if (shouldShow) {
                item.classList.remove('hidden');
                item.style.display = '';
                // Re-trigger lazy loading for newly visible images
                this.checkImageVisibility(item);
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });

        // Smooth scroll to top of gallery after filtering
        this.scrollToGallery();
    }

    handleImageClick(event) {
        const photoItem = event.currentTarget;
        const img = photoItem.querySelector('img');
        
        if (!img || !img.src) return;
        
        // Simple image viewing - could be enhanced with a lightbox
        this.openImageModal(img);
    }

    openImageModal(img) {
        // Create a simple modal overlay
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" aria-label="Close image modal">
                <button class="modal-close" aria-label="Close image modal">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
                <img src="${img.src}" alt="${img.alt}" class="modal-image">
                <div class="modal-caption">
                    <h3>${img.alt}</h3>
                </div>
            </div>
        `;

        // Add modal styles
        this.addModalStyles();
        
        // Add to DOM
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const closeButton = modal.querySelector('.modal-close');
        closeButton.focus();
        
        // Event listeners
        const closeModal = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        };
        
        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });
        
        // Keyboard support
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    addModalStyles() {
        if (document.getElementById('modal-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
            }
            
            .modal-backdrop {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .modal-close {
                position: absolute;
                top: -50px;
                right: -10px;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                color: white;
                cursor: pointer;
                font-size: 1.2rem;
                transition: background 0.3s ease;
                z-index: 1001;
            }
            
            .modal-close:hover,
            .modal-close:focus {
                background: rgba(255, 255, 255, 0.3);
                outline: 2px solid white;
            }
            
            .modal-image {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            
            .modal-caption {
                margin-top: 20px;
                text-align: center;
                color: white;
                max-width: 500px;
            }
            
            .modal-caption h3 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 500;
            }
        `;
        
        document.head.appendChild(styles);
    }

    setupLazyLoading() {
        // Use Intersection Observer for performance
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images
            this.photoItems.forEach(item => {
                const img = item.querySelector('img');
                if (img) {
                    imageObserver.observe(img);
                }
            });
        } else {
            // Fallback for older browsers
            this.photoItems.forEach(item => {
                this.checkImageVisibility(item);
            });
        }
    }

    loadImage(img) {
        if (img.dataset.loaded) return;
        
        const parentItem = img.closest('.photo-item');
        parentItem.classList.add('loading');
        
        // Create a new image to test loading
        const testImg = new Image();
        testImg.onload = () => {
            img.src = testImg.src;
            img.dataset.loaded = 'true';
            parentItem.classList.remove('loading');
        };
        
        testImg.onerror = () => {
            this.handleImageError(img);
            parentItem.classList.remove('loading');
        };
        
        testImg.src = img.src;
    }

    checkImageVisibility(item) {
        const img = item.querySelector('img');
        if (!img || img.dataset.loaded) return;
        
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            this.loadImage(img);
        }
    }

    setupImageErrorHandling() {
        this.photoItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                img.addEventListener('error', () => {
                    this.handleImageError(img);
                });
            }
        });
    }

    handleImageError(img) {
        const parentItem = img.closest('.photo-item');
        parentItem.style.display = 'none';
        
        // Log error for debugging
        console.warn(`Failed to load image: ${img.src}`);
    }

    setupKeyboardNavigation() {
        // Make photo items focusable for keyboard navigation
        this.photoItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View photo ${index + 1}: ${item.querySelector('img')?.alt || 'Photo'}`);
        });
    }

    preloadCriticalImages() {
        // Preload first few visible images for better perceived performance
        const criticalItems = Array.from(this.photoItems).slice(0, 6);
        criticalItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                this.loadImage(img);
            }
        });
    }

    scrollToGallery() {
        const gallery = document.querySelector('.photo-grid');
        if (gallery) {
            gallery.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }
    }

    handleResize() {
        // Recalculate any layout-dependent features
        this.photoItems.forEach(item => {
            if (!item.classList.contains('hidden')) {
                this.checkImageVisibility(item);
            }
        });
    }

    trackFilterUsage(filter) {
        // Analytics tracking - replace with your preferred analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', 'filter_photos', {
                'event_category': 'Gallery',
                'event_label': filter,
                'value': 1
            });
        }
        
        // Console log for development
        console.log(`Filter applied: ${filter}`);
    }
}

// Performance optimization: Load gallery only when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PhotoGallery();
    });
} else {
    new PhotoGallery();
}

// Export for potential external usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhotoGallery;
}

// Add service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
