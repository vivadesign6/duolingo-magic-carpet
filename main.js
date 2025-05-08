/**
 * Magic Carpet Journey - Main JavaScript
 * Duolingo Campaign Microsite
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initCountdown();
    initCookieConsent();
    
    // Track page view
    trackPageView('home');
});

/**
 * Mobile Navigation Functionality
 */
function initNavigation() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    if (!menuToggle || !mainMenu) return;
    
    menuToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        mainMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = menuToggle.contains(event.target) || mainMenu.contains(event.target);
        
        if (!isClickInside && mainMenu.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Track navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            trackEvent('navigation', 'click', linkText);
        });
    });
}

/**
 * Countdown Timer Functionality
 */
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set end date to 14 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    
    function updateCountdown() {
        const now = new Date();
        const timeDifference = endDate - now;
        
        if (timeDifference <= 0) {
            countdownElement.textContent = 'Offer expired';
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownElement.textContent = `${days} days, ${hours} hours`;
    }
    
    // Initial update
    updateCountdown();
    
    // Update countdown every hour
    setInterval(updateCountdown, 3600000);
}

/**
 * Cookie Consent Management
 */
function initCookieConsent() {
    const cookieBanner = document.getElementById('cookie-consent-banner');
    if (!cookieBanner) return;
    
    const acceptAllButton = document.getElementById('cookie-accept-all');
    const customizeButton = document.getElementById('cookie-customize');
    const rejectAllButton = document.getElementById('cookie-reject-all');
    
    // Check if consent already given
    const consentStatus = localStorage.getItem('cookie_consent_status');
    if (consentStatus) {
        cookieBanner.style.display = 'none';
        applyStoredConsent(JSON.parse(consentStatus));
    }
    
    // Accept all cookies
    if (acceptAllButton) {
        acceptAllButton.addEventListener('click', function() {
            setConsent({
                essential: true,
                analytics: true,
                marketing: true
            });
        });
    }
    
    // Reject non-essential cookies
    if (rejectAllButton) {
        rejectAllButton.addEventListener('click', function() {
            setConsent({
                essential: true,
                analytics: false,
                marketing: false
            });
        });
    }
    
    // Customize cookies (for a real implementation, this would show more options)
    if (customizeButton) {
        customizeButton.addEventListener('click', function() {
            // This is a simplified version. In a real implementation,
            // this would toggle a detailed cookie preferences panel
            alert('This would show detailed cookie preferences in a real implementation.');
            
            // For this demo, we'll just reject non-essential cookies
            setConsent({
                essential: true,
                analytics: false,
                marketing: false
            });
        });
    }
}

/**
 * Set Cookie Consent Preferences
 */
function setConsent(consentOptions) {
    // Store consent in localStorage
    localStorage.setItem('cookie_consent_status', JSON.stringify(consentOptions));
    
    // Apply consent settings
    applyStoredConsent(consentOptions);
    
    // Hide banner
    const cookieBanner = document.getElementById('cookie-consent-banner');
    if (cookieBanner) {
        cookieBanner.style.display = 'none';
    }
    
    // Track consent for compliance
    trackConsentSelection(consentOptions);
}

/**
 * Apply Stored Consent Settings
 */
function applyStoredConsent(consentOptions) {
    // Apply essential cookies (always on)
    console.log('Essential cookies enabled');
    
    // Apply analytics if consented
    if (consentOptions.analytics) {
        console.log('Analytics cookies enabled');
        // This would initialize analytics in a real implementation
    }
    
    // Apply marketing if consented
    if (consentOptions.marketing) {
        console.log('Marketing cookies enabled');
        // This would initialize marketing cookies in a real implementation
    }
}

/**
 * Track Consent Selection
 */
function trackConsentSelection(consentOptions) {
    // Record consent for compliance purposes
    const consentData = {
        timestamp: new Date().toISOString(),
        essential: consentOptions.essential,
        analytics: consentOptions.analytics,
        marketing: consentOptions.marketing,
        userAgent: navigator.userAgent
    };
    
    // This would typically be sent to a server endpoint
    console.log('Consent recorded:', consentData);
}

/**
 * Analytics Event Tracking
 */
function trackEvent(category, action, label) {
    // Check for analytics consent
    const consentStatus = localStorage.getItem('cookie_consent_status');
    const hasAnalyticsConsent = consentStatus ? JSON.parse(consentStatus).analytics : false;
    
    if (!hasAnalyticsConsent) {
        console.log('Analytics consent not provided');
        return;
    }
    
    // In a real implementation, this would send data to Google Analytics or similar
    console.log('Event tracked:', {
        category: category,
        action: action,
        label: label
    });
}

/**
 * Track Page View
 */
function trackPageView(pageName) {
    // Check for analytics consent
    const consentStatus = localStorage.getItem('cookie_consent_status');
    const hasAnalyticsConsent = consentStatus ? JSON.parse(consentStatus).analytics : false;
    
    if (!hasAnalyticsConsent) {
        console.log('Analytics consent not provided');
        return;
    }
    
    // In a real implementation, this would send data to Google Analytics or similar
    console.log('Page view tracked:', {
        page_name: pageName,
        page_path: window.location.pathname
    });
}
