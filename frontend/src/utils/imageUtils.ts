// Image utilities for Recipe Sharing Platform
// Contextual food images with matching descriptions

import pastaImage from '../assets/images/pasta-carbonara.jpg';
import chickenImage from '../assets/images/chicken-tikka.jpg';
import cookiesImage from '../assets/images/cookies.jpg';
import stirFryImage from '../assets/images/stir-fry.jpg';
import heroImage from '../assets/images/hero-food.jpg';

export const recipeImages = {
  // Food-themed images with contextual seeds
  images: {
    pasta: pastaImage,
    chicken: chickenImage,
    cookies: cookiesImage,
    stirfry: stirFryImage,
    hero: heroImage
  },
  
  // Food-themed fallback gradients
  fallbackGradients: {
    pasta: 'linear-gradient(135deg, #ff9a56 0%, #ffc371 100%)', // Warm pasta colors
    chicken: 'linear-gradient(135deg, #ff7b54 0%, #ff6b3d 100%)', // Spicy curry colors  
    cookies: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)', // Chocolate brown colors
    stirfry: 'linear-gradient(135deg, #32cd32 0%, #90ee90 100%)', // Fresh vegetable colors
    default: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)' // Warm cooking colors
  }
};

export const getRecipeImage = (recipeId: string) => {
  const imageMap: { [key: string]: { src: string; fallback: string; color: string } } = {
    'pasta-carbonara': { 
      src: recipeImages.images.pasta,
      fallback: recipeImages.fallbackGradients.pasta,
      color: '#ff9a56'
    },
    'chicken-tikka-masala': { 
      src: recipeImages.images.chicken,
      fallback: recipeImages.fallbackGradients.chicken,
      color: '#ff7b54'
    },
    'chocolate-chip-cookies': { 
      src: recipeImages.images.cookies,
      fallback: recipeImages.fallbackGradients.cookies,
      color: '#8b4513'
    },
    'beef-stir-fry': { 
      src: recipeImages.images.stirfry,
      fallback: recipeImages.fallbackGradients.stirfry,
      color: '#32cd32'
    }
  };
  
  return imageMap[recipeId] || { 
    src: recipeImages.images.hero,
    fallback: recipeImages.fallbackGradients.default,
    color: '#ff6b35'
  };
};

export const getHeroImage = () => recipeImages.images.hero;

// CSS-based icons using Material-UI icons (no external assets needed)
export const iconStyles = {
  cooking: {
    background: 'linear-gradient(45deg, #ff6b35, #ff8c42)',
    borderRadius: '50%',
    padding: '8px'
  },
  timer: {
    background: 'linear-gradient(45deg, #2e7d32, #4caf50)',
    borderRadius: '50%',
    padding: '8px'
  },
  ingredients: {
    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
    borderRadius: '50%',
    padding: '8px'
  }
};
