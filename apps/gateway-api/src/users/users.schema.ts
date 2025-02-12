import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class SocialMedia {
  @Field({ nullable: true })
  facebookUri?: string;

  @Field({ nullable: true })
  instagramUri?: string;

  @Field({ nullable: true })
  tiktokUri?: string;

  @Field({ nullable: true })
  youtubeUri?: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  countryCode: string;

  @Field()
  age: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => SocialMedia, { nullable: true })
  socialMedia?: SocialMedia;
}

@ObjectType()
export class Users {
  @Field(() => [User])
  users: User[];
}

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  countryCode: string;

  @Field()
  age: number;
}
