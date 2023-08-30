import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngredientsOnRecipesService } from './ingredients-on-recipes.service';
import { CreateIngredientsOnRecipeDto } from './dto/create-ingredients-on-recipe.dto';
import { UpdateIngredientsOnRecipeDto } from './dto/update-ingredients-on-recipe.dto';

@Controller('ingredients-on-recipes')
export class IngredientsOnRecipesController {
  constructor(
    private readonly ingredientsOnRecipesService: IngredientsOnRecipesService,
  ) {}

  @Post()
  create(@Body() createIngredientsOnRecipeDto: CreateIngredientsOnRecipeDto) {
    return this.ingredientsOnRecipesService.create(
      createIngredientsOnRecipeDto,
    );
  }

  @Get()
  findAll() {
    return this.ingredientsOnRecipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientsOnRecipesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientsOnRecipeDto: UpdateIngredientsOnRecipeDto,
  ) {
    return this.ingredientsOnRecipesService.update(
      +id,
      updateIngredientsOnRecipeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientsOnRecipesService.remove(+id);
  }
}
