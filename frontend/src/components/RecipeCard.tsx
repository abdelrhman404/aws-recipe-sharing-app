import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  isFavourite: boolean;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({
  recipe,
  onClick,
  onFavouriteButtonClick,
  isFavourite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}
          style={{ fontSize: '24px', cursor: 'pointer' }}
        >
          {isFavourite ? "❤️" : "🤍"}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
