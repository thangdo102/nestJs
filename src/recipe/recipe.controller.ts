import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetUser } from 'src/common/decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtGuard } from 'src/common/guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public-guard.decorator';

@ApiTags('recipe')
@UseGuards(JwtGuard)
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto, @GetUser() user: User) {
    return this.recipeService.create(user, createRecipeDto);
  }

  @Public()
  @Get()
  findAll(
    @GetUser(new ValidationPipe({ validateCustomDecorators: true })) user: any,
  ) {
    console.log(user);
    return this.recipeService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.recipeService.findOne(slug);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.recipeService.delete(id);
  }
}
