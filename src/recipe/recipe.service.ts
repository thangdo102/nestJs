import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: any, createRecipeDto: CreateRecipeDto) {
    const res = await this.prismaService.recipe.create({
      data: {
        ...createRecipeDto,
        userId: user.id,
      },
    });
    return res;
  }

  async findAll() {
    return await this.prismaService.recipe.findMany({});
  }

  async findOne(slug: string) {
    return await this.prismaService.recipe.findFirst({
      where: {
        slug: slug,
      },
    });
  }

  async delete(id: string) {
    return await this.prismaService.recipe.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
