import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { User, Users } from './users.schema';
import { USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { CORE_API_SERVICE } from './constants';

@Resolver(() => User)
export class UsersResolver implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(CORE_API_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  // @Mutation(() => User)
  // createUser(@Args('data') createUserInput: CreateUserInput): Observable<User> {
  //   return this.usersService.createUser(createUserInput as any);
  // }

  // @Query(() => Users)
  // getUsers(
  //   @Args('ids', { type: () => [ID] }) ids: string[]
  // ): Observable<Users> {
  //   return this.usersService.getUsers({ ids: ids.map((id) => ({ id })) }).pipe(
  //     map((response) => ({
  //       users: response.users.map((user) => ({
  //         ...user,
  //         email: (user as User).email || '', // Ensure email is present
  //       })),
  //     }))
  //   );
  // }

  @Query(() => Users)
  getAllUsers(): Observable<Users> {
    return this.usersService.getAllUsers({});
  }

  // @Query(() => User)
  // getUser(@Args('id', { type: () => ID }) id: string): Observable<User> {
  //   return this.usersService.getUser({ id });
  // }
}
