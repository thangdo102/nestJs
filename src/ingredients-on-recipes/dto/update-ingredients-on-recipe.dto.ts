import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientsOnRecipeDto } from './create-ingredients-on-recipe.dto';

export class UpdateIngredientsOnRecipeDto extends PartialType(CreateIngredientsOnRecipeDto) {}
