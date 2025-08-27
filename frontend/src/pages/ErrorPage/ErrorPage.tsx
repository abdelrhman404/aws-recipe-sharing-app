import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="textSecondary" gutterBottom>
          The page you're looking for doesn't exist.
        </Typography>
        
        <Box mt={3}>
          <Button component={Link} to="/" variant="contained" size="large">
            Go Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ErrorPage;
