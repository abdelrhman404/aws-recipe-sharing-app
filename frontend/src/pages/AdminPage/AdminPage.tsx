import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Alert,
  Fab,
  Paper,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Dashboard as DashboardIcon,
  Recipe as RecipeIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { API_URL } from '../../configs/configs';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function AdminPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);

  // Mock data
  const mockRecipes: Recipe[] = [
    {
      id: 'pasta-carbonara',
      title: 'Classic Pasta Carbonara',
      ingredients: [
        { id: 1, description: '400g spaghetti' },
        { id: 2, description: '200g pancetta or guanciale' },
        { id: 3, description: '4 large eggs' },
        { id: 4, description: '100g Pecorino Romano cheese' }
      ],
      steps: [
        { id: 1, description: 'Cook spaghetti in salted boiling water until al dente' },
        { id: 2, description: 'Fry pancetta until crispy' },
        { id: 3, description: 'Whisk eggs with cheese and black pepper' },
        { id: 4, description: 'Combine hot pasta with pancetta and egg mixture' }
      ]
    }
  ];

  useEffect(() => {
    // In production, this would fetch from the API
    setRecipes(mockRecipes);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddRecipe = () => {
    setCurrentRecipe(null);
    setIsEditing(false);
    resetForm();
    setOpenDialog(true);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    setIsEditing(true);
    setTitle(recipe.title);
    setIngredients([...recipe.ingredients]);
    setSteps([...recipe.steps]);
    setOpenDialog(true);
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        // In production, this would make an API call
        setRecipes(recipes.filter(r => r.id !== recipeId));
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setIngredients([{ id: 1, description: '' }]);
    setSteps([{ id: 1, description: '' }]);
  };

  const handleSaveRecipe = async () => {
    if (!title.trim()) return;

    const newRecipe: Recipe = {
      id: currentRecipe?.id || `recipe-${Date.now()}`,
      title: title.trim(),
      ingredients: ingredients.filter(ing => ing.description.trim()),
      steps: steps.filter(step => step.description.trim())
    };

    try {
      if (isEditing && currentRecipe) {
        // Update existing recipe
        setRecipes(recipes.map(r => r.id === currentRecipe.id ? newRecipe : r));
      } else {
        // Add new recipe
        setRecipes([...recipes, newRecipe]);
      }
      
      setOpenDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { id: ingredients.length + 1, description: '' }]);
  };

  const updateIngredient = (index: number, description: string) => {
    const updated = [...ingredients];
    updated[index].description = description;
    setIngredients(updated);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, { id: steps.length + 1, description: '' }]);
  };

  const updateStep = (index: number, description: string) => {
    const updated = [...steps];
    updated[index].description = description;
    setSteps(updated);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Manage recipes and monitor platform analytics
        </Typography>
      </Box>

      {/* Alert */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <strong>Demo Mode:</strong> Recipe operations are simulated. In production, changes would be persisted to DynamoDB.
      </Alert>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab icon={<DashboardIcon />} label="Overview" />
          <Tab icon={<RecipeIcon />} label="Recipe Management" />
          <Tab icon={<AnalyticsIcon />} label="Analytics" />
        </Tabs>
      </Paper>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary.main">
                  {recipes.length}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  Total Recipes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="secondary.main">
                  {recipes.reduce((acc, recipe) => acc + recipe.ingredients.length, 0)}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  Total Ingredients
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="error.main">
                  {recipes.reduce((acc, recipe) => acc + recipe.steps.length, 0)}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  Total Steps
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Recipe Management Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddRecipe}
            size="large"
          >
            Add New Recipe
          </Button>
        </Box>

        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} md={6} key={recipe.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipe.title}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={`${recipe.ingredients.length} ingredients`} 
                      size="small" 
                      sx={{ mr: 1 }} 
                    />
                    <Chip 
                      label={`${recipe.steps.length} steps`} 
                      size="small" 
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditRecipe(recipe)}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteRecipe(recipe.id)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Analytics Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom>
          Platform Analytics
        </Typography>
        <Alert severity="info">
          In production, this section would display CloudWatch metrics, user engagement data, 
          and performance analytics from the DynamoDB and API Gateway.
        </Alert>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recipe Popularity
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  View count and user engagement metrics would be displayed here.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Metrics
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  API response times, DynamoDB performance, and error rates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Add/Edit Recipe Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditing ? 'Edit Recipe' : 'Add New Recipe'}
        </DialogTitle>
        
        <DialogContent>
          <TextField
            fullWidth
            label="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3, mt: 1 }}
          />
          
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          {ingredients.map((ingredient, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient.description}
                onChange={(e) => updateIngredient(index, e.target.value)}
              />
              <IconButton onClick={() => removeIngredient(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={addIngredient} sx={{ mb: 3 }}>
            Add Ingredient
          </Button>
          
          <Typography variant="h6" gutterBottom>
            Steps
          </Typography>
          {steps.map((step, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                placeholder={`Step ${index + 1}`}
                value={step.description}
                onChange={(e) => updateStep(index, e.target.value)}
              />
              <IconButton onClick={() => removeStep(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={addStep}>
            Add Step
          </Button>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveRecipe} variant="contained" startIcon={<SaveIcon />}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPage;
