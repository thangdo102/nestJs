import { Module } from '@nestjs/common';
import { IngredientsOnRecipesService } from './ingredients-on-recipes.service';
import { IngredientsOnRecipesController } from './ingredients-on-recipes.controller';

@Module({
  controllers: [IngredientsOnRecipesController],
  providers: [IngredientsOnRecipesService],
})
export class IngredientsOnRecipesModule {}
