import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, User } from '@app/common';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  createUser(@Args('createUserInput') createUserInput: CreateUserDto) {
    return this.usersService.create(createUserInput);
  }

  @Query('users')
  getUsers() {
    return this.usersService.getUsers();
  }

  // @Query('user')
  // findOne(@Args('id') id: number) {
  //   return this.usersService.findOne(id);
  // }

  @Query('user')
  async getUser(@Args('id') id: string): Promise<User> {
    const user = await this.userLoader.load(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user as User;
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserDto) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
