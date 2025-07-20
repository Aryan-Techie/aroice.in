/**
 * Aroice Photo Collage - Shuffled Gallery Script
 * Creates a randomized photo collage that reshuffles on each page load
 */

class PhotoCollage {
    constructor() {
        this.photoContainer = document.querySelector('.photo-collage');
        this.photos = [];
        this.currentModal = null;
        this.loadedPhotos = 0;
        this.isLoading = false;
        this.photosPerLoad = 12; // Instagram-like loading
        this.intersectionObserver = null;
        
        // Store global reference for cleanup
        window.photoCollageInstance = this;
        
        this.initializePhotos();
        this.createCollage();
        this.setupEventListeners();
        this.setupInfiniteScroll();
        this.disableRightClick();
        this.initializeHeaderControls();
        this.updatePhotoCounter();
    }

    initializePhotos() {
        // Photo data array with titles and years
        this.photos = [
            {
                src: './album/aryan-techie-iit-patna-campus-standing-2025.webp',
                alt: 'Aryan at IIT Patna campus',
                title: 'Campus Portrait',
                year: '2025'
            },
            {
                src: './album/aryan-techie-formal-fit-mirror-portrait-2025.webp',
                alt: 'Professional portrait in mirror',
                title: 'Formal Mirror Portrait',
                year: '2025'
            },
            {
                src: './album/aryan-techie-reading-in-library-2025.webp',
                alt: 'Reading in library',
                title: 'Library Study Session',
                year: '2025'
            },
            {
                src: './album/aryan-techie-laptop-setup-grind-late-night-2025.webp',
                alt: 'Late night coding session',
                title: 'Late Night Coding',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airforce-plane-background-sitting-2025.webp',
                alt: 'Aviation themed portrait',
                title: 'Aviation Dreams',
                year: '2025'
            },
            {
                src: './album/aryan-techie-plane-window-aesthetic-lookout-2025.webp',
                alt: 'Looking out airplane window',
                title: 'Sky High Views',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airport-working-nomad-style-2025.webp',
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
                src: './album/aryan-techie-shadow-wall-portrait-artistic.webp',
                alt: 'Artistic shadow portrait',
                title: 'Shadow Play',
                year: '2024'
            },
            {
                src: './album/aryan-techie-back-profile-edited-glow-effect-2025.webp',
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
                src: './album/aryan-techie-cafe-glass-reflection-indoors.webp',
                alt: 'Cafe reflection shot',
                title: 'Cafe Contemplation',
                year: '2024'
            },
            {
                src: './album/aryan-techie-near-window-indoor-light-portrait-2025.webp',
                alt: 'Natural light portrait',
                title: 'Natural Light Portrait',
                year: '2025'
            },
            {
                src: './album/aryan-techie-group-selfie-smiling-2025.webp',
                alt: 'Group selfie with friends',
                title: 'Friends Forever',
                year: '2025'
            },
            {
                src: './album/aryan-techie-aroice-with-yash-iit-patna-2025.webp',
                alt: 'With friend at IIT Patna',
                title: 'Campus Friendship',
                year: '2025'
            },
            {
                src: './album/aryan-techie-friends-campus-iit.webp',
                alt: 'Campus friends',
                title: 'Squad Goals',
                year: '2024'
            },
            {
                src: './album/aryan-techie-speaking-on-stage-2025.webp',
                alt: 'Speaking on stage',
                title: 'Speaking Engagement',
                year: '2025'
            },
            {
                src: './album/aryan-techie-whiteboard-presentation-snap.webp',
                alt: 'Teaching moment',
                title: 'Teaching Session',
                year: '2024'
            },
            {
                src: './album/aryan-techie-roadside-sunset-glasses-iitp-iit-2025.webp',
                alt: 'Golden hour portrait',
                title: 'Sunset Vibes',
                year: '2025'
            },
            {
                src: './album/aryan-techie-swimming-pool-fun-2025.webp',
                alt: 'Pool day fun',
                title: 'Pool Day',
                year: '2025'
            },
            {
                src: './album/aryan-techie-winter-cap-campus-portrait-iit-patna-2025.webp',
                alt: 'Winter campus portrait',
                title: 'Winter Campus',
                year: '2025'
            },
            {
                src: './album/aryan-techie-with-book-stack-headphones-2025.webp',
                alt: 'Study session with books',
                title: 'Study Mode',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airplane-sitting-wide-2025.webp',
                alt: 'Airplane travel',
                title: 'Flight Journey',
                year: '2025'
            },
            {
                src: './album/aryan-techie-below-shot-lightflare-moody-car-2025.webp',
                alt: 'Moody car portrait',
                title: 'Moody Car Shot',
                year: '2025'
            },
            {
                src: './album/aryan-techie-blindfold-risk-poster-style-2025.webp',
                alt: 'Artistic poster style',
                title: 'Poster Style',
                year: '2025'
            },
            {
                src: './album/aryan-techie-books-closeup-intense-read-2025.webp',
                alt: 'Intense reading moment',
                title: 'Deep Focus',
                year: '2025'
            },
            {
                src: './album/aryan-techie-campus-corridor-side-glance-gym-gymkhana-iit.webp',
                alt: 'Campus corridor portrait',
                title: 'Campus Corridor',
                year: '2024'
            },
            {
                src: './album/aryan-techie-candid-indoors-eyeglasses-airport.webp',
                alt: 'Candid airport moment',
                title: 'Airport Candid',
                year: '2024'
            },
            {
                src: './album/aryan-techie-closeup-watch-side-glance-aeroplane.webp',
                alt: 'Travel watch closeup',
                title: 'Time to Fly',
                year: '2024'
            },
            {
                src: './album/aryan-techie-crowd-selfie-hyperreal-2025.webp',
                alt: 'Crowd selfie moment',
                title: 'Crowd Moment',
                year: '2025'
            },
            {
                src: './album/aryan-techie-duo-plane-travel-look.webp',
                alt: 'Travel duo shot',
                title: 'Travel Duo',
                year: '2024'
            },
            {
                src: './album/aryan-techie-eyestore-shot.webp',
                alt: 'Eyewear store visit',
                title: 'Eyewear Shopping',
                year: '2024'
            },
            {
                src: './album/aryan-techie-face-close-hand-cover-style.webp',
                alt: 'Artistic hand cover pose',
                title: 'Artistic Portrait',
                year: '2024'
            },
            {
                src: './album/aryan-techie-finger-candid-friends-aeroplane-flight-2025.webp',
                alt: 'Flight candid moment',
                title: 'Flight Candid',
                year: '2025'
            },
            {
                src: './album/aryan-techie-friends-iit-runway.webp',
                alt: 'Runway with friends',
                title: 'Runway Squad',
                year: '2024'
            },
            {
                src: './album/aryan-techie-mirror-photo-eyewear-store.webp',
                alt: 'Mirror shot at eyewear store',
                title: 'Mirror Reflection',
                year: '2024'
            },
            {
                src: './album/aryan-techie-seated-iit-campus-2025.webp',
                alt: 'Seated campus portrait',
                title: 'Campus Relaxed',
                year: '2025'
            },
            {
                src: './album/aryan-techie-shirt-mirror-hallway-2025.webp',
                alt: 'Hallway mirror shot',
                title: 'Hallway Mirror',
                year: '2025'
            },
            {
                src: './album/aryan-techie-side-light-dramatic-god-text.webp',
                alt: 'Dramatic side lighting',
                title: 'Dramatic Lighting',
                year: '2024'
            },
            {
                src: './album/aryan-techie-side-mirror-drive-mood.webp',
                alt: 'Car mirror mood shot',
                title: 'Drive Mode',
                year: '2024'
            },
            {
                src: './album/aryan-techie-sitting-chilled-indoor-shot.webp',
                alt: 'Relaxed indoor moment',
                title: 'Chill Vibes',
                year: '2024'
            },
            {
                src: './album/aryan-techie-sitting-yellow-barrier-iit-campus-2025.webp',
                alt: 'Campus barrier portrait',
                title: 'Campus Barriers',
                year: '2025'
            },
            {
                src: './album/aryan-techie-smiling-airforce.webp',
                alt: 'Smiling airforce portrait',
                title: 'Airforce Smile',
                year: '2024'
            },
            {
                src: './album/aryan-techie-standing-iit-patna-signboard-2025.webp',
                alt: 'IIT Patna signboard',
                title: 'IIT Patna Pride',
                year: '2025'
            },
            {
                src: './album/aryan-techie-sunset-walk-flyover-view.webp',
                alt: 'Sunset flyover walk',
                title: 'Sunset Walk',
                year: '2024'
            },
            {
                src: './album/aryan-techie-upward-look-palm-tree-vibe-iit.webp',
                alt: 'Palm tree campus vibe',
                title: 'Palm Tree Dreams',
                year: '2024'
            },
            {
                src: './album/aryan-techie-white-shirt-mirror-cleanlook.webp',
                alt: 'Clean white shirt look',
                title: 'Clean Look',
                year: '2024'
            },
            {
                src: './album/aryan-techie-window-look-light-contrast-train.webp',
                alt: 'Train window lighting',
                title: 'Train Journey',
                year: '2024'
            },
            {
                src: './album/aryan-techie-with-friend-airforce-plane-2025.webp',
                alt: 'Airforce plane with friend',
                title: 'Airforce Adventure',
                year: '2025'
            },
            {
                src: './album/aryan-techie-with-friend-winter-2024.webp.webp',
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
        this.shuffledPhotos = this.shuffleArray(this.photos);
        
        // Clear existing content
        this.photoContainer.innerHTML = '';
        this.loadedPhotos = 0;
        
        // Load initial batch (Instagram-style)
        this.loadMorePhotos();
    }

    loadMorePhotos() {
        if (this.isLoading || this.loadedPhotos >= this.shuffledPhotos.length) {
            return;
        }

        this.isLoading = true;
        this.showLoadingIndicator();

        const startIndex = this.loadedPhotos;
        const endIndex = Math.min(startIndex + this.photosPerLoad, this.shuffledPhotos.length);
        const batch = this.shuffledPhotos.slice(startIndex, endIndex);

        // Simulate network delay for smoother experience (like Instagram)
        setTimeout(() => {
            batch.forEach((photo, index) => {
                const photoItem = this.createPhotoElement(photo, startIndex + index);
                this.photoContainer.appendChild(photoItem);
                
                // Stagger the appearance for smooth loading effect
                setTimeout(() => {
                    photoItem.style.opacity = '1';
                    photoItem.style.transform = 'translateY(0)';
                }, index * 50);
            });

            this.loadedPhotos = endIndex;
            this.isLoading = false;
            this.hideLoadingIndicator();
            
            // Update header controls
            this.updatePhotoCounter();
            this.updateProgressBar();

            // Setup lazy loading for new images
            this.setupLazyLoading();
        }, 300);
    }

    showLoadingIndicator() {
        const existingLoader = document.querySelector('.infinite-loader');
        if (existingLoader) return;

        const loader = document.createElement('div');
        loader.className = 'infinite-loader';
        loader.innerHTML = `
            <div class="loader-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;
        
        this.photoContainer.parentNode.appendChild(loader);
        
        // Add loader styles if not already present
        if (!document.getElementById('infinite-loader-styles')) {
            const styles = document.createElement('style');
            styles.id = 'infinite-loader-styles';
            styles.textContent = `
                .infinite-loader {
                    display: flex;
                    justify-content: center;
                    padding: 40px 20px;
                    width: 100%;
                }
                
                .loader-dots {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
                
                .dot {
                    width: 8px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    animation: dotPulse 1.4s ease-in-out infinite both;
                }
                
                .dot:nth-child(1) { animation-delay: -0.32s; }
                .dot:nth-child(2) { animation-delay: -0.16s; }
                .dot:nth-child(3) { animation-delay: 0s; }
                
                @keyframes dotPulse {
                    0%, 80%, 100% {
                        transform: scale(0.8);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }

    hideLoadingIndicator() {
        const loader = document.querySelector('.infinite-loader');
        if (loader) {
            loader.remove();
        }
    }

    setupInfiniteScroll() {
        // Create intersection observer for infinite scroll
        const options = {
            root: null,
            rootMargin: '200px',
            threshold: 0.1
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoading && this.loadedPhotos < this.shuffledPhotos.length) {
                    this.loadMorePhotos();
                }
            });
        }, options);

        // Create a sentinel element at the bottom
        const sentinel = document.createElement('div');
        sentinel.className = 'scroll-sentinel';
        sentinel.style.height = '1px';
        sentinel.style.width = '100%';
        this.photoContainer.parentNode.appendChild(sentinel);
        
        this.intersectionObserver.observe(sentinel);
    }

    disableRightClick() {
        // Disable right-click context menu on images
        this.photoContainer.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG' || e.target.closest('.photo-item')) {
                e.preventDefault();
                return false;
            }
        });

        // Disable drag on images for better UX
        this.photoContainer.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });

        // Disable text selection on image containers
        this.photoContainer.addEventListener('selectstart', (e) => {
            if (e.target.closest('.photo-item')) {
                e.preventDefault();
                return false;
            }
        });
    }

    createPhotoElement(photo, index) {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item loading';
        photoItem.setAttribute('tabindex', '0');
        photoItem.setAttribute('role', 'button');
        photoItem.setAttribute('aria-label', `View photo: ${photo.alt}`);
        
        // SEO: Add structured data for images
        photoItem.setAttribute('itemscope', '');
        photoItem.setAttribute('itemtype', 'https://schema.org/ImageObject');
        
        // Set initial state for stable layout
        photoItem.style.opacity = '0';
        photoItem.style.transform = 'translateY(30px)';
        photoItem.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = 'lazy';
        
        // SEO: Enhanced meta attributes for search engines
        img.setAttribute('itemprop', 'contentUrl');
        img.setAttribute('data-title', photo.title);
        img.setAttribute('data-year', photo.year);
        
        // Store photo data for modal and SEO
        photoItem.dataset.title = photo.title;
        photoItem.dataset.year = photo.year;
        photoItem.dataset.src = photo.src;
        
        // Add hidden structured data for SEO
        const metaData = document.createElement('meta');
        metaData.setAttribute('itemprop', 'name');
        metaData.setAttribute('content', `${photo.title} - ${photo.year}`);
        photoItem.appendChild(metaData);
        
        const metaDescription = document.createElement('meta');
        metaDescription.setAttribute('itemprop', 'description');
        metaDescription.setAttribute('content', photo.alt);
        photoItem.appendChild(metaDescription);
        
        img.addEventListener('load', () => {
            photoItem.classList.remove('loading');
            this.adjustImageDisplay(img, photoItem);
        });
        
        img.addEventListener('error', () => {
            photoItem.style.display = 'none';
        });
        
        photoItem.appendChild(img);
        
        return photoItem;
    }

    adjustImageDisplay(img, photoItem) {
        // Get responsive grid settings based on viewport width
        const gridSettings = this.getGridSettings();
        
        // Wait for image to fully load and get actual dimensions
        setTimeout(() => {
            const imageHeight = img.offsetHeight;
            const rowSpan = Math.ceil((imageHeight + gridSettings.gap) / (gridSettings.rowHeight + gridSettings.gap));
            
            // Apply the row span to create masonry effect
            photoItem.style.gridRowEnd = `span ${rowSpan}`;
        }, 50); // Small delay to ensure image is rendered
        
        // Ensure image maintains proper display
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.objectFit = 'cover';
        
        // Add subtle organic feel without affecting layout
        const rotation = (Math.random() - 0.5) * 0.4;
        img.style.transform = `rotate(${rotation}deg)`;
        
        // Smooth reveal animation
        const delay = Math.random() * 200;
        setTimeout(() => {
            photoItem.style.opacity = '1';
            photoItem.style.transform = 'translateY(0)';
        }, delay);
    }

    getGridSettings() {
        // Return grid settings based on current viewport width
        const width = window.innerWidth;
        
        if (width <= 380) {
            return { gap: 4, rowHeight: 4 };
        } else if (width <= 480) {
            return { gap: 6, rowHeight: 5 };
        } else if (width <= 600) {
            return { gap: 8, rowHeight: 6 };
        } else if (width <= 768) {
            return { gap: 8, rowHeight: 6 };
        } else if (width <= 900) {
            return { gap: 10, rowHeight: 8 };
        } else if (width <= 1200) {
            return { gap: 12, rowHeight: 8 };
        } else {
            return { gap: 16, rowHeight: 10 };
        }
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

        // Window resize handler for responsive masonry layout
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.recalculateMasonryLayout();
            }, 250);
        });
    }

    recalculateMasonryLayout() {
        // Recalculate masonry layout for all loaded images
        const allPhotoItems = this.photoContainer.querySelectorAll('.photo-item:not(.loading)');
        const gridSettings = this.getGridSettings();
        
        allPhotoItems.forEach(photoItem => {
            const img = photoItem.querySelector('img');
            if (img && img.complete) {
                setTimeout(() => {
                    const imageHeight = img.offsetHeight;
                    const rowSpan = Math.ceil((imageHeight + gridSettings.gap) / (gridSettings.rowHeight + gridSettings.gap));
                    photoItem.style.gridRowEnd = `span ${rowSpan}`;
                }, 50);
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
        // Enhanced lazy loading for infinite scroll
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src && !img.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.01
            });

            // Observe all images in the current batch
            const images = this.photoContainer.querySelectorAll('img:not([data-observed])');
            images.forEach(img => {
                img.setAttribute('data-observed', 'true');
                imageObserver.observe(img);
            });
        }
    }

    initializeHeaderControls() {
        // Shuffle button functionality
        const shuffleBtn = document.querySelector('.shuffle-btn');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                this.shuffleGallery();
            });
        }

        // Fullscreen button functionality
        const fullscreenBtn = document.querySelector('.fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        // Listen for fullscreen changes to update button icon
        document.addEventListener('fullscreenchange', () => {
            this.updateFullscreenButton();
        });
    }

    shuffleGallery() {
        // Add loading effect
        this.showLoadingIndicator();
        
        // Animate out current photos
        const currentPhotos = this.photoContainer.querySelectorAll('.photo-item');
        currentPhotos.forEach((photo, index) => {
            setTimeout(() => {
                photo.style.opacity = '0';
                photo.style.transform = 'translateY(20px) scale(0.95)';
            }, index * 30);
        });

        // After animation, recreate gallery
        setTimeout(() => {
            this.createCollage();
            this.hideLoadingIndicator();
        }, currentPhotos.length * 30 + 300);
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    updateFullscreenButton() {
        const fullscreenBtn = document.querySelector('.fullscreen-btn i');
        if (fullscreenBtn) {
            if (document.fullscreenElement) {
                fullscreenBtn.className = 'fas fa-compress';
                fullscreenBtn.parentElement.title = 'Exit Fullscreen';
            } else {
                fullscreenBtn.className = 'fas fa-expand';
                fullscreenBtn.parentElement.title = 'Toggle Fullscreen';
            }
        }
    }

    updatePhotoCounter() {
        const loadedElement = document.getElementById('photos-loaded');
        const totalElement = document.getElementById('total-photos');
        
        if (loadedElement && totalElement) {
            loadedElement.textContent = this.loadedPhotos;
            totalElement.textContent = this.photos.length;
        }
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const progress = (this.loadedPhotos / this.photos.length) * 100;
            progressBar.style.width = `${progress}%`;
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

// Performance optimization: Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Clean up observers and event listeners
    if (window.photoCollageInstance && window.photoCollageInstance.intersectionObserver) {
        window.photoCollageInstance.intersectionObserver.disconnect();
    }
});

// Global instance for cleanup
window.photoCollageInstance = null;
