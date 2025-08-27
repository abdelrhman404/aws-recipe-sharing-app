import React, { useState, useEffect } from 'react';
import { Recipe } from './types';
import * as api from './api';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRecipes(filtered);
    }
  }, [recipes, searchTerm]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const data = await api.getAllRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecipe = async (recipe: Omit<Recipe, 'id'>) => {
    try {
      await api.createRecipe(recipe);
      fetchRecipes();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      await api.deleteRecipe(id);
      fetchRecipes();
      if (selectedRecipe?.id === id) {
        setSelectedRecipe(null);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <h1>� Recipe Sharing</h1>
            <p>Discover and share amazing recipes</p>
          </div>
          <div className="mode-toggle">
            <button 
              className={`toggle-btn ${!isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(false)}
            >
              � User
            </button>
            <button 
              className={`toggle-btn ${isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(true)}
            >
              🔧 Admin
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            {isAdmin && (
              <button 
                className="add-recipe-btn"
                onClick={() => setShowModal(true)}
              >
                ➕ Add New Recipe
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading delicious recipes...</p>
            </div>
          ) : (
            <div className="recipes-grid">
              {filteredRecipes.length === 0 ? (
                <div className="no-recipes">
                  <h3>🍽️ No recipes found</h3>
                  <p>
                    {searchTerm 
                      ? `No recipes match "${searchTerm}". Try a different search term.`
                      : "No recipes available yet. Add some delicious recipes to get started!"
                    }
                  </p>
                </div>
              ) : (
                filteredRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isAdmin={isAdmin}
                    onView={handleViewRecipe}
                    onDelete={handleDeleteRecipe}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {showModal && (
        <RecipeModal
          onClose={() => setShowModal(false)}
          onSave={handleCreateRecipe}
        />
      )}
    </div>
  );
}

export default App;
