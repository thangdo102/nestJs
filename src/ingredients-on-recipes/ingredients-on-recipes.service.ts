import { Injectable } from '@nestjs/common';
import { CreateIngredientsOnRecipeDto } from './dto/create-ingredients-on-recipe.dto';
import { UpdateIngredientsOnRecipeDto } from './dto/update-ingredients-on-recipe.dto';

@Injectable()
export class IngredientsOnRecipesService {
  create(createIngredientsOnRecipeDto: CreateIngredientsOnRecipeDto) {
    return 'This action adds a new ingredientsOnRecipe';
  }

  findAll() {
    return `This action returns all ingredientsOnRecipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientsOnRecipe`;
  }

  update(
    id: number,
    updateIngredientsOnRecipeDto: UpdateIngredientsOnRecipeDto,
  ) {
    return `This action updates a #${id} ingredientsOnRecipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientsOnRecipe`;
  }
}
