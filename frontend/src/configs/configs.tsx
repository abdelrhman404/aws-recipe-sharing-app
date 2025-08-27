// Configuration for Manara AWS SAA Graduation Project
// Recipe Sharing Platform - Professional AWS Three-Tier Architecture

export const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Application Configuration
export const appConfig = {
  title: 'Manara Recipe Sharing Platform',
  description: 'Professional AWS cloud-native recipe sharing application',
  version: '1.0.0',
  author: 'Manara AWS SAA Graduate',
  project: 'AWS Solutions Architect Associate Graduation Project'
};

// Business Logic Configuration
export const CONFIG_MAX_INGREDIENTS = 20;
export const CONFIG_MAX_STEPS = 15;
export const CONFIG_MAX_RECIPES = 100;
export const CONFIG_ADMIN_PAGE_TITLE = 'Admin Dashboard';
export const CONFIG_USER_PAGE_TITLE = 'Recipe Collection';

// AWS Architecture Configuration
export const awsConfig = {
  region: 'us-east-1',
  services: {
    dynamodb: 'DynamoDB for scalable NoSQL data storage',
    s3: 'S3 for static website hosting and content storage',
    cloudfront: 'CloudFront CDN for global content delivery',
    ec2: 'EC2 Auto Scaling Groups for elastic compute capacity',
    alb: 'Application Load Balancer for high availability',
    vpc: 'VPC for secure network isolation',
    cloudformation: 'Infrastructure as Code deployment',
    cloudwatch: 'Monitoring and observability platform'
  }
};

// Platform Features
export const features = {
  scalability: 'Auto-scaling infrastructure responds to demand',
  security: 'End-to-end encryption with VPC isolation',
  performance: 'Global CDN ensures low-latency access',
  costOptimization: 'Pay-as-you-use serverless architecture',
  monitoring: 'Real-time CloudWatch metrics and alerting',
  deployment: 'Automated CI/CD with CloudFormation IaC'
};
