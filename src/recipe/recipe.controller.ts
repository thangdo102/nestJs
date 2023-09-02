import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto, @GetUser() user: User) {
    return this.recipeService.create(user, createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.recipeService.findOne(slug);
  }
}
