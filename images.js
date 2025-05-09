// Image URLs for the Magic Carpet Experience
const images = {
  // Hero section images
  hero: {
    carpetFlying: "https://images.pexels.com/photos/duolingo-magic-carpet-flying.jpg",
    mainBanner: "https://images.pexels.com/photos/duolingo-hero-banner.jpg"
  },

  // Learning experience images
  learning: {
    lego: "https://images.pexels.com/photos/17889101/pexels-photo-17889101.jpeg",
    flyingCarpet: "https://images.pexels.com/photos/17889102/pexels-photo-17889102.jpeg",
    groupLearning: "https://images.pexels.com/photos/17889103/pexels-photo-17889103.jpeg"
  },

  // Duo mascot and branding
  branding: {
    duoOwl: "/images/duo-owl.svg",
    logo: "/images/duolingo-logo.svg"
  },

  // Pattern thumbnails
  patterns: {
    classic: "/images/patterns/classic-thumb.svg",
    geometric: "/images/patterns/geometric-thumb.svg",
    floral: "/images/patterns/floral-thumb.svg",
    arabesque: "/images/patterns/arabesque-thumb.svg",
    royal: "/images/patterns/royal-thumb.svg"
  }
};

// Function to preload images
function preloadImages() {
  Object.values(images).forEach(category => {
    Object.values(category).forEach(url => {
      const img = new Image();
      img.src = url;
    });
  });
}

// Initialize image loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
  
  // Update hero section images
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    heroImage.src = images.learning.flyingCarpet;
    heroImage.alt = "Child learning with Duolingo on a magical flying carpet";
  }
  
  // Update learning experience section
  const legoImage = document.querySelector('.persona-card:first-child .persona-carpet img');
  if (legoImage) {
    legoImage.src = images.learning.lego;
    legoImage.alt = "Child playing with Duolingo Lego set";
  }
  
  // Update group learning section
  const groupImage = document.querySelector('.personalization-cards img');
  if (groupImage) {
    groupImage.src = images.learning.groupLearning;
    groupImage.alt = "Children learning together with Duolingo";
  }
});

export default images;