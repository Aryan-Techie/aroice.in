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
        
        // Search functionality properties
        this.searchOverlay = null;
        this.searchInput = null;
        this.searchResults = [];
        this.currentFilter = 'all';
        this.currentSort = 'relevance';
        
        // Store global reference for cleanup
        window.photoCollageInstance = this;
        
        this.initializePhotos();
        this.createCollage();
        this.setupEventListeners();
        this.setupInfiniteScroll();
        this.disableRightClick();
        this.initializeHeaderControls();
        this.initializeSearch();
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
                title: 'on the way',
                year: '2025'
            },
            {
                src: './album/aryan-techie-reading-in-library-2025.webp',
                alt: 'Reading in my library',
                title: 'With My Books',
                year: '2025'
            },
            {
                src: './album/aryan-techie-laptop-setup-grind-late-night-2025.webp',
                alt: 'Late night coding session',
                title: 'Late Night',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airforce-plane-background-sitting-2025.webp',
                alt: 'captured moment with my bro',
                title: 'with my bro',
                year: '2025'
            },
            {
                src: './album/aryan-techie-plane-window-aesthetic-lookout-2025.webp',
                alt: 'Looking out airplane window',
                title: 'Sky High View',
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
                alt: 'Editorial portrait with dual colors, reflection is it me',
                title: 'is it me?',
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
                title: 'Thats Me',
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
                title: "isn't it cinematic",
                year: '2025'
            },
            {
                src: './album/aryan-techie-group-selfie-smiling-2025.webp',
                alt: 'Group selfie with friends',
                title: 'trio',
                year: '2025'
            },
            {
                src: './album/aryan-techie-aroice-with-yash-iit-patna-2025.webp',
                alt: 'With friend at IIT Patna',
                title: 'Always with you',
                year: '2025'
            },
            {
                src: './album/aryan-techie-friends-campus-iit.webp',
                alt: 'Campus friends',
                title: 'the trio',
                year: '2024'
            },
            {
                src: './album/aryan-techie-speaking-on-stage-2025.webp',
                alt: 'Speaking on stage',
                title: 'On Stage',
                year: '2024'
            },
            {
                src: './album/aryan-techie-whiteboard-presentation-snap.webp',
                alt: 'stage moment',
                title: 'me on stage',
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
                alt: 'Winter gateway portrait',
                title: 'Gateway',
                year: '2025'
            },
            {
                src: './album/aryan-techie-with-book-stack-headphones-2025.webp',
                alt: 'books in my hand',
                title: 'Just Books',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airplane-sitting-wide-2025.webp',
                alt: 'broski for real',
                title: 'Broski',
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
                title: 'Expectations',
                year: '2025'
            },
            {
                src: './album/aryan-techie-books-closeup-intense-read-2025.webp',
                alt: 'Intense reading moment',
                title: 'Staring at books',
                year: '2025'
            },
            {
                src: './album/aryan-techie-campus-corridor-side-glance-gym-gymkhana-iit.webp',
                alt: 'gymkhana corridor portrait',
                title: 'Corridor',
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
                year: '2025'
            },
            {
                src: './album/aryan-techie-crowd-selfie-hyperreal-2025.webp',
                alt: 'Caffeinated Moment at IIT',
                title: 'Caffeinated Moment',
                year: '2025'
            },
            {
                src: './album/aryan-techie-duo-plane-travel-look.webp',
                alt: 'Travel duo shot',
                title: 'Travel Duo',
                year: '2025'
            },
            {
                src: './album/aryan-techie-eyestore-shot.webp',
                alt: 'Eyewear store visit',
                title: 'Reflected Me',
                year: '2024'
            },
            {
                src: './album/aryan-techie-face-close-hand-cover-style.webp',
                alt: 'Artistic hand cover pose',
                title: 'Why not Sweat?',
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
                alt: 'At IIT with My Bro',
                title: 'Double Vision',
                year: '2025'
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
                title: 'At Campus',
                year: '2025'
            },
            {
                src: './album/aryan-techie-shirt-mirror-hallway-2025.webp',
                alt: 'the mirror shot',
                title: 'Captured in Reflection',
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
                title: 'IEM',
                year: '2024'
            },
            {
                src: './album/aryan-techie-sitting-yellow-barrier-iit-campus-2025.webp',
                alt: 'My Portrait at IITP Campus',
                title: 'Path Ahead',
                year: '2025'
            },
            {
                src: './album/aryan-techie-smiling-airforce.webp',
                alt: 'Smiling airforce portrait',
                title: 'A Selfie',
                year: '2025'
            },
            {
                src: './album/aryan-techie-standing-iit-patna-signboard-2025.webp',
                alt: 'IIT Patna signboard',
                title: 'IIT Patna',
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
                alt: 'Looking up at the sky',
                title: 'Looking up',
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
                alt: 'with my bro',
                title: 'Broski',
                year: '2025'
            },
            {
                src: './album/aryan-techie-with-friend-winter-2024.jpg.webp',
                alt: 'with mr ninad',
                title: 'with Mr. Ninad',
                year: '2024'
            },
            // New 2025 Photos
            {
                src: './album/aryan-jangra-aroice-portrait-2025.webp',
                alt: 'Professional portrait of Aryan Jangra (Aroice)',
                title: 'At Cafe',
                year: '2025'
            },
            {
                src: './album/aryan-jangra-iit-patna-gate-2025.webp',
                alt: 'At IIT Patna main gate',
                title: 'IIT Patna Gateway',
                year: '2025'
            },
            {
                src: './album/aryan-techie-airport-window-travel-2025.webp',
                alt: 'Airport window view during travel',
                title: 'Travel Time',
                year: '2025'
            },
            {
                src: './album/aryan-techie-bonfire-warm-tones-2025.webp',
                alt: 'Warm bonfire evening moment',
                title: 'Bonfire Nights',
                year: '2025'
            },
            {
                src: './album/aryan-techie-campus-lawn-portrait-2025.webp',
                alt: 'Lost in Thought',
                title: 'Lost in Thought',
                year: '2025'
            },
            {
                src: './album/aryan-techie-colorful-selfie-2025.webp',
                alt: 'Vibrant colorful selfie',
                title: 'Colorful Vibes',
                year: '2025'
            },
            {
                src: './album/aryan-techie-creative-edit-double-exposure-2025.webp',
                alt: 'Creative double exposure artistic edit',
                title: 'Artcover',
                year: '2025'
            },
            {
                src: './album/aryan-techie-dev-terminal-notes-2025.webp',
                alt: 'Why not Die - Memento Mori',
                title: 'Memento Mori',
                year: '2025'
            },
            {
                src: './album/aryan-techie-developer-gym-mirror-2025.webp',
                alt: 'Developer lifestyle gym mirror shot',
                title: 'GYM Time',
                year: '2025'
            },
            {
                src: './album/aryan-techie-developer-vibes-gym-2025.webp',
                alt: 'at gym',
                title: 'At GYM',
                year: '2025'
            },
            {
                src: './album/aryan-techie-empty-road-night-aesthetic-2025.webp',
                alt: 'Aesthetic night view of empty road',
                title: 'Night Road',
                year: '2025'
            },
            {
                src: './album/aryan-techie-evening-light-2025.webp',
                alt: 'Beautiful evening light portrait',
                title: 'Golden Hour',
                year: '2025'
            },
            {
                src: './album/aryan-techie-hand-holding-rose-2025.webp',
                alt: 'Hand holding a rose',
                title: 'Cinematic Rose',
                year: '2025'
            },
            {
                src: './album/aryan-techie-headshot-glasses-2025.webp',
                alt: 'Professional headshot with glasses',
                title: 'Weather or me?',
                year: '2025'
            },
            {
                src: './album/aryan-techie-mirror-selfie-aroice-2025.webp',
                alt: 'Mirror selfie by Aroice',
                title: 'Mirror Reflection',
                year: '2025'
            },
            {
                src: './album/aryan-techie-monochrome-portrait-art-2025.webp',
                alt: 'Artistic monochrome portrait',
                title: 'Monochrome Art',
                year: '2025'
            },
            {
                src: './album/aryan-techie-moody-road-trees-2025.webp',
                alt: 'Moody road surrounded by trees',
                title: 'Moody Path',
                year: '2025'
            },
            {
                src: './album/aryan-techie-phone-screenshot-notes-2025.webp',
                alt: 'weather in july',
                title: 'A day in July',
                year: '2025'
            },
            {
                src: './album/aryan-techie-plane-wing-flight-above-clouds-2025.webp',
                alt: 'Airplane wing view above clouds',
                title: 'Above the Clouds',
                year: '2025'
            },
            {
                src: './album/aryan-techie-quote-moment-1-2025.webp',
                alt: 'Inspirational quote moment',
                title: 'Really??',
                year: '2025'
            },
            {
                src: './album/aryan-techie-shadow-walking-topdown-2025.webp',
                alt: 'Top-down view of walking shadow',
                title: 'Shoes & Shadow',
                year: '2025'
            },
            {
                src: './album/aryan-techie-silhouette-campus-2025.webp',
                alt: 'Silhouette on campus',
                title: 'Campus Silhouette',
                year: '2025'
            },
            {
                src: './album/aryan-techie-sunset-shadow-art-2025.webp',
                alt: 'Artistic sunset shadow composition',
                title: 'Sunset walk',
                year: '2024'
            },
            {
                src: './album/aryan-techie-video-editing-workflow-2025.webp',
                alt: 'Video editing workflow setup',
                title: 'Creative Workflow',
                year: '2025'
            },
            {
                src: './album/memento-mori-aryantechie-cal.webp',
                alt: 'is this moment even real',
                title: 'the quote',
                year: '2025'
            },
            {
                src: './album/memory-in-motion-1-2025.webp',
                alt: 'Memory in motion series - part 1',
                title: 'Memory in Motion I',
                year: '2025'
            },
            {
                src: './album/memory-in-motion-2-2025.webp',
                alt: 'Memory in motion series - part 2',
                title: 'Memory in Motion II',
                year: '2025'
            },
            {
                src: './album/memory-in-motion-3-2025.webp',
                alt: 'Memory in motion series - part 3',
                title: 'Memory in Motion III',
                year: '2025'
            },
            {
                src: './album/memory-in-motion-4-2025.webp',
                alt: 'Memory in motion series - part 4',
                title: 'Memory in Motion IV',
                year: '2025'
            },

            {
                src: './album/me-into-the-book.webp',
                alt: 'lost into book',
                title: 'me into the book',
                year: '2024'
            },


            {
                src: './album/white-nights.png',
                alt: 'white nights in flight',
                title: 'White Nights',
                year: '2025'
            },

            {
                src: './album/high-in-the-sky.png',
                alt: 'high in the sky',
                title: 'above the clouds',
                year: '2025'
            },

            {
                src: './album/at-cafe-zero-to-one-tea.jpg',
                alt: 'at cafe IITP',
                title: 'Zero To Tea',
                year: '2025'
            },
            
            {
                src: './album/pastery-cafe-iit.jpg',
                alt: 'pastery-at-cafe',
                title: 'Pastery',
                year: '2025'
            },

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
        
        // Enhanced SEO: Add comprehensive structured data for images
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
        
        // Enhanced SEO: Comprehensive meta attributes for search engines and AI crawlers
        img.setAttribute('itemprop', 'contentUrl');
        img.setAttribute('data-title', photo.title);
        img.setAttribute('data-year', photo.year);
        
        // Additional SEO attributes for better discovery
        img.setAttribute('data-photographer', 'Aryan Jangra');
        img.setAttribute('data-subject', 'Aryan Jangra Aroice');
        img.setAttribute('data-category', 'Portrait Photography');
        img.setAttribute('data-location', photo.title.includes('IIT') ? 'IIT Patna' : 'Various');
        img.setAttribute('data-keywords', `Aryan Jangra, Aroice, ${photo.title}, ${photo.year}, portrait, photography`);
        
        // Store comprehensive photo data for modal and SEO
        photoItem.dataset.title = photo.title;
        photoItem.dataset.year = photo.year;
        photoItem.dataset.src = photo.src;
        photoItem.dataset.photographer = 'Aryan Jangra';
        photoItem.dataset.subject = 'Aryan Jangra (Aroice)';
        
        // Enhanced structured data meta tags for better AI crawling
        const metaName = document.createElement('meta');
        metaName.setAttribute('itemprop', 'name');
        metaName.setAttribute('content', `${photo.title} - Aryan Jangra (Aroice) ${photo.year}`);
        photoItem.appendChild(metaName);
        
        const metaDescription = document.createElement('meta');
        metaDescription.setAttribute('itemprop', 'description');
        metaDescription.setAttribute('content', `${photo.alt} - Professional photography by Aryan Jangra featuring ${photo.title} captured in ${photo.year}`);
        photoItem.appendChild(metaDescription);
        
        const metaAuthor = document.createElement('meta');
        metaAuthor.setAttribute('itemprop', 'author');
        metaAuthor.setAttribute('content', 'Aryan Jangra');
        photoItem.appendChild(metaAuthor);
        
        const metaCopyright = document.createElement('meta');
        metaCopyright.setAttribute('itemprop', 'copyrightHolder');
        metaCopyright.setAttribute('content', 'Aryan Jangra');
        photoItem.appendChild(metaCopyright);
        
        const metaCreator = document.createElement('meta');
        metaCreator.setAttribute('itemprop', 'creator');
        metaCreator.setAttribute('content', 'Aryan Jangra');
        photoItem.appendChild(metaCreator);
        
        const metaDatePublished = document.createElement('meta');
        metaDatePublished.setAttribute('itemprop', 'datePublished');
        metaDatePublished.setAttribute('content', `${photo.year}-01-01`);
        photoItem.appendChild(metaDatePublished);
        
        const metaEncodingFormat = document.createElement('meta');
        metaEncodingFormat.setAttribute('itemprop', 'encodingFormat');
        metaEncodingFormat.setAttribute('content', 'image/webp');
        photoItem.appendChild(metaEncodingFormat);
        
        const metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('itemprop', 'keywords');
        metaKeywords.setAttribute('content', `Aryan Jangra, Aroice, IIT Patna, ${photo.title}, ${photo.year}, portrait photography, student life, lifestyle photography`);
        photoItem.appendChild(metaKeywords);
        
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

        // Search button functionality
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.openSearch();
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

    // ===== SEARCH FUNCTIONALITY =====

    initializeSearch() {
        this.searchOverlay = document.getElementById('search-overlay');
        this.searchInput = document.getElementById('search-input');
        
        if (!this.searchOverlay || !this.searchInput) return;

        // Close search overlay
        const closeBtn = this.searchOverlay.querySelector('.search-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeSearch());
        }


        // Close on click outside the search container
        this.searchOverlay.addEventListener('mousedown', (e) => {
            // Only close if click is NOT inside .search-container
            const container = this.searchOverlay.querySelector('.search-container');
            if (container && !container.contains(e.target)) {
                this.closeSearch();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchOverlay.classList.contains('active')) {
                this.closeSearch();
            }
            
            // Enter key in search input
            if (e.key === 'Enter' && e.target === this.searchInput) {
                const firstResult = this.searchOverlay.querySelector('.search-result-item');
                if (firstResult) {
                    firstResult.click();
                }
            }
        });

        // Search input functionality
        this.searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Clear search button
        const clearBtn = document.getElementById('search-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.searchInput.value = '';
                this.searchInput.focus();
                this.performSearch('');
            });
        }

        // Filter buttons
        const filterBtns = this.searchOverlay.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
                this.updateFilterButtons(btn);
                this.performSearch(this.searchInput.value);
            });
        });

        // Sort button
        const sortBtn = document.getElementById('results-sort');
        if (sortBtn) {
            sortBtn.addEventListener('click', () => {
                this.toggleSort();
            });
        }

        // Initialize with all photos
        this.performSearch('');
    }

    openSearch() {
        if (!this.searchOverlay) return;
        
        this.searchOverlay.classList.add('active');
        document.body.classList.add('search-active');
        document.body.style.overflow = 'hidden';
        
        // Focus search input after animation
        setTimeout(() => {
            if (this.searchInput) {
                this.searchInput.focus();
            }
        }, 400);

        // Load all photos for search if not already loaded
        this.performSearch(this.searchInput.value || '');
    }

    closeSearch() {
        if (!this.searchOverlay) return;
        
        this.searchOverlay.classList.remove('active');
        document.body.classList.remove('search-active');
        document.body.style.overflow = '';
        
        // Clear search input
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        
        // Reset filter
        this.setFilter('all');
        this.updateFilterButtons(this.searchOverlay.querySelector('[data-filter="all"]'));
        
        // Update clear button visibility
        const clearBtn = document.getElementById('search-clear');
        if (clearBtn) {
            clearBtn.classList.remove('visible');
        }
    }

    performSearch(query) {
        const trimmedQuery = query.trim().toLowerCase();
        
        // Update clear button visibility
        const clearBtn = document.getElementById('search-clear');
        if (clearBtn) {
            clearBtn.classList.toggle('visible', trimmedQuery.length > 0);
        }

        // Filter photos based on query and current filter
        this.searchResults = this.photos.filter(photo => {
            const matchesQuery = this.matchesSearchQuery(photo, trimmedQuery);
            const matchesFilter = this.matchesFilter(photo);
            return matchesQuery && matchesFilter;
        });

        // Sort results
        this.sortSearchResults(trimmedQuery);

        // Display results
        this.displaySearchResults(trimmedQuery);

        // Update results count
        this.updateResultsCount();
    }

    matchesSearchQuery(photo, query) {
        if (!query) return true;

        const searchableText = [
            photo.title,
            photo.alt,
            photo.year,
            photo.title.includes('iit') ? 'iit patna campus' : '',
            photo.title.includes('developer') || photo.title.includes('dev') ? 'developer programming coding' : '',
            photo.title.includes('mirror') ? 'selfie mirror' : '',
            photo.title.includes('portrait') ? 'portrait headshot' : '',
            photo.title.includes('travel') || photo.title.includes('airport') || photo.title.includes('plane') ? 'travel aviation flight' : '',
            photo.title.includes('gym') ? 'fitness workout gym' : '',
            photo.title.includes('creative') ? 'artistic creative art' : ''
        ].join(' ').toLowerCase();

        return searchableText.includes(query);
    }

    matchesFilter(photo) {
        switch (this.currentFilter) {
            case 'all':
                return true;
            case '2025':
                return photo.year === '2025';
            case 'iit':
                return photo.title.toLowerCase().includes('iit') || photo.title.toLowerCase().includes('campus');
            case 'developer':
                return photo.title.toLowerCase().includes('dev') || photo.title.toLowerCase().includes('coding') || photo.title.toLowerCase().includes('terminal');
            case 'portrait':
                return photo.title.toLowerCase().includes('portrait') || photo.title.toLowerCase().includes('headshot') || photo.title.toLowerCase().includes('mirror');
            case 'travel':
                return photo.title.toLowerCase().includes('travel') || photo.title.toLowerCase().includes('airport') || photo.title.toLowerCase().includes('plane') || photo.title.toLowerCase().includes('flight');
            default:
                return true;
        }
    }

    sortSearchResults(query) {
        if (this.currentSort === 'relevance' && query) {
            // Sort by relevance (title matches first, then other matches)
            this.searchResults.sort((a, b) => {
                const aTitle = a.title.toLowerCase().includes(query);
                const bTitle = b.title.toLowerCase().includes(query);
                
                if (aTitle && !bTitle) return -1;
                if (!aTitle && bTitle) return 1;
                
                // Secondary sort by year (newest first)
                return b.year.localeCompare(a.year);
            });
        } else if (this.currentSort === 'year') {
            this.searchResults.sort((a, b) => b.year.localeCompare(a.year));
        } else if (this.currentSort === 'title') {
            this.searchResults.sort((a, b) => a.title.localeCompare(b.title));
        }
    }

    displaySearchResults(query) {
        const resultsGrid = document.getElementById('search-results-grid');
        if (!resultsGrid) return;

        if (this.searchResults.length === 0) {
            resultsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h4>No photos found</h4>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            return;
        }

        resultsGrid.innerHTML = this.searchResults.map(photo => {
            const highlightedTitle = this.highlightSearchTerms(photo.title, query);
            
            return `
                <div class="search-result-item" data-src="${photo.src}" data-title="${photo.title}" data-year="${photo.year}">
                    <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
                    <div class="search-result-info">
                        <div class="search-result-title">${highlightedTitle}</div>
                        <div class="search-result-year">${photo.year}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers to search results
        resultsGrid.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                // Find the corresponding photo object from this.photos
                const src = item.dataset.src;
                const photo = this.photos.find(p => p.src === src);
                if (!photo) return;
                // Close search first
                this.closeSearch();
                // Open modal after search animation completes
                setTimeout(() => {
                    this.openModal(item);
                }, 400);
            });
            
            // Add hover effect
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    highlightSearchTerms(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    updateResultsCount() {
        const countElement = this.searchOverlay.querySelector('.results-count');
        if (countElement) {
            const total = this.searchResults.length;
            const filterText = this.currentFilter === 'all' ? 'photos' : `${this.currentFilter} photos`;
            countElement.textContent = `${total} ${filterText}`;
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
    }

    updateFilterButtons(activeBtn) {
        const filterBtns = this.searchOverlay.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    toggleSort() {
        const sortBtn = document.getElementById('results-sort');
        if (!sortBtn) return;

        const sortOptions = ['relevance', 'year', 'title'];
        const currentIndex = sortOptions.indexOf(this.currentSort);
        const nextIndex = (currentIndex + 1) % sortOptions.length;
        this.currentSort = sortOptions[nextIndex];

        // Update button text
        const sortLabels = {
            'relevance': 'Sort by relevance',
            'year': 'Sort by year',
            'title': 'Sort by title'
        };

        sortBtn.innerHTML = `<i class="fas fa-sort"></i> ${sortLabels[this.currentSort]}`;

        // Re-perform search with new sort
        this.performSearch(this.searchInput.value || '');
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
