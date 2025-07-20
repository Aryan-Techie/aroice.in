/**
 * SEO Enhancement Script for Aroice Photo Gallery
 * Monitors and enhances SEO performance for better search engine visibility
 */

class PhotoSEOEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addStructuredDataToPage();
        this.enhanceImageSEO();
        this.addOpenGraphTags();
        this.monitorImageLoading();
        this.generateImageSitemap();
        this.addBreadcrumbNavigation();
    }

    // Add dynamic structured data for better AI crawling
    addStructuredDataToPage() {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": window.location.href,
            "mainEntity": {
                "@type": "ImageGallery",
                "numberOfItems": document.querySelectorAll('.photo-item').length,
                "image": Array.from(document.querySelectorAll('img[src*="album/"]')).map(img => ({
                    "@type": "ImageObject",
                    "url": img.src,
                    "name": img.getAttribute('data-title') || img.alt,
                    "description": img.alt,
                    "creator": "Aryan Jangra",
                    "copyrightHolder": "Aryan Jangra"
                }))
            }
        });
        document.head.appendChild(script);
    }

    // Enhance images with SEO-friendly attributes
    enhanceImageSEO() {
        const images = document.querySelectorAll('img[src*="album/"]');
        images.forEach((img, index) => {
            // Add lazy loading if not already present
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }

            // Add SEO-friendly alt text if missing
            if (!img.alt || img.alt.trim() === '') {
                const filename = img.src.split('/').pop().replace('.webp', '');
                img.alt = `Portrait of Aryan Jangra - ${filename.replace(/-/g, ' ')}`;
            }

            // Add title attribute for better accessibility
            if (!img.title) {
                img.title = img.alt;
            }

            // Add data attributes for search engines
            img.setAttribute('data-photographer', 'Aryan Jangra');
            img.setAttribute('data-subject', 'Aryan Jangra (Aroice)');
            img.setAttribute('data-index', index + 1);

            // Add structured data to image container
            const container = img.closest('.photo-item');
            if (container && !container.hasAttribute('itemscope')) {
                container.setAttribute('itemscope', '');
                container.setAttribute('itemtype', 'https://schema.org/ImageObject');
            }
        });
    }

    // Add Open Graph meta tags dynamically
    addOpenGraphTags() {
        const metaTags = [
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'Aroice Photography' },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:image:width', content: '800' },
            { property: 'og:image:height', content: '1000' },
            { property: 'og:image:type', content: 'image/webp' },
            { property: 'article:author', content: 'Aryan Jangra' },
            { property: 'article:publisher', content: 'https://aroice.in' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@aryantechie' },
            { name: 'twitter:creator', content: '@aryantechie' }
        ];

        metaTags.forEach(tag => {
            if (!document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`)) {
                const meta = document.createElement('meta');
                if (tag.property) meta.setAttribute('property', tag.property);
                if (tag.name) meta.setAttribute('name', tag.name);
                meta.setAttribute('content', tag.content);
                document.head.appendChild(meta);
            }
        });
    }

    // Monitor image loading for SEO performance
    monitorImageLoading() {
        const images = document.querySelectorAll('img[src*="album/"]');
        let loadedCount = 0;

        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    this.updateLoadingProgress(loadedCount, images.length);
                });
            }
        });

        this.updateLoadingProgress(loadedCount, images.length);
    }

    updateLoadingProgress(loaded, total) {
        // Update meta tag for search engines
        let metaLoaded = document.querySelector('meta[name="images-loaded"]');
        if (!metaLoaded) {
            metaLoaded = document.createElement('meta');
            metaLoaded.setAttribute('name', 'images-loaded');
            document.head.appendChild(metaLoaded);
        }
        metaLoaded.setAttribute('content', `${loaded}/${total}`);

        // Notify search engines when all images are loaded
        if (loaded === total) {
            const event = new CustomEvent('imagesLoaded', {
                detail: { total, timestamp: new Date().toISOString() }
            });
            document.dispatchEvent(event);
        }
    }

    // Generate dynamic image sitemap
    generateImageSitemap() {
        const images = document.querySelectorAll('img[src*="album/"]');
        const sitemapData = Array.from(images).map((img, index) => ({
            loc: img.src,
            title: img.getAttribute('data-title') || img.title || img.alt,
            caption: img.alt,
            license: 'https://aroice.in/photos/',
            lastmod: new Date().toISOString().split('T')[0]
        }));

        // Store sitemap data for potential API use
        window.imageSitemapData = sitemapData;

        // Add JSON-LD for all images
        const imageListSchema = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "numberOfItems": sitemapData.length,
            "itemListElement": sitemapData.map((item, index) => ({
                "@type": "ImageObject",
                "position": index + 1,
                "url": item.loc,
                "name": item.title,
                "description": item.caption,
                "creator": "Aryan Jangra",
                "copyrightHolder": "Aryan Jangra",
                "license": item.license,
                "datePublished": "2025-01-01",
                "encodingFormat": "image/webp"
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(imageListSchema);
        document.head.appendChild(script);
    }

    // Add breadcrumb navigation for SEO
    addBreadcrumbNavigation() {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://aroice.in"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Photos",
                    "item": "https://aroice.in/photos/"
                }
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(script);
    }

    // SEO Performance Analytics
    analyzeSEO() {
        const analysis = {
            imagesCount: document.querySelectorAll('img').length,
            imagesWithAlt: document.querySelectorAll('img[alt]').length,
            imagesWithTitle: document.querySelectorAll('img[title]').length,
            structuredDataScripts: document.querySelectorAll('script[type="application/ld+json"]').length,
            metaTags: document.querySelectorAll('meta').length,
            openGraphTags: document.querySelectorAll('meta[property^="og:"]').length,
            twitterCardTags: document.querySelectorAll('meta[name^="twitter:"]').length,
            lazyLoadImages: document.querySelectorAll('img[loading="lazy"]').length,
            seoScore: 0
        };

        // Calculate SEO score
        analysis.seoScore = (
            (analysis.imagesWithAlt / analysis.imagesCount) * 25 +
            (analysis.imagesWithTitle / analysis.imagesCount) * 15 +
            (analysis.structuredDataScripts > 0 ? 25 : 0) +
            (analysis.openGraphTags > 5 ? 20 : 0) +
            (analysis.lazyLoadImages / analysis.imagesCount) * 15
        ).toFixed(1);

        console.log('📊 SEO Analysis Report:', analysis);
        return analysis;
    }
}

// Initialize SEO enhancer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.photoSEOEnhancer = new PhotoSEOEnhancer();
    });
} else {
    window.photoSEOEnhancer = new PhotoSEOEnhancer();
}

// Export for manual analysis
window.analyzeSEO = () => window.photoSEOEnhancer.analyzeSEO();
