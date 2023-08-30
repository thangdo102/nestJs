import { IngredientsOnRecipe } from 'src/ingredients-on-recipes/entities/ingredients-on-recipe.entity';
import { User } from 'src/user/entities/user.entity';

export class Recipe {
  id: number;
  name: string;
  userId: number;
  user: User;
  ingredientsOnRecipes: IngredientsOnRecipe[];
  createAt: string;
  updatedAt: string;
}
