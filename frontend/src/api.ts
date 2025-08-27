import { Recipe } from "./types";

const API_URL = 'http://localhost:8000';

export const getAllRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const createRecipe = async (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  return response.json();
};

export const deleteRecipe = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const getHealth = async (): Promise<{ status: string }> => {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// Legacy functions for compatibility
export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL(`${API_URL}/recipes`);
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const allRecipes = await response.json();
  // Filter recipes locally based on search term
  const filtered = allRecipes.filter((recipe: Recipe) => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return { results: filtered };
};

export const getRecipeSummary = async (recipeId: string) => {
  const response = await fetch(`${API_URL}/recipes/${recipeId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const getFavouriteRecipes = async () => {
  return { results: [] }; // Placeholder for favorites functionality
};

export const addFavouriteRecipe = async (recipe: Recipe) => {
  // Placeholder for favorites functionality
  console.log('Adding to favorites:', recipe);
};

export const removeFavouriteRecipe = async (recipe: Recipe) => {
  // Placeholder for favorites functionality
  console.log('Removing from favorites:', recipe);
};
