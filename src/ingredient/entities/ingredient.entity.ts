import { IngredientsOnRecipe } from 'src/ingredients-on-recipes/entities/ingredients-on-recipe.entity';

export class Ingredient {
  id: number;
  name: string;
  ingredientsOnRecipes: IngredientsOnRecipe[];
  createAt: string;
  updatedAt: string;
}
