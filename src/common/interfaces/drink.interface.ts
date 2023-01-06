import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Drink {
  @Field()
  id: number;
  @Field()
  brand: string;
  @Field()
  name: string;
}
