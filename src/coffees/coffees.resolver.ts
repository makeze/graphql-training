import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/graphql';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';

@Resolver()
export class CoffeesResolver {
  constructor(private coffeesService: CoffeesService) {}

  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query('coffee')
  async findOne(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeesService.findOne(id);
  }

  @Mutation('createCoffee')
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ): Promise<Coffee> {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput')
    updateCoffeeInput: UpdateCoffeeInput,
  ): Promise<Coffee> {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  async remove(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeesService.remove(id);
  }
}

// npx ts-node src/generate-types
