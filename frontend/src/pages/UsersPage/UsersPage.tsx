import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Timer as TimerIcon,
  Restaurant as RestaurantIcon,
  Star as StarIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { API_URL } from '../../configs/configs';
import { getRecipeImage } from '../../utils/imageUtils';

interface Ingredient {
  id: number;
  description: string;
}

interface Step {
  id: number;
  description: string;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  steps: Step[];
}

function UsersPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data for demonstration (since DynamoDB is not configured)
  const mockRecipes: Recipe[] = [
    {
      id: 'pasta-carbonara',
      title: 'Classic Pasta Carbonara',
      ingredients: [
        { id: 1, description: '400g spaghetti' },
        { id: 2, description: '200g pancetta or guanciale' },
        { id: 3, description: '4 large eggs' },
        { id: 4, description: '100g Pecorino Romano cheese' },
        { id: 5, description: 'Black pepper to taste' }
      ],
      steps: [
        { id: 1, description: 'Cook spaghetti in salted boiling water until al dente' },
        { id: 2, description: 'Fry pancetta until crispy' },
        { id: 3, description: 'Whisk eggs with cheese and black pepper' },
        { id: 4, description: 'Combine hot pasta with pancetta and egg mixture' },
        { id: 5, description: 'Toss quickly to create creamy sauce' }
      ]
    },
    {
      id: 'chicken-tikka-masala',
      title: 'Chicken Tikka Masala',
      ingredients: [
        { id: 1, description: '500g chicken breast, cubed' },
        { id: 2, description: '200ml yogurt' },
        { id: 3, description: '400ml tomato sauce' },
        { id: 4, description: '200ml heavy cream' },
        { id: 5, description: 'Garam masala, ginger, garlic' }
      ],
      steps: [
        { id: 1, description: 'Marinate chicken in yogurt and spices for 2 hours' },
        { id: 2, description: 'Grill chicken until cooked through' },
        { id: 3, description: 'Prepare tomato-based sauce with cream' },
        { id: 4, description: 'Simmer chicken in sauce for 10 minutes' },
        { id: 5, description: 'Serve with basmati rice and naan' }
      ]
    },
    {
      id: 'chocolate-chip-cookies',
      title: 'Perfect Chocolate Chip Cookies',
      ingredients: [
        { id: 1, description: '2 1/4 cups all-purpose flour' },
        { id: 2, description: '1 cup butter, softened' },
        { id: 3, description: '3/4 cup brown sugar' },
        { id: 4, description: '2 large eggs' },
        { id: 5, description: '2 cups chocolate chips' }
      ],
      steps: [
        { id: 1, description: 'Preheat oven to 375°F (190°C)' },
        { id: 2, description: 'Cream butter and sugars together' },
        { id: 3, description: 'Add eggs and vanilla extract' },
        { id: 4, description: 'Mix in flour and chocolate chips' },
        { id: 5, description: 'Bake for 9-11 minutes until golden' }
      ]
    }
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from API first
        const response = await fetch(`${API_URL}/recipes`);
        
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.recipes || []);
        } else {
          // Fall back to mock data if API is not available
          setTimeout(() => {
            setRecipes(mockRecipes);
            setLoading(false);
          }, 1000);
          return;
        }
      } catch (err) {
        // Use mock data if API fails
        setTimeout(() => {
          setRecipes(mockRecipes);
          setLoading(false);
        }, 1000);
        return;
      }
      
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDialogOpen(true);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading delicious recipes...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Recipe Collection
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Discover and explore our curated collection of delicious recipes
        </Typography>
        
        {/* Search Bar */}
        <Box sx={{ mt: 3, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Box>
      </Box>

      {/* API Status Alert */}
      {recipes === mockRecipes && (
        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Demo Mode:</strong> Displaying sample recipes. In production, this would connect to DynamoDB via the FastAPI backend.
        </Alert>
      )}

      {/* Recipe Grid */}
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card 
              elevation={3} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={getRecipeImage(recipe.id).src}
                alt={recipe.title}
                sx={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.style.background = getRecipeImage(recipe.id).fallback;
                    target.parentElement.style.display = 'flex';
                    target.parentElement.style.alignItems = 'center';
                    target.parentElement.style.justifyContent = 'center';
                    target.parentElement.style.height = '200px';
                    const icon = document.createElement('div');
                    icon.innerHTML = '🍽️';
                    icon.style.fontSize = '60px';
                    target.parentElement.appendChild(icon);
                  }
                }}
              />
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {recipe.title}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<TimerIcon />}
                    label={`${recipe.steps.length} steps`}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<StarIcon />}
                    label={`${recipe.ingredients.length} ingredients`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {recipe.ingredients.slice(0, 2).map(ing => ing.description).join(', ')}
                  {recipe.ingredients.length > 2 && '...'}
                </Typography>
                
                <Button
                  variant="contained"
                  startIcon={<ViewIcon />}
                  onClick={() => handleViewRecipe(recipe)}
                  fullWidth
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredRecipes.length === 0 && !loading && (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" color="textSecondary">
            No recipes found matching "{searchTerm}"
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Try adjusting your search term
          </Typography>
        </Box>
      )}

      {/* Recipe Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedRecipe && (
          <>
            <DialogTitle>
              <Typography variant="h4" component="h2">
                {selectedRecipe.title}
              </Typography>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Ingredients
                  </Typography>
                  <List dense>
                    {selectedRecipe.ingredients.map((ingredient) => (
                      <ListItem key={ingredient.id}>
                        <ListItemText
                          primary={ingredient.description}
                          sx={{ 
                            '& .MuiListItemText-primary': { 
                              fontSize: '0.95rem' 
                            } 
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Instructions
                  </Typography>
                  <List dense>
                    {selectedRecipe.steps.map((step, index) => (
                      <React.Fragment key={step.id}>
                        <ListItem>
                          <ListItemText
                            primary={`${index + 1}. ${step.description}`}
                            sx={{ 
                              '& .MuiListItemText-primary': { 
                                fontSize: '0.95rem' 
                              } 
                            }}
                          />
                        </ListItem>
                        {index < selectedRecipe.steps.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} variant="outlined">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default UsersPage;
