import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function UsersPage() {
  return (
    <Container maxWidth="lg">
      <Box p={3}>
        <Typography variant="h3" gutterBottom>
          Recipe Browser
        </Typography>
        
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Browse and discover delicious recipes
        </Typography>
        
        <Box mt={3} mb={3}>
          <Button component={Link} to="/" variant="contained">
            Back to Home
          </Button>
        </Box>
        
        {/* Recipe content will be implemented here */}
        <Box mt={4}>
          <Typography variant="body1">
            Recipe browsing functionality coming soon...
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default UsersPage;
