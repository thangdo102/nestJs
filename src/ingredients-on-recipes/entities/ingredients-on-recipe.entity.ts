import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export class IngredientsOnRecipe {
  id: number;
  createAt: string;
  updatedAt: string;

  recipeId: number;
  recipe: Recipe;

  ingredientId: number;
  ingredient: Ingredient;
}
