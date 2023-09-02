import { User } from 'src/user/entities/user.entity';

export class Recipe {
  id: number;
  name: string;
  userId: number;
  user: User;
  ingredients: string;
  createAt: string;
  updatedAt: string;
}
