import { Query, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql';

@Resolver('Drink') // 👈 represents that every FieldResolver represents the Drink type
export class DrinksResolver {
  @Query('drinks')
  async findAll(): Promise<GraphQLTypes.Drink[]> {
    // we're mocking everything just for demonstration purposes
    const coffee = new GraphQLTypes.Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';

    // we're mocking everything - we also don't have a Tea table
    // [if you'd like!] as a fun exercise follow steps similar to how we did everything for Coffee
    // to create a Tea table/etc
    const tea = new GraphQLTypes.Tea();
    tea.name = 'Lipton';
    return [tea, coffee];
  }

  __resolveType(value: GraphQLTypes.Drink) {
    // 🔔 One option
    /*
    if ('brand' in value) {
      return 'Coffee';
    }
    return 'Tea';
    */

    // 🔔 Another option
    /* 
    return Object.getPrototypeOf(value).constructor.name; // "Tea" or "Coffee"
    */

    // 🔔 Another option
    if (value instanceof GraphQLTypes.Coffee) {
      return 'Coffee';
    } else if (value instanceof GraphQLTypes.Tea) {
      return 'Tea';
    }
    return null;
  }
}
