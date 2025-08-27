import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <Container maxWidth="lg">
      <Box p={3}>
        <Typography variant="h3" gutterBottom>
          Admin Panel
        </Typography>
        
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Manage recipes and application settings
        </Typography>
        
        <Box mt={3} mb={3}>
          <Button component={Link} to="/" variant="contained">
            Back to Home
          </Button>
        </Box>
        
        {/* Admin functionality will be implemented here */}
        <Box mt={4}>
          <Typography variant="body1">
            Admin functionality coming soon...
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default AdminPage;
