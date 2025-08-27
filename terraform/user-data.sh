#!/bin/bash
# ==============================================================================
# User Data Script - Sets up Recipe Sharing App on EC2 instances
# ==============================================================================
# This script runs when an EC2 instance starts up and installs everything
# needed to run the Recipe Sharing Application

# Update the system
yum update -y

# Install required packages
yum install -y python3 python3-pip git docker

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Add ec2-user to docker group (allows running docker without sudo)
usermod -a -G docker ec2-user

# Install Python dependencies
pip3 install fastapi uvicorn

# Create application directory
mkdir -p /opt/recipe-app
cd /opt/recipe-app

# Create the backend application file
cat > backend.py << 'EOF'
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="Recipe Sharing API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class RecipeSummary(BaseModel):
    id: int
    title: str
    image: str
    imageType: str

class Recipe(BaseModel):
    id: int
    title: str
    summary: str

class SearchResponse(BaseModel):
    results: List[RecipeSummary]
    totalResults: int

# Mock data - In production, this would be in a database
RECIPES = [
    {
        "id": 1,
        "title": "Classic Pasta Carbonara",
        "image": "https://picsum.photos/seed/pasta/400/300",
        "imageType": "jpg",
        "summary": "<p>A traditional Italian pasta dish from Rome made with eggs, hard cheese, cured pork, and black pepper. The key to perfect carbonara is timing - the eggs should create a creamy sauce without scrambling.</p><p><strong>Cooking Time:</strong> 20 minutes<br><strong>Serves:</strong> 4 people</p>"
    },
    {
        "id": 2,
        "title": "Chicken Tikka Masala",
        "image": "https://picsum.photos/seed/chicken/400/300",
        "imageType": "jpg",
        "summary": "<p>A popular curry dish featuring tender chunks of roasted marinated chicken in a spiced curry sauce. Despite its Indian origins, this version is beloved worldwide.</p><p><strong>Cooking Time:</strong> 45 minutes<br><strong>Serves:</strong> 4-6 people</p>"
    },
    {
        "id": 3,
        "title": "Perfect Chocolate Chip Cookies",
        "image": "https://picsum.photos/seed/cookies/400/300",
        "imageType": "jpg",
        "summary": "<p>Classic American chocolate chip cookies with the perfect balance of chewy and crispy. Made with real butter and premium chocolate chips for the ultimate comfort treat.</p><p><strong>Baking Time:</strong> 12 minutes<br><strong>Makes:</strong> 24 cookies</p>"
    },
    {
        "id": 4,
        "title": "Fresh Vegetable Stir Fry",
        "image": "https://picsum.photos/seed/stirfry/400/300",
        "imageType": "jpg",
        "summary": "<p>A colorful and nutritious stir fry packed with fresh seasonal vegetables. Quick to prepare and perfect for a healthy weeknight dinner.</p><p><strong>Cooking Time:</strong> 15 minutes<br><strong>Serves:</strong> 3-4 people</p>"
    }
]

favorites = []

@app.get("/")
async def root():
    return {"message": "Recipe Sharing API is running!", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "environment": "${environment}"}

@app.get("/api/recipes/search", response_model=SearchResponse)
async def search_recipes(searchTerm: Optional[str] = Query(None), page: int = Query(1)):
    results = RECIPES
    if searchTerm:
        results = [r for r in RECIPES if searchTerm.lower() in r["title"].lower()]
    
    return SearchResponse(
        results=[RecipeSummary(**r) for r in results[:4]], 
        totalResults=len(results)
    )

@app.get("/api/recipes/{recipe_id}/summary", response_model=Recipe)
async def get_recipe_summary(recipe_id: int):
    recipe = next((r for r in RECIPES if r["id"] == recipe_id), None)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    return Recipe(
        id=recipe["id"],
        title=recipe["title"],
        summary=recipe["summary"]
    )

@app.post("/api/recipes/favourite")
async def add_favorite(recipe: RecipeSummary):
    if not any(f["id"] == recipe.id for f in favorites):
        favorites.append(recipe.dict())
    return {"message": "Recipe added to favorites", "recipe": recipe}

@app.delete("/api/recipes/favourite")
async def remove_favorite(recipe: RecipeSummary):
    global favorites
    favorites = [f for f in favorites if f["id"] != recipe.id]
    return {"message": "Recipe removed from favorites"}

@app.get("/api/recipes/favourite", response_model=SearchResponse)
async def get_favorites():
    return SearchResponse(
        results=[RecipeSummary(**f) for f in favorites],
        totalResults=len(favorites)
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# Create a simple index.html for health check
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Recipe Sharing App</title>
</head>
<body>
    <h1>Recipe Sharing App is Running!</h1>
    <p>Environment: ${environment}</p>
    <p>API is available at /api/recipes/search</p>
</body>
</html>
EOF

# Create systemd service for the application
cat > /etc/systemd/system/recipe-app.service << 'EOF'
[Unit]
Description=Recipe Sharing Application
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/opt/recipe-app
ExecStart=/usr/bin/python3 backend.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Set proper permissions
chown -R ec2-user:ec2-user /opt/recipe-app
chmod +x /opt/recipe-app/backend.py

# Enable and start the application service
systemctl daemon-reload
systemctl enable recipe-app
systemctl start recipe-app

# Install and configure CloudWatch agent (optional)
yum install -y amazon-cloudwatch-agent

# Log installation completion
echo "Recipe Sharing App installation completed at $(date)" >> /var/log/user-data.log
