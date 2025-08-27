import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Chip,
  Alert,
  AlertTitle
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  CloudQueue as CloudIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Restaurant as RestaurantIcon,
  School as SchoolIcon,
  Architecture as ArchitectureIcon
} from '@mui/icons-material';
import { getHeroImage } from '../../utils/imageUtils';

function HomePage() {
  return (
    <Container maxWidth="lg">
      {/* Manara Acknowledgment */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle><strong>Acknowledgments</strong></AlertTitle>
        Special thanks to the <strong>Manara Team</strong> for providing the exceptional AWS Solutions Architect Associate learning path. 
        Profound gratitude to <strong>Eng. Ayman Ali</strong> for his outstanding instruction, continuous support, 
        and invaluable guidance throughout this transformative journey. His expertise and dedication have been instrumental 
        in developing the skills showcased in this project.
      </Alert>

      {/* Hero Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        sx={{ 
          mb: 6,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${getHeroImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 3,
          color: 'white',
          p: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Chip
          icon={<SchoolIcon />}
          label="Manara AWS SAA Graduation Project"
          color="primary"
          variant="filled"
          sx={{ 
            mb: 3, 
            fontSize: '1rem', 
            py: 1,
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            '& .MuiChip-icon': { color: 'white' }
          }}
        />
        
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', position: 'relative', zIndex: 1 }}>
          Recipe Sharing Platform
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{ maxWidth: '600px', position: 'relative', zIndex: 1, mb: 4 }}>
          A professional AWS cloud-native application demonstrating modern three-tier architecture 
          with scalable, secure, and cost-effective design patterns.
        </Typography>
        
        <Box mt={2} display="flex" gap={2} flexWrap="wrap" justifyContent="center" sx={{ position: 'relative', zIndex: 1 }}>
          <Button
            component={Link}
            to="/recipes"
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<RestaurantIcon />}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.9)', 
              color: 'primary.main',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            Explore Recipes
          </Button>
          
          <Button
            component={Link}
            to="/admin"
            variant="outlined"
            size="large"
            startIcon={<ArchitectureIcon />}
            sx={{ 
              borderColor: 'white',
              color: 'white',
              '&:hover': { 
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Admin Dashboard
          </Button>
        </Box>
      </Box>

      {/* Architecture Overview */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          AWS Three-Tier Architecture
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <CloudIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Presentation Layer
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  React.js frontend hosted on S3 with CloudFront CDN for global distribution 
                  and lightning-fast content delivery.
                </Typography>
                <Box mt={2}>
                  <Chip label="S3" size="small" sx={{ m: 0.5 }} />
                  <Chip label="CloudFront" size="small" sx={{ m: 0.5 }} />
                  <Chip label="React.js" size="small" sx={{ m: 0.5 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <SpeedIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Application Layer
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  FastAPI backend deployed on Auto Scaling EC2 instances behind an 
                  Application Load Balancer for high availability.
                </Typography>
                <Box mt={2}>
                  <Chip label="EC2" size="small" sx={{ m: 0.5 }} />
                  <Chip label="ALB" size="small" sx={{ m: 0.5 }} />
                  <Chip label="FastAPI" size="small" sx={{ m: 0.5 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <SecurityIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Data Layer
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  DynamoDB NoSQL database with auto-scaling, encryption at rest, 
                  and point-in-time recovery for enterprise-grade data management.
                </Typography>
                <Box mt={2}>
                  <Chip label="DynamoDB" size="small" sx={{ m: 0.5 }} />
                  <Chip label="VPC Endpoint" size="small" sx={{ m: 0.5 }} />
                  <Chip label="Auto-scaling" size="small" sx={{ m: 0.5 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Architecture Diagram */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3 }}>
          AWS Architecture Diagram
        </Typography>
        <Card elevation={2} sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Box 
            sx={{ 
              height: 400, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              color: 'white',
              flexDirection: 'column'
            }}
          >
            <ArchitectureIcon sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              AWS Three-Tier Architecture
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 400, textAlign: 'center' }}>
              Professional cloud infrastructure diagram showcasing S3/CloudFront (Presentation), 
              EC2/ALB (Application), and DynamoDB (Data) tiers with VPC networking and security.
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Project Features */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Key Features & Benefits
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  🚀 Cloud-Native Architecture
                </Typography>
                <Typography variant="body2">
                  Leverages AWS managed services for scalability, reliability, and cost optimization. 
                  Infrastructure as Code using CloudFormation templates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  🔒 Enterprise Security
                </Typography>
                <Typography variant="body2">
                  End-to-end encryption, VPC isolation, IAM role-based access, 
                  and AWS WAF protection against common web vulnerabilities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  📈 Auto-Scaling Performance
                </Typography>
                <Typography variant="body2">
                  Elastic infrastructure that automatically scales based on demand, 
                  with CloudWatch monitoring and performance optimization.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  💰 Cost-Optimized Design
                </Typography>
                <Typography variant="body2">
                  Pay-as-you-use pricing model with DynamoDB on-demand billing, 
                  CloudFront caching, and right-sized EC2 instances.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Technology Stack */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
          Technology Stack
        </Typography>
        
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
          <Chip label="React.js" variant="outlined" />
          <Chip label="TypeScript" variant="outlined" />
          <Chip label="Material-UI" variant="outlined" />
          <Chip label="FastAPI" variant="outlined" />
          <Chip label="Python" variant="outlined" />
          <Chip label="AWS DynamoDB" variant="outlined" />
          <Chip label="AWS S3" variant="outlined" />
          <Chip label="AWS CloudFront" variant="outlined" />
          <Chip label="AWS EC2" variant="outlined" />
          <Chip label="AWS ALB" variant="outlined" />
          <Chip label="AWS VPC" variant="outlined" />
          <Chip label="AWS CloudFormation" variant="outlined" />
          <Chip label="AWS CloudWatch" variant="outlined" />
          <Chip label="AWS IAM" variant="outlined" />
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
