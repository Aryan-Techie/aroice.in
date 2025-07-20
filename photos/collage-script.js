/**
 * Aroice Photo Collage - Shuffled Gallery Script
 * Creates a randomized photo collage that reshuffles on each page load
 */

class PhotoCollage {
    constructor() {
        this.photoContainer = document.querySelector('.photo-collage');
        this.photos = [];
        this.currentModal = null;
        
        this.initializePhotos();
        this.createCollage();
        this.setupEventListeners();
    }

    initializePhotos() {
        // Photo data array with titles and years
        this.photos = [
            {
                src: './album/aryan-techie-iit-patna-campus-standing-2025.jpg',
                alt: 'Aryan at IIT Patna campus',
                title: 'Campus Portrait',
                year: '2025'
            },
            {
                src: './album/aryan-techie-formal-fit-mirror-portrait-2025.jpg',
                alt: 'Professional portrait in mirror',
                title: 'Formal Mirror Portrait',
                year: '2025'
            },
            {
                src: './album/aryan-techie-reading-in-library-2025.jpg',
                alt: 'Reading in library',
                title: 'Library Study Session',
                year: '2025'
            },
            {
                src: './album/aryan-techie-laptop-setup-grind-late-night-2025.jpg',
                alt: 'Late night coding session',
                title: 'Late Night Coding',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airforce-plane-background-sitting-2025.jpg',
                alt: 'Aviation themed portrait',
                title: 'Aviation Dreams',
                year: '2025'
            },
            {
                src: './album/aryan-techie-plane-window-aesthetic-lookout-2025.jpg',
                alt: 'Looking out airplane window',
                title: 'Sky High Views',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airport-working-nomad-style-2025.png',
                alt: 'Digital nomad at airport',
                title: 'Digital Nomad Life',
                year: '2025'
            },
            {
                src: './album/aryan-techie-dual-color-portrait-editorial-2025.webp',
                alt: 'Editorial portrait with dual colors',
                title: 'Dual Color Editorial',
                year: '2025'
            },
            {
                src: './album/aryan-techie-shadow-wall-portrait-artistic.jpg',
                alt: 'Artistic shadow portrait',
                title: 'Shadow Play',
                year: '2024'
            },
            {
                src: './album/aryan-techie-back-profile-edited-glow-effect-2025.jpg',
                alt: 'Back profile with glow effect',
                title: 'Golden Hour Glow',
                year: '2025'
            },
            {
                src: './album/aryan-techie-mirror-selfie-blackwhite-2025.webp',
                alt: 'Black and white mirror selfie',
                title: 'Monochrome Reflection',
                year: '2025'
            },
            {
                src: './album/aryan-techie-cafe-glass-reflection-indoors.jpg',
                alt: 'Cafe reflection shot',
                title: 'Cafe Contemplation',
                year: '2024'
            },
            {
                src: './album/aryan-techie-near-window-indoor-light-portrait-2025.png',
                alt: 'Natural light portrait',
                title: 'Natural Light Portrait',
                year: '2025'
            },
            {
                src: './album/aryan-techie-group-selfie-smiling-2025.jpg',
                alt: 'Group selfie with friends',
                title: 'Friends Forever',
                year: '2025'
            },
            {
                src: './album/aryan-techie-aroice-with-yash-iit-patna-2025.jpg',
                alt: 'With friend at IIT Patna',
                title: 'Campus Friendship',
                year: '2025'
            },
            {
                src: './album/aryan-techie-friends-campus-iit.jpg',
                alt: 'Campus friends',
                title: 'Squad Goals',
                year: '2024'
            },
            {
                src: './album/aryan-techie-speaking-on-stage-2025.jpg',
                alt: 'Speaking on stage',
                title: 'Speaking Engagement',
                year: '2025'
            },
            {
                src: './album/aryan-techie-whiteboard-presentation-snap.jpg',
                alt: 'Teaching moment',
                title: 'Teaching Session',
                year: '2024'
            },
            {
                src: './album/aryan-techie-roadside-sunset-glasses-iitp-iit-2025.jpg',
                alt: 'Golden hour portrait',
                title: 'Sunset Vibes',
                year: '2025'
            },
            {
                src: './album/aryan-techie-swimming-pool-fun-2025.jpg',
                alt: 'Pool day fun',
                title: 'Pool Day',
                year: '2025'
            },
            {
                src: './album/aryan-techie-winter-cap-campus-portrait-iit-patna-2025.jpg',
                alt: 'Winter campus portrait',
                title: 'Winter Campus',
                year: '2025'
            },
            {
                src: './album/aryan-techie-with-book-stack-headphones-2025.jpg',
                alt: 'Study session with books',
                title: 'Study Mode',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airplane-sitting-wide-2025.jpg',
                alt: 'Airplane travel',
                title: 'Flight Journey',
                year: '2025'
            },
            {
                src: './album/aryan-techie-below-shot-lightflare-moody-car-2025.jpg',
                alt: 'Moody car portrait',
                title: 'Moody Car Shot',
                year: '2025'
            },
            {
                src: './album/aryan-techie-blindfold-risk-poster-style-2025.jpg',
                alt: 'Artistic poster style',
                title: 'Poster Style',
                year: '2025'
            },
            {
                src: './album/aryan-techie-books-closeup-intense-read-2025.png',
                alt: 'Intense reading moment',
                title: 'Deep Focus',
                year: '2025'
            },
            {
                src: './album/aryan-techie-campus-corridor-side-glance-gym-gymkhana-iit.jpg',
                alt: 'Campus corridor portrait',
                title: 'Campus Corridor',
                year: '2024'
            },
            {
                src: './album/aryan-techie-candid-indoors-eyeglasses-airport.jpg',
                alt: 'Candid airport moment',
                title: 'Airport Candid',
                year: '2024'
            },
            {
                src: './album/aryan-techie-closeup-watch-side-glance-aeroplane.jpg',
                alt: 'Travel watch closeup',
                title: 'Time to Fly',
                year: '2024'
            },
            {
                src: './album/aryan-techie-crowd-selfie-hyperreal-2025.jpg',
                alt: 'Crowd selfie moment',
                title: 'Crowd Moment',
                year: '2025'
            },
            {
                src: './album/aryan-techie-duo-plane-travel-look.jpg',
                alt: 'Travel duo shot',
                title: 'Travel Duo',
                year: '2024'
            },
            {
                src: './album/aryan-techie-eyestore-shot.jpg',
                alt: 'Eyewear store visit',
                title: 'Eyewear Shopping',
                year: '2024'
            },
            {
                src: './album/aryan-techie-face-close-hand-cover-style.jpg',
                alt: 'Artistic hand cover pose',
                title: 'Artistic Portrait',
                year: '2024'
            },
            {
                src: './album/aryan-techie-finger-candid-friends-aeroplane-flight-2025.jpg',
                alt: 'Flight candid moment',
                title: 'Flight Candid',
                year: '2025'
            },
            {
                src: './album/aryan-techie-friends-iit-runway.jpg',
                alt: 'Runway with friends',
                title: 'Runway Squad',
                year: '2024'
            },
            {
                src: './album/aryan-techie-mirror-photo-eyewear-store.jpg',
                alt: 'Mirror shot at eyewear store',
                title: 'Mirror Reflection',
                year: '2024'
            },
            {
                src: './album/aryan-techie-seated-iit-campus-2025.jpg',
                alt: 'Seated campus portrait',
                title: 'Campus Relaxed',
                year: '2025'
            },
            {
                src: './album/aryan-techie-shirt-mirror-hallway-2025.jpg',
                alt: 'Hallway mirror shot',
                title: 'Hallway Mirror',
                year: '2025'
            },
            {
                src: './album/aryan-techie-side-light-dramatic-god-text.jpg',
                alt: 'Dramatic side lighting',
                title: 'Dramatic Lighting',
                year: '2024'
            },
            {
                src: './album/aryan-techie-side-mirror-drive-mood.jpg',
                alt: 'Car mirror mood shot',
                title: 'Drive Mode',
                year: '2024'
            },
            {
                src: './album/aryan-techie-sitting-chilled-indoor-shot.jpg',
                alt: 'Relaxed indoor moment',
                title: 'Chill Vibes',
                year: '2024'
            },
            {
                src: './album/aryan-techie-sitting-yellow-barrier-iit-campus-2025.jpg',
                alt: 'Campus barrier portrait',
                title: 'Campus Barriers',
                year: '2025'
            },
            {
                src: './album/aryan-techie-smiling-airforce.jpg',
                alt: 'Smiling airforce portrait',
                title: 'Airforce Smile',
                year: '2024'
            },
            {
                src: './album/aryan-techie-standing-iit-patna-signboard-2025.jpg',
                alt: 'IIT Patna signboard',
                title: 'IIT Patna Pride',
                year: '2025'
            },
            {
                src: './album/aryan-techie-sunset-walk-flyover-view.jpg',
                alt: 'Sunset flyover walk',
                title: 'Sunset Walk',
                year: '2024'
            },
            {
                src: './album/aryan-techie-upward-look-palm-tree-vibe-iit.jpg',
                alt: 'Palm tree campus vibe',
                title: 'Palm Tree Dreams',
                year: '2024'
            },
            {
                src: './album/aryan-techie-white-shirt-mirror-cleanlook.jpg',
                alt: 'Clean white shirt look',
                title: 'Clean Look',
                year: '2024'
            },
            {
                src: './album/aryan-techie-window-look-light-contrast-train.jpg',
                alt: 'Train window lighting',
                title: 'Train Journey',
                year: '2024'
            },
            {
                src: './album/aryan-techie-with-friend-airforce-plane-2025.jpg',
                alt: 'Airforce plane with friend',
                title: 'Airforce Adventure',
                year: '2025'
            },
            {
                src: './album/aryan-techie-with-friend-winter-2024.jpg.jpg',
                alt: 'Winter moment with friend',
                title: 'Winter Friendship',
                year: '2024'
            }
        ];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    createCollage() {
        // Shuffle photos on each load
        const shuffledPhotos = this.shuffleArray(this.photos);
        
        // Clear existing content
        this.photoContainer.innerHTML = '';
        
        // Progressive loading for better mobile performance
        const isMobile = window.innerWidth <= 768;
        const batchSize = isMobile ? 10 : 15;
        let loadedCount = 0;
        
        const loadBatch = (startIndex) => {
            const endIndex = Math.min(startIndex + batchSize, shuffledPhotos.length);
            const batch = shuffledPhotos.slice(startIndex, endIndex);
            
            batch.forEach((photo, index) => {
                const photoItem = this.createPhotoElement(photo, startIndex + index);
                this.photoContainer.appendChild(photoItem);
            });
            
            loadedCount = endIndex;
            
            // Load next batch if there are more photos
            if (loadedCount < shuffledPhotos.length) {
                setTimeout(() => loadBatch(loadedCount), isMobile ? 200 : 100);
            }
        };
        
        // Start loading
        loadBatch(0);
        
        // Setup lazy loading after creating elements
        setTimeout(() => this.setupLazyLoading(), 150);
    }

    createPhotoElement(photo, index) {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item loading';
        photoItem.setAttribute('tabindex', '0');
        photoItem.setAttribute('role', 'button');
        photoItem.setAttribute('aria-label', `View photo: ${photo.alt}`);
        
        // Set a minimum height to prevent layout shift
        photoItem.style.minHeight = '280px';
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = 'lazy';
        
        // Store photo data for modal
        photoItem.dataset.title = photo.title;
        photoItem.dataset.year = photo.year;
        
        img.addEventListener('load', () => {
            photoItem.classList.remove('loading');
            photoItem.style.minHeight = 'auto';
            this.adjustImageDisplay(img);
        });
        
        img.addEventListener('error', () => {
            photoItem.style.display = 'none';
        });
        
        photoItem.appendChild(img);
        
        return photoItem;
    }

    adjustImageDisplay(img) {
        // Ensure aspect ratio is maintained
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        // Add a subtle random rotation for more organic feel (reduced range)
        const rotation = (Math.random() - 0.5) * 0.8; // -0.4 to 0.4 degree
        img.style.transform = `rotate(${rotation}deg)`;
        
        // Ensure image maintains its natural proportions
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        
        // Smooth staggered loading effect
        const delay = Math.random() * 400;
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform += ' translateY(0) scale(1)';
        }, delay);
    }

    setupEventListeners() {
        // Photo click/keyboard events
        this.photoContainer.addEventListener('click', (e) => {
            const photoItem = e.target.closest('.photo-item');
            if (photoItem) {
                this.openModal(photoItem);
            }
        });

        this.photoContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const photoItem = e.target.closest('.photo-item');
                if (photoItem) {
                    e.preventDefault();
                    this.openModal(photoItem);
                }
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });

        // Touch events for better mobile experience
        let touchStartY = 0;
        document.addEventListener('touchstart', (e) => {
            if (this.currentModal) {
                touchStartY = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (this.currentModal) {
                const touchY = e.touches[0].clientY;
                const deltaY = touchY - touchStartY;
                
                // Close modal if swiped down significantly
                if (deltaY > 100) {
                    this.closeModal();
                }
            }
        });

        // Add visual feedback for touch devices
        this.photoContainer.addEventListener('touchstart', (e) => {
            const photoItem = e.target.closest('.photo-item');
            if (photoItem) {
                photoItem.style.transform = 'translateY(-2px) scale(0.98)';
            }
        });

        this.photoContainer.addEventListener('touchend', (e) => {
            const photoItem = e.target.closest('.photo-item');
            if (photoItem) {
                setTimeout(() => {
                    photoItem.style.transform = '';
                }, 150);
            }
        });
    }

    openModal(photoItem) {
        const img = photoItem.querySelector('img');
        if (!img || !img.src) return;

        const title = photoItem.dataset.title || 'Untitled';
        const year = photoItem.dataset.year || '2024';

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.className = 'modal-image';
        
        const modalInfo = document.createElement('div');
        modalInfo.className = 'modal-info';
        
        const modalTitle = document.createElement('h2');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = title;
        
        const modalYear = document.createElement('p');
        modalYear.className = 'modal-year';
        modalYear.textContent = year;
        
        modalInfo.appendChild(modalTitle);
        modalInfo.appendChild(modalYear);
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close image');
        closeBtn.type = 'button';
        
        // Append elements
        modalContent.appendChild(modalImg);
        modalContent.appendChild(modalInfo);
        modal.appendChild(modalContent);
        modal.appendChild(closeBtn);
        
        // Add to DOM
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
        
        // Focus management
        closeBtn.focus();
        
        // Event listeners
        const closeModal = () => this.closeModal();
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        this.currentModal = modal;
    }

    closeModal() {
        if (!this.currentModal) return;
        
        this.currentModal.classList.remove('active');
        
        setTimeout(() => {
            if (this.currentModal && this.currentModal.parentNode) {
                document.body.removeChild(this.currentModal);
                document.body.style.overflow = '';
                this.currentModal = null;
            }
        }, 600); // Match the CSS transition duration
    }

    setupLazyLoading() {
        // Use Intersection Observer for performance
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe images
            const images = this.photoContainer.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PhotoCollage();
    });
} else {
    new PhotoCollage();
}

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js')
            .catch(() => {
                // Silently fail if no service worker
            });
    });
}
