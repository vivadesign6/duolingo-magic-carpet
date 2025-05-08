/**
 * Magic Carpet Experience - Image Generation System
 * Provides SVG fallbacks for all images to ensure the site works without external image files
 */

document.addEventListener('DOMContentLoaded', function() {
    // Process all images on page load
    const images = document.querySelectorAll('img');
    images.forEach(processImage);
});

/**
 * Process an image element to ensure it displays properly
 * @param {HTMLImageElement} imgElement - The image element to process
 */
function processImage(imgElement) {
    // Store the original src for reference
    const originalSrc = imgElement.getAttribute('src');
    if (!originalSrc) return;

    // Set up error handler for fallback SVG generation
    imgElement.onerror = function() {
        generateSVG(this, originalSrc);
    };

    // Force error handler to run by briefly clearing src
    // This ensures SVGs are generated even if the image path exists but file doesn't
    imgElement.src = '';
    setTimeout(() => {
        imgElement.src = originalSrc;
    }, 0);
}

/**
 * Generate and set an SVG for an image element
 * @param {HTMLImageElement} imgElement - The image element
 * @param {string} srcPath - The original src path
 */
function generateSVG(imgElement, srcPath) {
    if (!srcPath) return;
    
    // Extract filename and directory from path
    const pathParts = srcPath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const dirName = pathParts.length > 1 ? pathParts[pathParts.length - 2] : '';
    
    // Create path for lookup
    const lookupPath = dirName ? `${dirName}/${fileName}` : fileName;
    
    // Generate SVG content
    const svgContent = createPlaceholderImage(lookupPath);
    if (svgContent) {
        // Convert to base64 and set as source
        const svgBase64 = btoa(svgContent);
        imgElement.src = `data:image/svg+xml;base64,${svgBase64}`;
    }
}

/**
 * Create placeholder SVG based on image type
 * @param {string} type - Path or identifier for image type
 * @param {string} [color1] - Primary color (optional)
 * @param {string} [color2] - Secondary color (optional)
 * @returns {string} SVG markup as string
 */
function createPlaceholderImage(type, color1, color2) {
    // Pattern placeholders
    if (type.includes('patterns/classic') || type === 'classic.svg') 
        return generatePatternSVG('classic', color1, color2);
    if (type.includes('patterns/geometric') || type === 'geometric.svg') 
        return generatePatternSVG('geometric', color1, color2);
    if (type.includes('patterns/floral') || type === 'floral.svg') 
        return generatePatternSVG('floral', color1, color2);
    if (type.includes('patterns/arabesque') || type === 'arabesque.svg') 
        return generatePatternSVG('arabesque', color1, color2);
    if (type.includes('patterns/royal') || type === 'royal.svg') 
        return generatePatternSVG('royal', color1, color2);
        
    // Pattern thumbnails
    if (type.includes('classic-thumb')) 
        return generatePatternThumbnail('classic', color1, color2);
    if (type.includes('geometric-thumb')) 
        return generatePatternThumbnail('geometric', color1, color2);
    if (type.includes('floral-thumb')) 
        return generatePatternThumbnail('floral', color1, color2);
    if (type.includes('arabesque-thumb')) 
        return generatePatternThumbnail('arabesque', color1, color2);
    if (type.includes('royal-thumb')) 
        return generatePatternThumbnail('royal', color1, color2);
        
    // Thread patterns
    if (type.includes('threads/standard') || type === 'standard.svg') 
        return generateThreadSVG('standard', color1);
    if (type.includes('threads/silver') || type === 'silver.svg') 
        return generateThreadSVG('silver', color1);
    if (type.includes('threads/gold') || type === 'gold.svg') 
        return generateThreadSVG('gold', color1);
    if (type.includes('threads/magical') || type === 'magical.svg') 
        return generateThreadSVG('magical', color1);
        
    // Effects
    if (type.includes('effects/sound-waves') || type === 'sound-waves.svg') 
        return generateEffectSVG('sound-waves', color1);
    if (type.includes('effects/interactive-particles') || type === 'interactive-particles.svg') 
        return generateEffectSVG('particles', color1);
    if (type.includes('effects/personalized-blend') || type === 'personalized-blend.svg') 
        return generateEffectSVG('personalized', color1);
    if (type.includes('effects/diamond-sparkle') || type === 'diamond-sparkle.svg') 
        return generateEffectSVG('diamond-sparkle', color1);
    if (type.includes('effects/gold-glow') || type === 'gold-glow.svg') 
        return generateEffectSVG('gold-glow', color1);
        
    // Icons
    if (type.includes('visual-learner') || type.includes('Visual learning')) 
        return generateIconSVG('visual', '#1CB0F6');
    if (type.includes('auditory-learner') || type.includes('Auditory')) 
        return generateIconSVG('auditory', '#E91E63');
    if (type.includes('kinesthetic-learner') || type.includes('Kinesthetic')) 
        return generateIconSVG('kinesthetic', '#FF9800');
    if (type.includes('personalized-learner') || type.includes('Personalized')) 
        return generateIconSVG('personalized', '#4CAF50');
    if (type.includes('streak-icon') || type.includes('Streak')) 
        return generateIconSVG('streak', '#FFD900');
    if (type.includes('gems-icon') || type.includes('Gems')) 
        return generateIconSVG('gems', '#A560F8');
    if (type.includes('league-icon') || type.includes('League')) 
        return generateIconSVG('league', '#00BCD4');
        
    // Characters
    if (type.includes('duo-flying') || type.includes('Duo')) 
        return generateDuoSVG();
        
    // Personas
    if (type.includes('persona-samuel') || (type.includes('Samuel') && type.includes('Visual'))) 
        return generatePersonaSVG('boy', '#4CAF50');
    if (type.includes('persona-amelia') || (type.includes('Amelia') && type.includes('Auditory'))) 
        return generatePersonaSVG('girl', '#E91E63');
    if (type.includes('persona-daniel') || (type.includes('Daniel') && type.includes('Kinesthetic'))) 
        return generatePersonaSVG('boy2', '#FF9800');
        
    // Carpet examples
    if (type.includes('carpet-visual-learner') || type.includes('Visual learner carpet')) 
        return generateCarpetExampleSVG('visual', '#4CAF50');
    if (type.includes('carpet-auditory-learner') || type.includes('Auditory learner carpet')) 
        return generateCarpetExampleSVG('auditory', '#E91E63');
    if (type.includes('carpet-kinesthetic-learner') || type.includes('Kinesthetic learner carpet')) 
        return generateCarpetExampleSVG('kinesthetic', '#FF9800');
        
    // Premium features
    if (type.includes('carpet-free') || type.includes('Free Magic Carpet')) 
        return generateCarpetCompareSVG('free');
    if (type.includes('carpet-premium') || type.includes('Premium Magic Carpet') || type.includes('Magic Carpet Flying')) 
        return generateCarpetCompareSVG('premium');
    if (type.includes('premium/premium-patterns') || type.includes('premium-patterns.svg')) 
        return generatePremiumFeatureSVG('patterns');
    if (type.includes('premium/premium-colors') || type.includes('premium-colors.svg')) 
        return generatePremiumFeatureSVG('colors');
    if (type.includes('premium/premium-threads') || type.includes('premium-threads.svg')) 
        return generatePremiumFeatureSVG('threads');
    if (type.includes('premium/premium-learning') || type.includes('premium-learning.svg')) 
        return generatePremiumFeatureSVG('learning');
    if (type.includes('premium/premium-league') || type.includes('premium-league.svg')) 
        return generatePremiumFeatureSVG('league');
        
    // Achievements
    if (type.includes('achievements/streak-threads') || type.includes('streak-threads.svg')) 
        return generateAchievementSVG('streak');
    if (type.includes('achievements/gem-embellishments') || type.includes('gem-embellishments.svg')) 
        return generateAchievementSVG('gems');
    if (type.includes('achievements/league-heights') || type.includes('league-heights.svg')) 
        return generateAchievementSVG('league');
        
    // Default fallbacks
    if (type.includes('premium-feature-default')) 
        return generatePremiumFeatureSVG('patterns');
        
    // Generic type-based fallbacks
    if (type.includes('visual')) 
        return generateCarpetExampleSVG('visual', '#4CAF50');
    if (type.includes('auditory')) 
        return generateCarpetExampleSVG('auditory', '#E91E63');
    if (type.includes('kinesthetic')) 
        return generateCarpetExampleSVG('kinesthetic', '#FF9800');
    if (type.includes('pattern')) 
        return generatePatternSVG('classic', '#1CB0F6', '#0F8BC0');
    if (type.includes('streak')) 
        return generateAchievementSVG('streak');
    if (type.includes('gem')) 
        return generateAchievementSVG('gems');
    if (type.includes('league')) 
        return generateAchievementSVG('league');
    if (type.includes('premium')) 
        return generateCarpetCompareSVG('premium');
    if (type.includes('free')) 
        return generateCarpetCompareSVG('free');
    if (type.includes('carpet')) 
        return generateCarpetCompareSVG('premium');
    
    // Ultimate fallback
    return generateDefaultSVG();
}

// Generate pattern SVGs
function generatePatternSVG(type, color1 = '#1CB0F6', color2 = '#0F8BC0') {
    let patternContent = '';
    
    switch(type) {
        case 'classic':
            patternContent = `
                <rect width="100%" height="100%" fill="${color1}" opacity="0.1"/>
                <g fill="${color2}" opacity="0.2">
                    <rect x="0" y="0" width="10" height="10"/>
                    <rect x="20" y="0" width="10" height="10"/>
                    <rect x="40" y="0" width="10" height="10"/>
                    <rect x="60" y="0" width="10" height="10"/>
                    <rect x="80" y="0" width="10" height="10"/>
                    <rect x="10" y="10" width="10" height="10"/>
                    <rect x="30" y="10" width="10" height="10"/>
                    <rect x="50" y="10" width="10" height="10"/>
                    <rect x="70" y="10" width="10" height="10"/>
                    <rect x="90" y="10" width="10" height="10"/>
                    
                    <rect x="0" y="20" width="10" height="10"/>
                    <rect x="20" y="20" width="10" height="10"/>
                    <rect x="40" y="20" width="10" height="10"/>
                    <rect x="60" y="20" width="10" height="10"/>
                    <rect x="80" y="20" width="10" height="10"/>
                    <rect x="10" y="30" width="10" height="10"/>
                    <rect x="30" y="30" width="10" height="10"/>
                    <rect x="50" y="30" width="10" height="10"/>
                    <rect x="70" y="30" width="10" height="10"/>
                    <rect x="90" y="30" width="10" height="10"/>
                </g>
            `;
            break;
            
        case 'geometric':
            patternContent = `
                <rect width="100%" height="100%" fill="${color1}" opacity="0.1"/>
                <g fill="${color2}" opacity="0.2">
                    <polygon points="0,0 10,0 5,10"/>
                    <polygon points="20,0 30,0 25,10"/>
                    <polygon points="40,0 50,0 45,10"/>
                    <polygon points="60,0 70,0 65,10"/>
                    <polygon points="80,0 90,0 85,10"/>
                    
                    <polygon points="10,10 20,10 15,20"/>
                    <polygon points="30,10 40,10 35,20"/>
                    <polygon points="50,10 60,10 55,20"/>
                    <polygon points="70,10 80,10 75,20"/>
                    <polygon points="90,10 100,10 95,20"/>
                    
                    <polygon points="0,20 10,20 5,30"/>
                    <polygon points="20,20 30,20 25,30"/>
                    <polygon points="40,20 50,20 45,30"/>
                    <polygon points="60,20 70,20 65,30"/>
                    <polygon points="80,20 90,20 85,30"/>
                </g>
            `;
            break;
            
        case 'floral':
            patternContent = `
                <rect width="100%" height="100%" fill="${color1}" opacity="0.1"/>
                <g fill="${color2}" opacity="0.2">
                    <circle cx="10" cy="10" r="5"/>
                    <circle cx="30" cy="10" r="5"/>
                    <circle cx="50" cy="10" r="5"/>
                    <circle cx="70" cy="10" r="5"/>
                    <circle cx="90" cy="10" r="5"/>
                    
                    <circle cx="20" cy="20" r="5"/>
                    <circle cx="40" cy="20" r="5"/>
                    <circle cx="60" cy="20" r="5"/>
                    <circle cx="80" cy="20" r="5"/>
                    
                    <circle cx="10" cy="30" r="5"/>
                    <circle cx="30" cy="30" r="5"/>
                    <circle cx="50" cy="30" r="5"/>
                    <circle cx="70" cy="30" r="5"/>
                    <circle cx="90" cy="30" r="5"/>
                </g>
                <g fill="none" stroke="${color2}" stroke-width="1" opacity="0.3">
                    <path d="M10,10 C15,5 25,5 30,10"/>
                    <path d="M30,10 C35,5 45,5 50,10"/>
                    <path d="M50,10 C55,5 65,5 70,10"/>
                    <path d="M70,10 C75,5 85,5 90,10"/>
                    
                    <path d="M20,20 C25,15 35,15 40,20"/>
                    <path d="M40,20 C45,15 55,15 60,20"/>
                    <path d="M60,20 C65,15 75,15 80,20"/>
                    
                    <path d="M10,30 C15,25 25,25 30,30"/>
                    <path d="M30,30 C35,25 45,25 50,30"/>
                    <path d="M50,30 C55,25 65,25 70,30"/>
                    <path d="M70,30 C75,25 85,25 90,30"/>
                </g>
            `;
            break;
            
        case 'arabesque':
            patternContent = `
                <rect width="100%" height="100%" fill="${color1}" opacity="0.1"/>
                <g fill="${color2}" opacity="0.3">
                    <path d="M0,0 Q10,10 0,20 Q10,30 0,40 Q10,50 0,60 Q10,70 0,80 Q10,90 0,100"/>
                    <path d="M20,0 Q30,10 20,20 Q30,30 20,40 Q30,50 20,60 Q30,70 20,80 Q30,90 20,100"/>
                    <path d="M40,0 Q50,10 40,20 Q50,30 40,40 Q50,50 40,60 Q50,70 40,80 Q50,90 40,100"/>
                    <path d="M60,0 Q70,10 60,20 Q70,30 60,40 Q70,50 60,60 Q70,70 60,80 Q70,90 60,100"/>
                    <path d="M80,0 Q90,10 80,20 Q90,30 80,40 Q90,50 80,60 Q90,70 80,80 Q90,90 80,100"/>
                </g>
                <g fill="none" stroke="${color2}" stroke-width="0.5" opacity="0.2">
                    <circle cx="10" cy="10" r="5"/>
                    <circle cx="30" cy="10" r="5"/>
                    <circle cx="50" cy="10" r="5"/>
                    <circle cx="70" cy="10" r="5"/>
                    <circle cx="90" cy="10" r="5"/>
                    
                    <circle cx="10" cy="30" r="5"/>
                    <circle cx="30" cy="30" r="5"/>
                    <circle cx="50" cy="30" r="5"/>
                    <circle cx="70" cy="30" r="5"/>
                    <circle cx="90" cy="30" r="5"/>
                    
                    <circle cx="10" cy="50" r="5"/>
                    <circle cx="30" cy="50" r="5"/>
                    <circle cx="50" cy="50" r="5"/>
                    <circle cx="70" cy="50" r="5"/>
                    <circle cx="90" cy="50" r="5"/>
                </g>
            `;
            break;
            
        case 'royal':
            patternContent = `
                <rect width="100%" height="100%" fill="${color1}" opacity="0.1"/>
                <g fill="${color2}" opacity="0.3">
                    <path d="M10,10 L20,10 L20,20 L10,20 Z"/>
                    <path d="M30,10 L40,10 L40,20 L30,20 Z"/>
                    <path d="M50,10 L60,10 L60,20 L50,20 Z"/>
                    <path d="M70,10 L80,10 L80,20 L70,20 Z"/>
                    
                    <path d="M20,20 L30,20 L30,30 L20,30 Z"/>
                    <path d="M40,20 L50,20 L50,30 L40,30 Z"/>
                    <path d="M60,20 L70,20 L70,30 L60,30 Z"/>
                    <path d="M80,20 L90,20 L90,30 L80,30 Z"/>
                    
                    <path d="M10,30 L20,30 L20,40 L10,40 Z"/>
                    <path d="M30,30 L40,30 L40,40 L30,40 Z"/>
                    <path d="M50,30 L60,30 L60,40 L50,40 Z"/>
                    <path d="M70,30 L80,30 L80,40 L70,40 Z"/>
                </g>
                <g fill="none" stroke="${color2}" stroke-width="0.5" opacity="0.2">
                    <path d="M0,0 L100,0 L100,100 L0,100 Z"/>
                    <path d="M10,10 L90,10 L90,90 L10,90 Z"/>
                    <path d="M0,0 L100,100"/>
                    <path d="M0,100 L100,0"/>
                    <path d="M50,0 L50,100"/>
                    <path d="M0,50 L100,50"/>
                </g>
            `;
            break;
            
        default:
            patternContent = `
                <rect width="100%" height="100%" fill="${color1}" opacity="0.2"/>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${patternContent}</svg>`;
}

// Generate pattern thumbnails
function generatePatternThumbnail(type, color1 = '#1CB0F6', color2 = '#0F8BC0') {
    return generatePatternSVG(type, color1, color2);
}

// Generate thread SVGs
function generateThreadSVG(type, color = '#1CB0F6') {
    let threadContent = '';
    
    switch(type) {
        case 'standard':
            threadContent = `
                <g stroke="${color}" opacity="0.3" stroke-linecap="round">
                    <line x1="10" y1="0" x2="10" y2="100" stroke-width="1"/>
                    <line x1="30" y1="0" x2="30" y2="100" stroke-width="1"/>
                    <line x1="50" y1="0" x2="50" y2="100" stroke-width="1"/>
                    <line x1="70" y1="0" x2="70" y2="100" stroke-width="1"/>
                    <line x1="90" y1="0" x2="90" y2="100" stroke-width="1"/>
                </g>
            `;
            break;
            
        case 'silver':
            threadContent = `
                <g stroke="#BDBDBD" opacity="0.5" stroke-linecap="round">
                    <line x1="10" y1="0" x2="10" y2="100" stroke-width="2"/>
                    <line x1="30" y1="0" x2="30" y2="100" stroke-width="2"/>
                    <line x1="50" y1="0" x2="50" y2="100" stroke-width="2"/>
                    <line x1="70" y1="0" x2="70" y2="100" stroke-width="2"/>
                    <line x1="90" y1="0" x2="90" y2="100" stroke-width="2"/>
                </g>
                <g fill="#E0E0E0" opacity="0.7">
                    <circle cx="10" cy="20" r="2"/>
                    <circle cx="10" cy="40" r="2"/>
                    <circle cx="10" cy="60" r="2"/>
                    <circle cx="10" cy="80" r="2"/>
                    
                    <circle cx="30" cy="10" r="2"/>
                    <circle cx="30" cy="30" r="2"/>
                    <circle cx="30" cy="50" r="2"/>
                    <circle cx="30" cy="70" r="2"/>
                    <circle cx="30" cy="90" r="2"/>
                    
                    <circle cx="50" cy="20" r="2"/>
                    <circle cx="50" cy="40" r="2"/>
                    <circle cx="50" cy="60" r="2"/>
                    <circle cx="50" cy="80" r="2"/>
                    
                    <circle cx="70" cy="10" r="2"/>
                    <circle cx="70" cy="30" r="2"/>
                    <circle cx="70" cy="50" r="2"/>
                    <circle cx="70" cy="70" r="2"/>
                    <circle cx="70" cy="90" r="2"/>
                    
                    <circle cx="90" cy="20" r="2"/>
                    <circle cx="90" cy="40" r="2"/>
                    <circle cx="90" cy="60" r="2"/>
                    <circle cx="90" cy="80" r="2"/>
                </g>
            `;
            break;
            
        case 'gold':
            threadContent = `
                <g stroke="#FFD900" opacity="0.7" stroke-linecap="round">
                    <line x1="10" y1="0" x2="10" y2="100" stroke-width="2"/>
                    <line x1="30" y1="0" x2="30" y2="100" stroke-width="2"/>
                    <line x1="50" y1="0" x2="50" y2="100" stroke-width="2"/>
                    <line x1="70" y1="0" x2="70" y2="100" stroke-width="2"/>
                    <line x1="90" y1="0" x2="90" y2="100" stroke-width="2"/>
                </g>
                <g fill="#FFC107" opacity="0.8">
                    <circle cx="10" cy="20" r="3"/>
                    <circle cx="10" cy="40" r="3"/>
                    <circle cx="10" cy="60" r="3"/>
                    <circle cx="10" cy="80" r="3"/>
                    
                    <circle cx="30" cy="10" r="3"/>
                    <circle cx="30" cy="30" r="3"/>
                    <circle cx="30" cy="50" r="3"/>
                    <circle cx="30" cy="70" r="3"/>
                    <circle cx="30" cy="90" r="3"/>
                    
                    <circle cx="50" cy="20" r="3"/>
                    <circle cx="50" cy="40" r="3"/>
                    <circle cx="50" cy="60" r="3"/>
                    <circle cx="50" cy="80" r="3"/>
                    
                    <circle cx="70" cy="10" r="3"/>
                    <circle cx="70" cy="30" r="3"/>
                    <circle cx="70" cy="50" r="3"/>
                    <circle cx="70" cy="70" r="3"/>
                    <circle cx="70" cy="90" r="3"/>
                    
                    <circle cx="90" cy="20" r="3"/>
                    <circle cx="90" cy="40" r="3"/>
                    <circle cx="90" cy="60" r="3"/>
                    <circle cx="90" cy="80" r="3"/>
                </g>
                <g fill="#FFEB3B" opacity="0.5">
                    <circle cx="10" cy="20" r="4"/>
                    <circle cx="30" cy="30" r="4"/>
                    <circle cx="50" cy="40" r="4"/>
                    <circle cx="70" cy="50" r="4"/>
                    <circle cx="90" cy="60" r="4"/>
                </g>
            `;
            break;
            
        case 'magical':
            threadContent = `
                <defs>
                    <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#FF0000"/>
                        <stop offset="16.67%" stop-color="#FF9900"/>
                        <stop offset="33.33%" stop-color="#FFFF00"/>
                        <stop offset="50%" stop-color="#00FF00"/>
                        <stop offset="66.67%" stop-color="#0099FF"/>
                        <stop offset="83.33%" stop-color="#0000FF"/>
                        <stop offset="100%" stop-color="#9900FF"/>
                    </linearGradient>
                </defs>
                <g stroke="url(#rainbowGradient)" opacity="0.7" stroke-linecap="round">
                    <line x1="10" y1="0" x2="10" y2="100" stroke-width="3"/>
                    <line x1="30" y1="0" x2="30" y2="100" stroke-width="3"/>
                    <line x1="50" y1="0" x2="50" y2="100" stroke-width="3"/>
                    <line x1="70" y1="0" x2="70" y2="100" stroke-width="3"/>
                    <line x1="90" y1="0" x2="90" y2="100" stroke-width="3"/>
                </g>
                <g fill="#FFFFFF" opacity="0.9">
                    <circle cx="10" cy="20" r="2"/>
                    <circle cx="10" cy="40" r="2"/>
                    <circle cx="10" cy="60" r="2"/>
                    <circle cx="10" cy="80" r="2"/>
                    
                    <circle cx="30" cy="10" r="2"/>
                    <circle cx="30" cy="30" r="2"/>
                    <circle cx="30" cy="50" r="2"/>
                    <circle cx="30" cy="70" r="2"/>
                    <circle cx="30" cy="90" r="2"/>
                    
                    <circle cx="50" cy="20" r="2"/>
                    <circle cx="50" cy="40" r="2"/>
                    <circle cx="50" cy="60" r="2"/>
                    <circle cx="50" cy="80" r="2"/>
                    
                    <circle cx="70" cy="10" r="2"/>
                    <circle cx="70" cy="30" r="2"/>
                    <circle cx="70" cy="50" r="2"/>
                    <circle cx="70" cy="70" r="2"/>
                    <circle cx="70" cy="90" r="2"/>
                    
                    <circle cx="90" cy="20" r="2"/>
                    <circle cx="90" cy="40" r="2"/>
                    <circle cx="90" cy="60" r="2"/>
                    <circle cx="90" cy="80" r="2"/>
                </g>
            `;
            break;
            
        default:
            threadContent = `
                <g stroke="${color}" opacity="0.3" stroke-linecap="round">
                    <line x1="10" y1="0" x2="10" y2="100" stroke-width="1"/>
                    <line x1="30" y1="0" x2="30" y2="100" stroke-width="1"/>
                    <line x1="50" y1="0" x2="50" y2="100" stroke-width="1"/>
                    <line x1="70" y1="0" x2="70" y2="100" stroke-width="1"/>
                    <line x1="90" y1="0" x2="90" y2="100" stroke-width="1"/>
                </g>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${threadContent}</svg>`;
}

// Generate effect SVGs
function generateEffectSVG(type, color = '#1CB0F6') {
    let effectContent = '';
    
    switch(type) {
        case 'sound-waves':
            effectContent = `
                <g stroke="${color}" fill="none" opacity="0.3">
                    <path d="M10,50 Q25,30 40,50 Q55,70 70,50 Q85,30 100,50" stroke-width="1"/>
                    <path d="M0,50 Q15,20 30,50 Q45,80 60,50 Q75,20 90,50" stroke-width="1"/>
                    <path d="M20,50 Q35,40 50,50 Q65,60 80,50" stroke-width="1"/>
                </g>
            `;
            break;
            
        case 'particles':
            effectContent = `
                <g fill="${color}" opacity="0.3">
                    <circle cx="10" cy="10" r="2"/>
                    <circle cx="30" cy="20" r="1.5"/>
                    <circle cx="50" cy="15" r="2.5"/>
                    <circle cx="70" cy="25" r="1"/>
                    <circle cx="90" cy="10" r="2"/>
                    
                    <circle cx="15" cy="40" r="1"/>
                    <circle cx="35" cy="50" r="2"/>
                    <circle cx="55" cy="45" r="1.5"/>
                    <circle cx="75" cy="55" r="2.5"/>
                    <circle cx="95" cy="40" r="1"/>
                    
                    <circle cx="10" cy="70" r="2.5"/>
                    <circle cx="30" cy="80" r="1"/>
                    <circle cx="50" cy="75" r="2"/>
                    <circle cx="70" cy="85" r="1.5"/>
                    <circle cx="90" cy="70" r="2"/>
                </g>
            `;
            break;
            
        case 'personalized':
            effectContent = `
                <defs>
                    <linearGradient id="personalizationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#4CAF50" stop-opacity="0.3"/>
                        <stop offset="50%" stop-color="#2196F3" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="#9C27B0" stop-opacity="0.3"/>
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#personalizationGradient)" opacity="0.5"/>
                <g stroke="#FFFFFF" fill="none" opacity="0.2">
                    <path d="M10,50 Q25,30 40,50 Q55,70 70,50 Q85,30 100,50" stroke-width="1"/>
                </g>
                <g fill="#FFFFFF" opacity="0.3">
                    <circle cx="10" cy="10" r="2"/>
                    <circle cx="50" cy="15" r="2.5"/>
                    <circle cx="90" cy="10" r="2"/>
                    <circle cx="35" cy="50" r="2"/>
                    <circle cx="75" cy="55" r="2.5"/>
                    <circle cx="10" cy="70" r="2.5"/>
                    <circle cx="50" cy="75" r="2"/>
                    <circle cx="90" cy="70" r="2"/>
                </g>
            `;
            break;
            
        case 'diamond-sparkle':
            effectContent = `
                <g fill="#00BCD4" opacity="0.3">
                    <circle cx="10" cy="10" r="3"/>
                    <circle cx="50" cy="15" r="4"/>
                    <circle cx="90" cy="10" r="3"/>
                    <circle cx="35" cy="50" r="3"/>
                    <circle cx="75" cy="55" r="4"/>
                    <circle cx="10" cy="70" r="4"/>
                    <circle cx="50" cy="75" r="3"/>
                    <circle cx="90" cy="70" r="3"/>
                </g>
                <g fill="#FFFFFF" opacity="0.5">
                    <circle cx="10" cy="10" r="1"/>
                    <circle cx="50" cy="15" r="1.5"/>
                    <circle cx="90" cy="10" r="1"/>
                    <circle cx="35" cy="50" r="1"/>
                    <circle cx="75" cy="55" r="1.5"/>
                    <circle cx="10" cy="70" r="1.5"/>
                    <circle cx="50" cy="75" r="1"/>
                    <circle cx="90" cy="70" r="1"/>
                </g>
            `;
            break;
            
        case 'gold-glow':
            effectContent = `
                <g fill="#FFC107" opacity="0.3">
                    <circle cx="10" cy="10" r="3"/>
                    <circle cx="50" cy="15" r="4"/>
                    <circle cx="90" cy="10" r="3"/>
                    <circle cx="35" cy="50" r="3"/>
                    <circle cx="75" cy="55" r="4"/>
                    <circle cx="10" cy="70" r="4"/>
                    <circle cx="50" cy="75" r="3"/>
                    <circle cx="90" cy="70" r="3"/>
                </g>
                <g fill="#FFFFFF" opacity="0.2">
                    <circle cx="10" cy="10" r="1"/>
                    <circle cx="50" cy="15" r="1.5"/>
                    <circle cx="90" cy="10" r="1"/>
                    <circle cx="35" cy="50" r="1"/>
                    <circle cx="75" cy="55" r="1.5"/>
                    <circle cx="10" cy="70" r="1.5"/>
                    <circle cx="50" cy="75" r="1"/>
                    <circle cx="90" cy="70" r="1"/>
                </g>
            `;
            break;
            
        default:
            effectContent = `
                <g fill="${color}" opacity="0.2">
                    <circle cx="20" cy="20" r="5"/>
                    <circle cx="50" cy="50" r="5"/>
                    <circle cx="80" cy="80" r="5"/>
                </g>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${effectContent}</svg>`;
}

// Generate icon SVGs
function generateIconSVG(type, color = '#1CB0F6') {
    let iconContent = '';
    
    switch(type) {
        case 'visual':
            iconContent = `
                <circle cx="50" cy="50" r="40" fill="${color}" opacity="0.2"/>
                <g fill="${color}">
                    <circle cx="35" cy="40" r="5"/>
                    <circle cx="65" cy="40" r="5"/>
                    <path d="M35,65 Q50,75 65,65" stroke="${color}" stroke-width="3" fill="none"/>
                </g>
            `;
            break;
            
        case 'auditory':
            iconContent = `
                <circle cx="50" cy="50" r="40" fill="${color}" opacity="0.2"/>
                <g fill="none" stroke="${color}" stroke-width="3">
                    <path d="M30,50 Q40,30 50,50 Q60,70 70,50"/>
                    <path d="M25,50 Q40,20 55,50 Q70,80 85,50"/>
                    <circle cx="50" cy="50" r="15" stroke-width="2"/>
                </g>
            `;
            break;
            
        case 'kinesthetic':
            iconContent = `
                <circle cx="50" cy="50" r="40" fill="${color}" opacity="0.2"/>
                <g fill="${color}">
                    <rect x="35" y="35" width="30" height="30" rx="5"/>
                    <circle cx="50" cy="50" r="10" fill="white"/>
                </g>
            `;
            break;
            
        case 'personalized':
            iconContent = `
                <circle cx="50" cy="50" r="40" fill="${color}" opacity="0.2"/>
                <g>
                    <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="${color}"/>
                    <path d="M40,40 L60,40 L60,60 L40,60 Z" fill="white"/>
                    <path d="M45,45 L55,45 L55,55 L45,55 Z" fill="${color}"/>
                </g>
            `;
            break;
            
        case 'streak':
            iconContent = `
                <circle cx="50" cy="50" r="40" fill="#FFD900" opacity="0.2"/>
                <g>
                    <path d="M30,50 L45,65 L70,35" stroke="#FFD900" stroke-width="5" fill="none"/>
                    <circle cx="50" cy="50" r="30" stroke="#FFD900" stroke-width="3" fill="none"/>
                </g>
            `;
            break;
            
        case 'gems':
            iconContent = `
                <circle cx="50" cy="50" r="40" fill="#A560F8" opacity="0.2"/>
                <g fill="#A560F8">
                    <polygon points="50,25 65,45 50,65 35,45"/>
                    <polygon points="50,25 65,45 50,65 35,45" fill="white" transform="scale(0.7) translate(22, 22)"/>
                </g>
            `;
            break;
            
        case 'league':
            iconContent = `
                <circle cx="50" cy="50" r="40" fill="#00BCD4" opacity="0.2"/>
                <g>
                    <circle cx="50" cy="50" r="25" fill="#00BCD4"/>
                    <path d="M50,25 L55,40 L70,40 L60,50 L65,65 L50,55 L35,65 L40,50 L30,40 L45,40 Z" fill="#FFFFFF"/>
                </g>
            `;
            break;
            
        default:
            iconContent = `
                <circle cx="50" cy="50" r="40" fill="${color}" opacity="0.2"/>
                <circle cx="50" cy="50" r="20" fill="${color}"/>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${iconContent}</svg>`;
}

// Generate Duo owl character SVG
function generateDuoSVG() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <g>
                <ellipse cx="50" cy="60" rx="30" ry="35" fill="#58CC02"/>
                <circle cx="50" cy="40" r="25" fill="#58CC02"/>
                
                <ellipse cx="35" cy="38" rx="10" ry="12" fill="white"/>
                <ellipse cx="65" cy="38" rx="10" ry="12" fill="white"/>
                
                <circle cx="35" cy="38" r="6" fill="#333333"/>
                <circle cx="65" cy="38" r="6" fill="#333333"/>
                
                <circle cx="37" cy="36" r="2" fill="white"/>
                <circle cx="67" cy="36" r="2" fill="white"/>
                
                <ellipse cx="50" cy="52" rx="10" ry="8" fill="#FFC65A"/>
                <path d="M50,45 L45,52 L55,52 Z" fill="#E3982B"/>
                
                <path d="M25,25 Q35,10 50,15 Q65,10 75,25" fill="none" stroke="#58CC02" stroke-width="5"/>
                <path d="M30,15 L25,0" fill="none" stroke="#58CC02" stroke-width="3"/>
                <path d="M70,15 L75,0" fill="none" stroke="#58CC02" stroke-width="3"/>
            </g>
        </svg>
    `;
}

// Generate persona avatar SVGs
function generatePersonaSVG(type, color = '#4CAF50') {
    let personaContent = '';
    
    switch(type) {
        case 'boy':
            personaContent = `
                <circle cx="50" cy="50" r="45" fill="${color}" opacity="0.2"/>
                <circle cx="50" cy="40" r="20" fill="#FFD9B3"/>
                <path d="M30,70 Q50,80 70,70" stroke="#FFD9B3" stroke-width="20" fill="none" stroke-linecap="round"/>
                <path d="M30,40 Q50,20 70,40" fill="#663300"/>
                <circle cx="40" cy="35" r="3" fill="#333333"/>
                <circle cx="60" cy="35" r="3" fill="#333333"/>
                <path d="M45,45 Q50,50 55,45" stroke="#333333" stroke-width="2" fill="none"/>
            `;
            break;
            
        case 'girl':
            personaContent = `
                <circle cx="50" cy="50" r="45" fill="${color}" opacity="0.2"/>
                <circle cx="50" cy="40" r="20" fill="#FFD9B3"/>
                <path d="M30,70 Q50,80 70,70" stroke="#FFD9B3" stroke-width="20" fill="none" stroke-linecap="round"/>
                <path d="M25,45 Q50,15 75,45" fill="#FF9900"/>
                <circle cx="40" cy="35" r="3" fill="#333333"/>
                <circle cx="60" cy="35" r="3" fill="#333333"/>
                <path d="M45,45 Q50,50 55,45" stroke="#333333" stroke-width="2" fill="none"/>
            `;
            break;
            
        case 'boy2':
            personaContent = `
                <circle cx="50" cy="50" r="45" fill="${color}" opacity="0.2"/>
                <circle cx="50" cy="40" r="20" fill="#FFD9B3"/>
                <path d="M30,70 Q50,80 70,70" stroke="#FFD9B3" stroke-width="20" fill="none" stroke-linecap="round"/>
                <path d="M35,30 Q50,10 65,30" fill="#333333"/>
                <circle cx="40" cy="35" r="3" fill="#333333"/>
                <circle cx="60" cy="35" r="3" fill="#333333"/>
                <path d="M45,45 Q50,50 55,45" stroke="#333333" stroke-width="2" fill="none"/>
            `;
            break;
            
        default:
            personaContent = `
                <circle cx="50" cy="50" r="45" fill="${color}" opacity="0.2"/>
                <circle cx="50" cy="40" r="20" fill="#FFD9B3"/>
                <circle cx="40" cy="35" r="3" fill="#333333"/>
                <circle cx="60" cy="35" r="3" fill="#333333"/>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${personaContent}</svg>`;
}

// Generate carpet example SVGs
function generateCarpetExampleSVG(type, color = '#4CAF50') {
    let carpetContent = '';
    
    switch(type) {
        case 'visual':
            carpetContent = `
                <rect x="10" y="20" width="80" height="60" rx="5" fill="${color}" opacity="0.8"/>
                <g fill="white" opacity="0.3">
                    <circle cx="20" cy="30" r="5"/>
                    <circle cx="40" cy="30" r="5"/>
                    <circle cx="60" cy="30" r="5"/>
                    <circle cx="80" cy="30" r="5"/>
                    
                    <circle cx="30" cy="50" r="5"/>
                    <circle cx="50" cy="50" r="5"/>
                    <circle cx="70" cy="50" r="5"/>
                    
                    <circle cx="20" cy="70" r="5"/>
                    <circle cx="40" cy="70" r="5"/>
                    <circle cx="60" cy="70" r="5"/>
                    <circle cx="80" cy="70" r="5"/>
                </g>
                <g stroke="yellow" stroke-width="2" opacity="0.5">
                    <line x1="20" y1="30" x2="20" y2="70"/>
                    <line x1="40" y1="30" x2="40" y2="70"/>
                    <line x1="60" y1="30" x2="60" y2="70"/>
                    <line x1="80" y1="30" x2="80" y2="70"/>
                </g>
            `;
            break;
            
        case 'auditory':
            carpetContent = `
                <rect x="10" y="20" width="80" height="60" rx="5" fill="${color}" opacity="0.8"/>
                <g stroke="white" fill="none" stroke-width="2" opacity="0.3">
                    <path d="M20,40 Q30,30 40,40 Q50,50 60,40 Q70,30 80,40"/>
                    <path d="M20,50 Q30,40 40,50 Q50,60 60,50 Q70,40 80,50"/>
                    <path d="M20,60 Q30,50 40,60 Q50,70 60,60 Q70,50 80,60"/>
                </g>
                <g fill="yellow" opacity="0.5">
                    <circle cx="20" cy="40" r="3"/>
                    <circle cx="40" cy="40" r="3"/>
                    <circle cx="60" cy="40" r="3"/>
                    <circle cx="80" cy="40" r="3"/>
                    
                    <circle cx="20" cy="50" r="3"/>
                    <circle cx="40" cy="50" r="3"/>
                    <circle cx="60" cy="50" r="3"/>
                    <circle cx="80" cy="50" r="3"/>
                    
                    <circle cx="20" cy="60" r="3"/>
                    <circle cx="40" cy="60" r="3"/>
                    <circle cx="60" cy="60" r="3"/>
                    <circle cx="80" cy="60" r="3"/>
                </g>
            `;
            break;
            
        case 'kinesthetic':
            carpetContent = `
                <rect x="10" y="20" width="80" height="60" rx="5" fill="${color}" opacity="0.8"/>
                <g fill="white" opacity="0.3">
                    <rect x="20" y="30" width="15" height="15" rx="2"/>
                    <rect x="45" y="30" width="15" height="15" rx="2"/>
                    <rect x="70" y="30" width="15" height="15" rx="2"/>
                    
                    <rect x="20" y="55" width="15" height="15" rx="2"/>
                    <rect x="45" y="55" width="15" height="15" rx="2"/>
                    <rect x="70" y="55" width="15" height="15" rx="2"/>
                </g>
                <g stroke="yellow" stroke-width="2" opacity="0.5">
                    <line x1="20" y1="40" x2="85" y2="40"/>
                    <line x1="20" y1="65" x2="85" y2="65"/>
                    <circle cx="27.5" cy="37.5" r="3" fill="yellow"/>
                    <circle cx="52.5" cy="37.5" r="3" fill="yellow"/>
                    <circle cx="77.5" cy="37.5" r="3" fill="yellow"/>
                    <circle cx="27.5" cy="62.5" r="3" fill="yellow"/>
                    <circle cx="52.5" cy="62.5" r="3" fill="yellow"/>
                    <circle cx="77.5" cy="62.5" r="3" fill="yellow"/>
                </g>
            `;
            break;
            
        default:
            carpetContent = `
                <rect x="10" y="20" width="80" height="60" rx="5" fill="${color}" opacity="0.8"/>
                <g fill="white" opacity="0.3">
                    <rect x="20" y="40" width="15" height="15" rx="2"/>
                    <rect x="45" y="40" width="15" height="15" rx="2"/>
                    <rect x="70" y="40" width="15" height="15" rx="2"/>
                </g>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${carpetContent}</svg>`;
}

// Generate carpet comparison SVGs
function generateCarpetCompareSVG(type) {
    let carpetContent = '';
    
    switch(type) {
        case 'free':
            carpetContent = `
                <rect x="10" y="20" width="80" height="60" rx="5" fill="#1CB0F6" opacity="0.8"/>
                <g fill="white" opacity="0.4">
                    <rect x="20" y="30" width="10" height="10"/>
                    <rect x="40" y="30" width="10" height="10"/>
                    <rect x="60" y="30" width="10" height="10"/>
                    
                    <rect x="30" y="45" width="10" height="10"/>
                    <rect x="50" y="45" width="10" height="10"/>
                    <rect x="70" y="45" width="10" height="10"/>
                    
                    <rect x="20" y="60" width="10" height="10"/>
                    <rect x="40" y="60" width="10" height="10"/>
                    <rect x="60" y="60" width="10" height="10"/>
                </g>
                <g stroke="#BDBDBD" stroke-width="1" opacity="0.5">
                    <line x1="20" y1="35" x2="20" y2="65"/>
                    <line x1="40" y1="35" x2="40" y2="65"/>
                    <line x1="60" y1="35" x2="60" y2="65"/>
                    <line x1="80" y1="35" x2="80" y2="65"/>
                </g>
                <text x="35" y="15" font-family="Arial" font-size="10" fill="#757575">Free Version</text>
            `;
            break;
            
        case 'premium':
            carpetContent = `
                <rect x="10" y="20" width="80" height="60" rx="5" fill="#FFD900" opacity="0.8"/>
                <g fill="white" opacity="0.4">
                    <rect x="20" y="30" width="10" height="10"/>
                    <rect x="40" y="30" width="10" height="10"/>
                    <rect x="60" y="30" width="10" height="10"/>
                    
                    <rect x="30" y="45" width="10" height="10"/>
                    <rect x="50" y="45" width="10" height="10"/>
                    <rect x="70" y="45" width="10" height="10"/>
                    
                    <rect x="20" y="60" width="10" height="10"/>
                    <rect x="40" y="60" width="10" height="10"/>
                    <rect x="60" y="60" width="10" height="10"/>
                </g>
                <g stroke="#FFC107" stroke-width="2" opacity="0.7">
                    <line x1="20" y1="35" x2="20" y2="65"/>
                    <line x1="40" y1="35" x2="40" y2="65"/>
                    <line x1="60" y1="35" x2="60" y2="65"/>
                    <line x1="80" y1="35" x2="80" y2="65"/>
                </g>
                <g fill="#FFC107" opacity="0.7">
                    <circle cx="20" cy="35" r="3"/>
                    <circle cx="40" cy="35" r="3"/>
                    <circle cx="60" cy="35" r="3"/>
                    <circle cx="80" cy="35" r="3"/>
                    <circle cx="20" cy="65" r="3"/>
                    <circle cx="40" cy="65" r="3"/>
                    <circle cx="60" cy="65" r="3"/>
                    <circle cx="80" cy="65" r="3"/>
                </g>
                <text x="30" y="15" font-family="Arial" font-size="10" fill="#7E6500">Premium Version</text>
            `;
            break;
            
        default:
            carpetContent = `
                <rect x="10" y="20" width="80" height="60" rx="5" fill="#1CB0F6" opacity="0.8"/>
                <text x="35" y="15" font-family="Arial" font-size="10" fill="#757575">Carpet</text>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${carpetContent}</svg>`;
}

// Generate premium feature SVGs
function generatePremiumFeatureSVG(type) {
    let featureContent = '';
    
    switch(type) {
        case 'patterns':
            featureContent = `
                <rect x="10" y="10" width="35" height="35" rx="5" fill="#BDBDBD" opacity="0.5"/>
                <rect x="55" y="10" width="35" height="35" rx="5" fill="#FFD900" opacity="0.5"/>
                <rect x="10" y="55" width="35" height="35" rx="5" fill="#BDBDBD" opacity="0.5"/>
                <rect x="55" y="55" width="35" height="35" rx="5" fill="#FFD900" opacity="0.5"/>
                
                <g stroke="#757575" stroke-width="1" opacity="0.6">
                    <line x1="20" y1="15" x2="20" y2="40"/>
                    <line x1="35" y1="15" x2="35" y2="40"/>
                    <line x1="20" y1="60" x2="20" y2="85"/>
                    <line x1="35" y1="60" x2="35" y2="85"/>
                </g>
                
                <g stroke="#FFC107" stroke-width="2" opacity="0.8">
                    <line x1="65" y1="15" x2="65" y2="40"/>
                    <line x1="80" y1="15" x2="80" y2="40"/>
                    <line x1="65" y1="60" x2="65" y2="85"/>
                    <line x1="80" y1="60" x2="80" y2="85"/>
                </g>
                
                <g fill="#FFC107" opacity="0.8">
                    <circle cx="65" cy="20" r="3"/>
                    <circle cx="65" cy="35" r="3"/>
                    <circle cx="80" cy="20" r="3"/>
                    <circle cx="80" cy="35" r="3"/>
                    
                    <circle cx="65" cy="65" r="3"/>
                    <circle cx="65" cy="80" r="3"/>
                    <circle cx="80" cy="65" r="3"/>
                    <circle cx="80" cy="80" r="3"/>
                </g>
                
                <text x="18" y="27" font-family="Arial" font-size="6" fill="#333333">Basic</text>
                <text x="63" y="27" font-family="Arial" font-size="6" fill="#7E6500">Premium</text>
            `;
            break;
            
        case 'colors':
            featureContent = `
                <circle cx="30" cy="30" r="20" fill="#1CB0F6"/>
                <circle cx="70" cy="30" r="20" fill="#FFD900"/>
                <circle cx="30" cy="70" r="20" fill="#58CC02"/>
                <circle cx="70" cy="70" r="20" fill="#FF9800"/>
                
                <text x="23" y="33" font-family="Arial" font-size="8" fill="white">Basic</text>
                <text x="58" y="33" font-family="Arial" font-size="8" fill="#7E6500">Gold</text>
                <text x="23" y="73" font-family="Arial" font-size="8" fill="white">Basic</text>
                <text x="58" y="73" font-family="Arial" font-size="8" fill="white">Premium</text>
                
                <circle cx="70" cy="30" r="24" stroke="#FFC107" stroke-width="2" fill="none"/>
                <circle cx="70" cy="70" r="24" stroke="#FF7043" stroke-width="2" fill="none"/>
            `;
            break;
            
        case 'threads':
            featureContent = `
                <rect x="10" y="40" width="80" height="20" rx="5" fill="#EEEEEE"/>
                
                <g stroke="#BDBDBD" stroke-width="1" opacity="0.8">
                    <line x1="20" y1="25" x2="20" y2="75"/>
                    <line x1="40" y1="25" x2="40" y2="75"/>
                </g>
                
                <g stroke="#FFD900" stroke-width="2" opacity="0.8">
                    <line x1="60" y1="25" x2="60" y2="75"/>
                    <line x1="80" y1="25" x2="80" y2="75"/>
                </g>
                
                <g fill="#BDBDBD" opacity="0.8">
                    <circle cx="20" cy="35" r="2"/>
                    <circle cx="20" cy="50" r="2"/>
                    <circle cx="20" cy="65" r="2"/>
                    
                    <circle cx="40" cy="35" r="2"/>
                    <circle cx="40" cy="50" r="2"/>
                    <circle cx="40" cy="65" r="2"/>
                </g>
                
                <g fill="#FFC107" opacity="0.9">
                    <circle cx="60" cy="35" r="3"/>
                    <circle cx="60" cy="50" r="3"/>
                    <circle cx="60" cy="65" r="3"/>
                    
                    <circle cx="80" cy="35" r="3"/>
                    <circle cx="80" cy="50" r="3"/>
                    <circle cx="80" cy="65" r="3"/>
                </g>
                
                <text x="17" y="20" font-family="Arial" font-size="6" fill="#757575">Standard</text>
                <text x="57" y="20" font-family="Arial" font-size="6" fill="#7E6500">Premium</text>
            `;
            break;
            
        case 'learning':
            featureContent = `
                <rect x="10" y="10" width="35" height="35" rx="5" fill="#EEEEEE"/>
                <rect x="55" y="10" width="35" height="35" rx="5" fill="#EEEEEE"/>
                <rect x="10" y="55" width="35" height="35" rx="5" fill="#EEEEEE"/>
                <rect x="55" y="55" width="35" height="35" rx="5" fill="#FFF8E1"/>
                
                <text x="15" y="25" font-family="Arial" font-size="6" fill="#333333">Visual</text>
                <text x="60" y="25" font-family="Arial" font-size="6" fill="#333333">Auditory</text>
                <text x="15" y="70" font-family="Arial" font-size="6" fill="#333333">Kinesthetic</text>
                <text x="60" y="70" font-family="Arial" font-size="6" fill="#7E6500">Adaptive</text>
                
                <g fill="#333333" opacity="0.6">
                    <circle cx="20" cy="35" r="5"/>
                    <rect x="65" y="30" width="15" height="2" rx="1"/>
                    <rect x="65" y="35" width="15" height="2" rx="1"/>
                    <rect x="65" y="40" width="15" height="2" rx="1"/>
                    <path d="M20,75 Q25,80 30,75" stroke="#333333" stroke-width="2" fill="none"/>
                </g>
                
                <g stroke="#FFD900" stroke-width="2" opacity="0.8">
                    <circle cx="65" cy="75" r="8" fill="none"/>
                    <circle cx="75" cy="75" r="3" fill="#FFD900"/>
                    <circle cx="85" cy="75" r="5" fill="none"/>
                </g>
            `;
            break;
            
        case 'league':
            featureContent = `
                <rect x="10" y="60" width="20" height="30" rx="5" fill="#CD7F32" opacity="0.8"/>
                <rect x="40" y="50" width="20" height="40" rx="5" fill="#9E9E9E" opacity="0.8"/>
                <rect x="70" y="30" width="20" height="60" rx="5" fill="#00BCD4" opacity="0.8"/>
                
                <text x="11" y="75" font-family="Arial" font-size="5" fill="white">Bronze</text>
                <text x="42" y="75" font-family="Arial" font-size="5" fill="white">Silver</text>
                <text x="72" y="75" font-family="Arial" font-size="5" fill="white">Diamond</text>
                
                <line x1="0" y1="90" x2="100" y2="90" stroke="#757575" stroke-width="1" stroke-dasharray="2,2"/>
                <line x1="80" y1="25" x2="80" y2="90" stroke="#00BCD4" stroke-width="1" stroke-dasharray="2,2"/>
                
                <g fill="#FFC107" opacity="0.6">
                    <circle cx="80" cy="25" r="5"/>
                    <circle cx="80" cy="20" r="3"/>
                    <circle cx="80" cy="15" r="2"/>
                </g>
            `;
            break;
            
        default:
            featureContent = `
                <rect x="20" y="20" width="60" height="60" rx="10" fill="#FFD900" opacity="0.5"/>
                <text x="33" y="55" font-family="Arial" font-size="12" fill="#7E6500">Premium</text>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${featureContent}</svg>`;
}

// Generate achievement SVGs
function generateAchievementSVG(type) {
    let achievementContent = '';
    
    switch(type) {
        case 'streak':
            achievementContent = `
                <rect x="10" y="30" width="80" height="40" rx="5" fill="#1CB0F6" opacity="0.5"/>
                
                <g stroke="#BDBDBD" stroke-width="1" opacity="0.5">
                    <line x1="20" y1="25" x2="20" y2="75"/>
                    <line x1="35" y1="25" x2="35" y2="75"/>
                    <line x1="50" y1="25" x2="50" y2="75"/>
                </g>
                
                <g stroke="#FFD900" stroke-width="2" opacity="0.7">
                    <line x1="65" y1="25" x2="65" y2="75"/>
                    <line x1="80" y1="25" x2="80" y2="75"/>
                </g>
                
                <text x="15" y="20" font-family="Arial" font-size="6" fill="#757575">Day 1</text>
                <text x="30" y="20" font-family="Arial" font-size="6" fill="#757575">Day 2</text>
                <text x="45" y="20" font-family="Arial" font-size="6" fill="#757575">Day 3</text>
                <text x="60" y="20" font-family="Arial" font-size="6" fill="#7E6500">Day 4</text>
                <text x="75" y="20" font-family="Arial" font-size="6" fill="#7E6500">Day 5</text>
                
                <g fill="#FFC107" opacity="0.7">
                    <circle cx="65" cy="35" r="3"/>
                    <circle cx="65" cy="50" r="3"/>
                    <circle cx="65" cy="65" r="3"/>
                    
                    <circle cx="80" cy="35" r="3"/>
                    <circle cx="80" cy="50" r="3"/>
                    <circle cx="80" cy="65" r="3"/>
                </g>
            `;
            break;
            
        case 'gems':
            achievementContent = `
                <rect x="10" y="30" width="80" height="40" rx="5" fill="#1CB0F6" opacity="0.5"/>
                
                <g fill="#A560F8" opacity="0.7">
                    <polygon points="20,40 25,45 20,50 15,45" />
                    <polygon points="35,45 40,50 35,55 30,50" />
                    <polygon points="50,40 55,45 50,50 45,45" />
                </g>
                
                <g fill="#FFC107" opacity="0.8">
                    <polygon points="65,40 72,47 65,54 58,47" />
                    <polygon points="85,45 90,50 85,55 80,50" />
                </g>
                
                <g fill="#FFFFFF" opacity="0.9">
                    <circle cx="20" cy="40" r="1"/>
                    <circle cx="35" cy="45" r="1"/>
                    <circle cx="50" cy="40" r="1"/>
                    <circle cx="65" cy="40" r="1.5"/>
                    <circle cx="85" cy="45" r="1"/>
                </g>
                
                <text x="20" y="65" font-family="Arial" font-size="5" fill="#333333">0-50 gems</text>
                <text x="60" y="65" font-family="Arial" font-size="5" fill="#7E6500">50+ gems</text>
            `;
            break;
            
        case 'league':
            achievementContent = `
                <rect x="10" y="10" width="15" height="80" rx="2" fill="#F5F5F5"/>
                <rect x="40" y="40" width="15" height="50" rx="2" fill="#CD7F32" opacity="0.8"/>
                <rect x="60" y="30" width="15" height="60" rx="2" fill="#9E9E9E" opacity="0.8"/>
                <rect x="80" y="15" width="15" height="75" rx="2" fill="#00BCD4" opacity="0.8"/>
                
                <line x1="0" y1="90" x2="100" y2="90" stroke="#757575" stroke-width="1"/>
                
                <text x="35" y="35" font-family="Arial" font-size="5" fill="#333333">Bronze</text>
                <text x="55" y="25" font-family="Arial" font-size="5" fill="#333333">Silver</text>
                <text x="75" y="10" font-family="Arial" font-size="5" fill="#333333">Diamond</text>
                
                <g fill="#FFC107" opacity="0.7">
                    <circle cx="45" cy="45" r="3"/>
                    <circle cx="65" cy="35" r="3"/>
                    <circle cx="85" cy="20" r="3"/>
                </g>
            `;
            break;
            
        default:
            achievementContent = `
                <rect x="20" y="20" width="60" height="60" rx="10" fill="#FFD900" opacity="0.5"/>
                <text x="25" y="55" font-family="Arial" font-size="10" fill="#7E6500">Achievement</text>
            `;
    }
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${achievementContent}</svg>`;
}

// Default SVG
function generateDefaultSVG() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100%" height="100%" fill="#EEEEEE"/>
            <text x="20" y="55" font-family="Arial" font-size="10" fill="#757575">Image Placeholder</text>
        </svg>
    `;
}