import { Recipe } from 'src/recipe/entities/recipe.entity';

export class User {
  id: number;
  email: string;
  hash: string;
  firstName: string;
  lastName: string;
  recipe: Recipe[];
  createAt: string;
  updatedAt: string;
}
