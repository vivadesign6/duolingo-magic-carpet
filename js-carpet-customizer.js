/**
 * Magic Carpet Journey - Carpet Customizer
 * Duolingo Campaign Microsite
 */

document.addEventListener('DOMContentLoaded', function() {
    initCarpetCustomizer();
});

/**
 * Initialize Carpet Customizer
 */
function initCarpetCustomizer() {
    const patternOptions = document.querySelectorAll('.pattern-option');
    const colorOptions = document.querySelectorAll('.color-option');
    const previewContainer = document.querySelector('.preview-container');
    const carpetImage = document.querySelector('.carpet-image');
    
    if (!patternOptions.length || !colorOptions.length || !previewContainer || !carpetImage) return;
    
    // Pattern selection events
    patternOptions.forEach(option => {
        option.addEventListener('click', e => {
            const patternId = e.currentTarget.dataset.patternId;
            const isPremium = e.currentTarget.classList.contains('premium');
            
            // Update active class
            patternOptions.forEach(opt => opt.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            if (isPremium) {
                // Show premium overlay
                document.querySelector('.premium-overlay').style.display = 'flex';
                // Store pattern as "desired" but don't fully apply
                previewContainer.dataset.desiredPattern = patternId;
                
                // Track premium feature interaction
                trackEvent('carpet_customizer', 'premium_pattern_click', `Pattern ${patternId}`);
            } else {
                // Apply pattern directly (free patterns)
                previewContainer.dataset.currentPattern = patternId;
                updateCarpetVisual();
                
                // Hide premium overlay if visible
                document.querySelector('.premium-overlay').style.display = 'none';
                
                // Track free feature interaction
                trackEvent('carpet_customizer', 'free_pattern_click', `Pattern ${patternId}`);
            }
        });
    });
    
    // Color selection events
    colorOptions.forEach(option => {
        option.addEventListener('click', e => {
            const colorId = e.currentTarget.dataset.colorId;
            const isPremium = e.currentTarget.classList.contains('premium');
            
            // Update active class
            colorOptions.forEach(opt => opt.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            if (isPremium) {
                // Show premium overlay
                document.querySelector('.premium-overlay').style.display = 'flex';
                // Store color as "desired" but don't fully apply
                previewContainer.dataset.desiredColor = colorId;
                
                // Track premium feature interaction
                trackEvent('carpet_customizer', 'premium_color_click', `Color ${colorId}`);
            } else {
                // Apply color directly (free colors)
                previewContainer.dataset.currentColor = colorId;
                updateCarpetVisual();
                
                // Hide premium overlay if visible
                document.querySelector('.premium-overlay').style.display = 'none';
                
                // Track free feature interaction
                trackEvent('carpet_customizer', 'free_color_click', `Color ${colorId}`);
            }
        });
    });
    
    // Update carpet visual
    function updateCarpetVisual() {
        const currentPattern = previewContainer.dataset.currentPattern || '1';
        const currentColor = previewContainer.dataset.currentColor || '1';
        
        // Update carpet image source
        carpetImage.src = `images/carpets/pattern-${currentPattern}-color-${currentColor}.jpg`;
        carpetImage.alt = `Magic carpet with pattern ${currentPattern} and color ${currentColor}`;
        
        // Add animation effect
        carpetImage.classList.add('carpet-transform');
        setTimeout(() => {
            carpetImage.classList.remove('carpet-transform');
        }, 1000);
        
        // Track customization
        trackEvent('carpet_customizer', 'update_visual', `Pattern ${currentPattern}, Color ${currentColor}`);
    }
    
    // Premium overlay behavior
    const premiumCTA = document.querySelector('.premium-overlay .primary-cta');
    if (premiumCTA) {
        premiumCTA.addEventListener('click', () => {
            trackEvent('carpet_customizer', 'premium_cta_click', 'Unlock Premium');
        });
    }
}