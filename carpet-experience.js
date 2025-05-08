/**
 * Magic Carpet Experience - Interactive Functionality
 * Part of Duolingo Digital Marketing Campaign Portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Main elements
    const carpetVisual = document.getElementById('carpet-visual');
    const carpetBase = document.querySelector('.carpet-base');
    const carpetPattern = document.querySelector('.carpet-pattern');
    const carpetOverlay = document.querySelector('.carpet-overlay');
    const carpetThreads = document.querySelector('.carpet-threads');
    const carpetGems = document.querySelector('.carpet-gems');
    const carpetLeagueEffects = document.querySelector('.carpet-league-effects');
    const duoCharacter = document.querySelector('.duo-character');
    
    // Tabs and content
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Customization options
    const patternOptions = document.querySelectorAll('.pattern-option');
    const colorOptions = document.querySelectorAll('.color-option');
    const threadOptions = document.querySelectorAll('.thread-option');
    const learningStyleOptions = document.querySelectorAll('.learning-style-option');
    const leagueOptions = document.querySelectorAll('.league-option');
    
    // Premium elements
    const premiumElements = document.querySelectorAll('.premium');
    const premiumOverlay = document.getElementById('premium-overlay');
    const closeModalButtons = document.querySelectorAll('.close-modal, .close-modal-button');
    const premiumFeatureImage = document.getElementById('premium-feature-image');
    const premiumFeatureDescription = document.getElementById('premium-feature-description');
    
    // Counters
    const streakCounter = document.getElementById('streak-counter');
    const gemCounter = document.getElementById('gem-counter');
    
    // Journey nodes
    const journeyNodes = document.querySelectorAll('.journey-node');
    
    // Current state
    let currentState = {
        pattern: 'geometric',
        color: 'blue',
        thread: 'standard',
        learningStyle: 'visual',
        league: 'bronze',
        streak: 7,
        gems: 145,
        currentJourneyNode: 2,
        isPremium: false
    };
    
    // Pattern assets
    const patterns = {
        classic: {
            url: 'url("images/patterns/classic.svg")',
            premium: false
        },
        geometric: {
            url: 'url("images/patterns/geometric.svg")',
            premium: false
        },
        floral: {
            url: 'url("images/patterns/floral.svg")',
            premium: false
        },
        arabesque: {
            url: 'url("images/patterns/arabesque.svg")',
            premium: true
        },
        royal: {
            url: 'url("images/patterns/royal.svg")',
            premium: true
        }
    };
    
    // Color assets
    const colors = {
        purple: {
            primary: '#A560F8',
            secondary: '#8A4AD0',
            premium: false
        },
        blue: {
            primary: '#1CB0F6',
            secondary: '#0F8BC0',
            premium: false
        },
        green: {
            primary: '#58CC02',
            secondary: '#46A302',
            premium: false
        },
        gold: {
            primary: '#FFD900',
            secondary: '#E6C200',
            premium: true
        },
        orange: {
            primary: '#FF9600',
            secondary: '#E67E00',
            premium: true
        }
    };
    
    // Thread assets
    const threads = {
        standard: {
            url: 'url("images/threads/standard.svg")',
            premium: false,
            animation: 'none'
        },
        silver: {
            url: 'url("images/threads/silver.svg")',
            premium: false,
            animation: 'threadGlimmer 3s infinite'
        },
        gold: {
            url: 'url("images/threads/gold.svg")',
            premium: true,
            animation: 'threadGlimmer 2s infinite'
        },
        magical: {
            url: 'url("images/threads/magical.svg")',
            premium: true,
            animation: 'threadMagic 4s infinite'
        }
    };
    
    // Learning style assets
    const learningStyles = {
        visual: {
            carpetEffect: 'visualLearnerEffect',
            premium: false
        },
        auditory: {
            carpetEffect: 'auditoryLearnerEffect',
            premium: false
        },
        kinesthetic: {
            carpetEffect: 'kinestheticLearnerEffect',
            premium: false
        },
        personalized: {
            carpetEffect: 'personalizedLearnerEffect',
            premium: true
        }
    };
    
    // League assets
    const leagues = {
        bronze: {
            height: '10px',
            flyAnimation: 'hoverLow 4s infinite ease-in-out',
            premium: false
        },
        silver: {
            height: '30px',
            flyAnimation: 'hoverMedium 4s infinite ease-in-out',
            premium: false
        },
        gold: {
            height: '50px',
            flyAnimation: 'hoverHigh 4s infinite ease-in-out',
            premium: false
        },
        diamond: {
            height: '80px',
            flyAnimation: 'soarHigh 4s infinite ease-in-out',
            premium: true
        }
    };
    
    // Premium feature descriptions
    const premiumFeatures = {
        pattern: {
            image: 'images/premium/premium-patterns.svg',
            description: 'Unlock exclusive premium patterns that transform as you learn. Our Arabesque and Royal patterns are designed by language experts to reinforce learning through visual mnemonics.'
        },
        color: {
            image: 'images/premium/premium-colors.svg',
            description: 'Access our special Gold and Orange color palettes. These premium colors include animated effects that respond to your learning achievements.'
        },
        thread: {
            image: 'images/premium/premium-threads.svg',
            description: 'Premium magical threads add shimmering effects that pulse with your learning progress. Each golden thread represents a day of your learning streak.'
        },
        learningStyle: {
            image: 'images/premium/premium-learning.svg',
            description: 'Our adaptive learning technology automatically personalizes your carpet based on how you learn best, combining visual, auditory, and kinesthetic elements.'
        },
        league: {
            image: 'images/premium/premium-league.svg',
            description: 'Diamond League members can fly their carpets to exclusive destinations. Soar through clouds and access special landscapes unavailable to free users.'
        }
    };
    
    // Initialize the carpet
    function initializeCarpet() {
        updateCarpetPattern();
        updateCarpetColor();
        updateCarpetThreads();
        updateLearningStyleEffect();
        updateLeagueHeight();
        updateStreakDisplay();
        updateGemDisplay();
        updateJourneyNodes();
        
        // Start the carpet floating animation
        startCarpetAnimation();
    }
    
    // Pattern selection
    function updateCarpetPattern() {
        const pattern = patterns[currentState.pattern];
        
        if (pattern) {
            carpetPattern.style.backgroundImage = pattern.url;
            carpetPattern.style.opacity = '1';
            
            // Add pattern-specific animations or effects
            carpetPattern.className = 'carpet-pattern';
            carpetPattern.classList.add(`pattern-${currentState.pattern}`);
        }
    }
    
    // Color selection
    function updateCarpetColor() {
        const color = colors[currentState.color];
        
        if (color) {
            carpetBase.style.backgroundColor = color.primary;
            carpetPattern.style.filter = `drop-shadow(0 0 3px ${color.secondary})`;
            
            // Apply color-specific effects
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('active');
                if (option.dataset.color === currentState.color) {
                    option.classList.add('active');
                }
            });
        }
    }
    
    // Thread selection
    function updateCarpetThreads() {
        const thread = threads[currentState.thread];
        
        if (thread) {
            carpetThreads.style.backgroundImage = thread.url;
            carpetThreads.style.animation = thread.animation;
            
            // Generate thread pattern based on streak
            generateThreadPattern(currentState.streak);
        }
    }
    
    // Generate thread pattern based on streak count
    function generateThreadPattern(streakCount) {
        // Clear existing threads
        carpetThreads.innerHTML = '';
        
        // Create a visual representation of streak threads
        for (let i = 0; i < Math.min(streakCount, 30); i++) {
            const thread = document.createElement('div');
            thread.className = 'streak-thread';
            thread.style.left = `${Math.random() * 100}%`;
            thread.style.top = `${Math.random() * 100}%`;
            thread.style.transform = `rotate(${Math.random() * 360}deg)`;
            thread.style.width = `${2 + Math.random() * 3}px`;
            thread.style.height = `${20 + Math.random() * 30}px`;
            
            // Add animation delay for staggered effect
            thread.style.animationDelay = `${i * 0.1}s`;
            
            // Make threads gold if premium thread is selected
            if (currentState.thread === 'gold' || currentState.thread === 'magical') {
                thread.classList.add('golden-thread');
            } else if (currentState.thread === 'silver') {
                thread.classList.add('silver-thread');
            }
            
            carpetThreads.appendChild(thread);
        }
    }
    
    // Learning style effect
    function updateLearningStyleEffect() {
        const style = learningStyles[currentState.learningStyle];
        
        if (style) {
            // Reset classes
            carpetVisual.className = 'carpet-visual';
            carpetVisual.classList.add(style.carpetEffect);
            
            // Update active learning style
            document.querySelectorAll('.learning-style-option').forEach(option => {
                option.classList.remove('active');
                if (option.dataset.style === currentState.learningStyle) {
                    option.classList.add('active');
                }
            });
            
            // Apply specific effects based on learning style
            if (currentState.learningStyle === 'visual') {
                carpetPattern.style.filter += ' saturate(1.3)';
            } else if (currentState.learningStyle === 'auditory') {
                // Add subtle wave animation to the carpet
                carpetOverlay.style.backgroundImage = 'url("images/effects/sound-waves.svg")';
                carpetOverlay.style.animation = 'soundWave 3s infinite';
            } else if (currentState.learningStyle === 'kinesthetic') {
                // Add interactive particle effect
                carpetOverlay.style.backgroundImage = 'url("images/effects/interactive-particles.svg")';
                carpetOverlay.style.animation = 'particleFlow 5s infinite';
            } else if (currentState.learningStyle === 'personalized') {
                // Combine all effects for personalized experience
                carpetPattern.style.filter += ' saturate(1.2)';
                carpetOverlay.style.backgroundImage = 'url("images/effects/personalized-blend.svg")';
                carpetOverlay.style.animation = 'personalizedEffect 8s infinite';
            }
        }
    }
    
    // League height and flying effects
    function updateLeagueHeight() {
        const league = leagues[currentState.league];
        
        if (league) {
            // Adjust carpet height
            carpetVisual.style.bottom = league.height;
            carpetVisual.style.animation = league.flyAnimation;
            
            // Update shadow based on height
            const shadow = document.querySelector('.carpet-shadow');
            const heightValue = parseInt(league.height);
            shadow.style.opacity = Math.max(0.1, 0.5 - (heightValue / 100));
            shadow.style.transform = `scale(${1 + (heightValue / 100)})`;
            
            // League-specific effects
            if (currentState.league === 'diamond') {
                carpetLeagueEffects.style.backgroundImage = 'url("images/effects/diamond-sparkle.svg")';
                carpetLeagueEffects.style.animation = 'diamondSparkle 3s infinite';
            } else if (currentState.league === 'gold') {
                carpetLeagueEffects.style.backgroundImage = 'url("images/effects/gold-glow.svg")';
                carpetLeagueEffects.style.animation = 'goldGlow 4s infinite';
            } else {
                carpetLeagueEffects.style.backgroundImage = 'none';
                carpetLeagueEffects.style.animation = 'none';
            }
            
            // Update active league option
            document.querySelectorAll('.league-option').forEach(option => {
                option.classList.remove('active');
                if (option.dataset.league === currentState.league) {
                    option.classList.add('active');
                }
            });
        }
    }
    
    // Update streak counter display
    function updateStreakDisplay() {
        if (streakCounter) {
            streakCounter.textContent = currentState.streak;
            
            // Visual feedback for streak changes
            streakCounter.classList.add('counter-updated');
            setTimeout(() => {
                streakCounter.classList.remove('counter-updated');
            }, 500);
        }
    }
    
    // Update gem counter display
    function updateGemDisplay() {
        if (gemCounter) {
            gemCounter.textContent = currentState.gems;
            
            // Visual feedback for gem changes
            gemCounter.classList.add('counter-updated');
            setTimeout(() => {
                gemCounter.classList.remove('counter-updated');
            }, 500);
        }
        
        // Update gem displays on carpet
        updateCarpetGems();
    }
    
    // Generate gem displays on carpet
    function updateCarpetGems() {
        // Clear existing gems
        carpetGems.innerHTML = '';
        
        // Only show up to 20 gems max for visual clarity
        const visibleGems = Math.min(Math.floor(currentState.gems / 10), 20);
        
        for (let i = 0; i < visibleGems; i++) {
            const gem = document.createElement('div');
            gem.className = 'carpet-gem';
            
            // Randomize position
            gem.style.left = `${10 + Math.random() * 80}%`;
            gem.style.top = `${10 + Math.random() * 80}%`;
            
            // Randomize gem color based on current carpet color
            const gemColors = ['blue', 'green', 'purple', 'gold'];
            const gemColor = gemColors[Math.floor(Math.random() * gemColors.length)];
            gem.classList.add(`gem-${gemColor}`);
            
            // Animation delay for staggered appearance
            gem.style.animationDelay = `${i * 0.2}s`;
            
            carpetGems.appendChild(gem);
        }
    }
    
    // Update journey node displays
    function updateJourneyNodes() {
        journeyNodes.forEach(node => {
            const nodeId = parseInt(node.dataset.node);
            
            // Reset all states
            node.classList.remove('completed', 'active', 'next');
            
            if (nodeId < currentState.currentJourneyNode) {
                node.classList.add('completed');
            } else if (nodeId === currentState.currentJourneyNode) {
                node.classList.add('active');
            } else if (nodeId === currentState.currentJourneyNode + 1) {
                node.classList.add('next');
            }
            
            // Handle premium nodes
            if (node.classList.contains('premium') && !currentState.isPremium) {
                node.classList.add('locked');
            } else {
                node.classList.remove('locked');
            }
        });
    }
    
    // Start carpet flying animation
    function startCarpetAnimation() {
        // Initial floating animation
        carpetVisual.style.animation = leagues[currentState.league].flyAnimation;
        
        // Make Duo character float alongside
        duoCharacter.style.animation = 'duoFloat 5s infinite ease-in-out';
    }
    
    // Tab switching functionality
    function setupTabSwitching() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show selected tab content
                const tabId = this.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Pattern selection events
    function setupPatternSelection() {
        patternOptions.forEach(option => {
            option.addEventListener('click', function() {
                const pattern = this.getAttribute('data-pattern');
                
                // Check if premium feature
                if (patterns[pattern].premium && !currentState.isPremium) {
                    showPremiumOverlay('pattern');
                    return;
                }
                
                // Update state and visual
                currentState.pattern = pattern;
                
                // Update active state
                patternOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update carpet
                updateCarpetPattern();
                
                // Add magical transition effect
                addMagicalTransition();
            });
        });
    }
    
    // Color selection events
    function setupColorSelection() {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                
                // Check if premium feature
                if (colors[color].premium && !currentState.isPremium) {
                    showPremiumOverlay('color');
                    return;
                }
                
                // Update state and visual
                currentState.color = color;
                
                // Update active state
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update carpet
                updateCarpetColor();
                
                // Add magical transition effect
                addMagicalTransition();
            });
        });
    }
    
    // Thread selection events
    function setupThreadSelection() {
        threadOptions.forEach(option => {
            option.addEventListener('click', function() {
                const thread = this.getAttribute('data-thread');
                
                // Check if premium feature
                if (threads[thread].premium && !currentState.isPremium) {
                    showPremiumOverlay('thread');
                    return;
                }
                
                // Update state and visual
                currentState.thread = thread;
                
                // Update active state
                threadOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update carpet
                updateCarpetThreads();
                
                // Add magical transition effect
                addMagicalTransition();
            });
        });
    }
    
    // Learning style selection events
    function setupLearningStyleSelection() {
        learningStyleOptions.forEach(option => {
            option.addEventListener('click', function() {
                const style = this.getAttribute('data-style');
                
                // Check if premium feature
                if (learningStyles[style].premium && !currentState.isPremium) {
                    showPremiumOverlay('learningStyle');
                    return;
                }
                
                // Update state and visual
                currentState.learningStyle = style;
                
                // Update active state
                learningStyleOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update carpet
                updateLearningStyleEffect();
                
                // Add magical transition effect
                addMagicalTransition();
            });
        });
    }
    
    // League selection events
    function setupLeagueSelection() {
        leagueOptions.forEach(option => {
            option.addEventListener('click', function() {
                const league = this.getAttribute('data-league');
                
                // Check if premium feature
                if (leagues[league].premium && !currentState.isPremium) {
                    showPremiumOverlay('league');
                    return;
                }
                
                // Update state and visual
                currentState.league = league;
                
                // Update active state
                leagueOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Update carpet
                updateLeagueHeight();
                
                // Add magical transition effect
                addMagicalTransition();
            });
        });
    }
    
    // Journey node events
    function setupJourneyNodes() {
        journeyNodes.forEach(node => {
            node.addEventListener('click', function() {
                const nodeId = parseInt(this.dataset.node);
                
                // Prevent clicking on premium nodes if not premium
                if (this.classList.contains('premium') && !currentState.isPremium) {
                    showPremiumOverlay('journey');
                    return;
                }
                
                // Can only advance to next node
                if (nodeId !== currentState.currentJourneyNode + 1) {
                    return;
                }
                
                // Update current node
                currentState.currentJourneyNode = nodeId;
                updateJourneyNodes();
                
                // Reward gems for advancing
                currentState.gems += 25;
                updateGemDisplay();
                
                // Special effects for node completion
                carpetVisual.classList.add('level-up');
                setTimeout(() => {
                    carpetVisual.classList.remove('level-up');
                }, 1500);
            });
        });
    }
    
    // Interactive streak counter
    function setupStreakCounter() {
        // Click to increment streak (for demo purposes)
        if (streakCounter) {
            streakCounter.addEventListener('click', function() {
                // Increment streak
                currentState.streak++;
                updateStreakDisplay();
                
                // Update threads with new streak count
                updateCarpetThreads();
                
                // Special visual effect for streak increase
                carpetThreads.classList.add('streak-increased');
                setTimeout(() => {
                    carpetThreads.classList.remove('streak-increased');
                }, 1500);
            });
        }
    }
    
    // Interactive gem counter
    function setupGemCounter() {
        // Click to increment gems (for demo purposes)
        if (gemCounter) {
            gemCounter.addEventListener('click', function() {
                // Increment gems
                currentState.gems += 10;
                updateGemDisplay();
                
                // Special visual effect for gem increase
                carpetGems.classList.add('gems-increased');
                setTimeout(() => {
                    carpetGems.classList.remove('gems-increased');
                }, 1500);
            });
        }
    }
    
    // Premium overlay functionality
    function setupPremiumOverlay() {
        premiumElements.forEach(element => {
            if (!element.closest('.league-option') && 
                !element.closest('.pattern-option') && 
                !element.closest('.thread-option') && 
                !element.closest('.learning-style-option') &&
                !element.closest('.color-option') &&
                !element.closest('.journey-node')) {
                
                element.addEventListener('click', function() {
                    // Determine feature type from context
                    let featureType = 'pattern';
                    
                    if (this.classList.contains('premium-badge')) {
                        const parent = this.parentElement;
                        if (parent.classList.contains('pattern-option')) {
                            featureType = 'pattern';
                        } else if (parent.classList.contains('thread-option')) {
                            featureType = 'thread';
                        } else if (parent.classList.contains('learning-style-option')) {
                            featureType = 'learningStyle';
                        } else if (parent.classList.contains('league-option')) {
                            featureType = 'league';
                        } else if (parent.classList.contains('color-option')) {
                            featureType = 'color';
                        }
                    }
                    
                    showPremiumOverlay(featureType);
                });
            }
        });
        
        // Close premium modal
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                premiumOverlay.classList.remove('visible');
            });
        });
    }
    
    // Show premium upgrade overlay
    function showPremiumOverlay(featureType) {
        // Set specific feature content
        const feature = premiumFeatures[featureType] || premiumFeatures.pattern;
        
        if (premiumFeatureImage) {
            premiumFeatureImage.src = feature.image;
        }
        
        if (premiumFeatureDescription) {
            premiumFeatureDescription.textContent = feature.description;
        }
        
        // Show overlay
        premiumOverlay.classList.add('visible');
    }
    
    // Add magical transition effect
    function addMagicalTransition() {
        carpetVisual.classList.add('magical-transition');
        setTimeout(() => {
            carpetVisual.classList.remove('magical-transition');
        }, 1000);
    }
    
    // Interactive carpet effects
    function setupInteractiveCarpet() {
        carpetVisual.addEventListener('mousemove', function(e) {
            // Only add tilt effect if using kinesthetic learning style
            if (currentState.learningStyle === 'kinesthetic') {
                // Get position relative to carpet
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate tilt based on mouse position
                const tiltX = ((y / rect.height) - 0.5) * 10;
                const tiltY = ((x / rect.width) - 0.5) * -10;
                
                // Apply tilt effect
                this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                
                // Add particles following the cursor
                if (Math.random() > 0.7) {
                    addInteractiveParticle(x, y);
                }
            }
        });
        
        carpetVisual.addEventListener('mouseleave', function() {
            // Reset transform when mouse leaves
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        carpetVisual.addEventListener('click', function(e) {
            // Add magical burst effect on click
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            createMagicalBurst(x, y);
        });
    }
    
    // Add interactive particle effect
    function addInteractiveParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'interactive-particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random size
        const size = 2 + Math.random() * 8;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color based on current carpet color
        particle.style.backgroundColor = colors[currentState.color].primary;
        
        // Add to carpet
        carpetOverlay.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
    
    // Create magical burst effect
    function createMagicalBurst(x, y) {
        // Create container for the burst
        const burstContainer = document.createElement('div');
        burstContainer.className = 'magical-burst';
        burstContainer.style.left = `${x}px`;
        burstContainer.style.top = `${y}px`;
        
        // Create multiple particles for the burst
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            
            // Random angle and distance
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            
            // Calculate end position
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            // Random size
            const size = 2 + Math.random() * 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Set animation with unique end position
            particle.style.setProperty('--end-x', `${endX}px`);
            particle.style.setProperty('--end-y', `${endY}px`);
            
            // Random color based on current carpet color
            if (currentState.color === 'gold' || currentState.thread === 'gold') {
                particle.style.backgroundColor = '#FFD900';
            } else {
                particle.style.backgroundColor = colors[currentState.color].primary;
            }
            
            // Add to burst container
            burstContainer.appendChild(particle);
        }
        
        // Add burst to carpet
        carpetVisual.appendChild(burstContainer);
        
        // Remove after animation completes
        setTimeout(() => {
            burstContainer.remove();
        }, 2000);
    }
    
    // Setup cookie consent
    function setupCookieConsent() {
        const cookieBanner = document.getElementById('cookie-consent-banner');
        const acceptButton = document.getElementById('cookie-accept-all');
        const rejectButton = document.getElementById('cookie-reject-all');
        const customizeButton = document.getElementById('cookie-customize');
        
        if (cookieBanner && acceptButton && rejectButton) {
            // Check if consent has already been given
            if (!localStorage.getItem('cookie-consent')) {
                cookieBanner.classList.add('visible');
            }
            
            acceptButton.addEventListener('click', function() {
                localStorage.setItem('cookie-consent', 'accepted');
                cookieBanner.classList.remove('visible');
            });
            
            rejectButton.addEventListener('click', function() {
                localStorage.setItem('cookie-consent', 'rejected');
                cookieBanner.classList.remove('visible');
            });
            
            customizeButton.addEventListener('click', function() {
                // This would typically open a more detailed cookie settings panel
                alert('In a real implementation, this would open detailed cookie settings.');
            });
        }
    }
    
    // Mobile menu toggle
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mainMenu = document.getElementById('main-menu');
        
        if (menuToggle && mainMenu) {
            menuToggle.addEventListener('click', function() {
                mainMenu.classList.toggle('active');
                this.setAttribute('aria-expanded', 
                    this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
            });
        }
    }
    
    // Initialize all functionality
    function init() {
        // First initialize the carpet
        initializeCarpet();
        
        // Setup all event handlers
        setupTabSwitching();
        setupPatternSelection();
        setupColorSelection();
        setupThreadSelection();
        setupLearningStyleSelection();
        setupLeagueSelection();
        setupJourneyNodes();
        setupStreakCounter();
        setupGemCounter();
        setupPremiumOverlay();
        setupInteractiveCarpet();
        setupCookieConsent();
        setupMobileMenu();
        
        // Add welcome animation
        setTimeout(() => {
            carpetVisual.classList.add('welcome-animation');
            setTimeout(() => {
                carpetVisual.classList.remove('welcome-animation');
            }, 2000);
        }, 500);
    }
    
    // Start everything
    init();
});
