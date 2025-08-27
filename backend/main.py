from fastapi import FastAPI, status
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uuid
import boto3


class Ingredient(BaseModel):
    id: int
    description: str

class Step(BaseModel):
    id: int
    description: str

class Recipe(BaseModel):
    id: str
    title: str
    ingredients: List[Ingredient]
    steps: List[Step]

# AWS DynamoDB setup
session = boto3.Session(
    region_name='us-east-1'  # Change to your AWS region
)

dynamodb = session.resource('dynamodb')
table = dynamodb.Table('recipes')

# Configure CORS
origins = [
    "*",  # In production, replace with your frontend domain
]

app = FastAPI(
    title="Recipe Sharing API",
    description="A FastAPI application for managing recipes",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """Health check endpoint to verify API is running"""
    return {"message": "Service is healthy"}

# Get all recipes
@app.get("/recipes", status_code=status.HTTP_200_OK)
async def get_all_recipes(): 
    """Retrieve all recipes from DynamoDB"""
    try:
        response = table.scan()
        recipes = response['Items']
        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            recipes.extend(response['Items'])
        recipes_list = [Recipe(**recipe) for recipe in recipes]
        return recipes_list
    except Exception as e:
        return {"message": f"Error retrieving recipes: {e}"}

# Create new recipe
@app.post("/recipes", status_code=status.HTTP_200_OK)
async def create_recipe(recipe: Recipe):
    """Create a new recipe in DynamoDB"""
    try:
        table.put_item(
            Item={
                'id': str(uuid.uuid4()),
                'title': recipe.title,
                'ingredients': [ingredient.dict() for ingredient in recipe.ingredients],
                'steps': [step.dict() for step in recipe.steps]
            }
        )
        return {"message": "Recipe created successfully"}
    except Exception as e:
        return {"message": f"Error creating recipe: {e}"}

# Delete recipe
@app.delete("/recipes/{recipe_id}", status_code=status.HTTP_200_OK)
async def delete_recipe(recipe_id: str):
    """Delete a specific recipe by ID"""
    try:
        response = table.delete_item(
            Key={
                'id': recipe_id
            }
        )
        return {"message": f"Recipe {recipe_id} deleted successfully"}
    except Exception as e:
        return {"message": f"Error deleting recipe: {e}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
