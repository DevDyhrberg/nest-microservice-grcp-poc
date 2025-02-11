import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/common';
import { CORE_API_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(CORE_API_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  getUsers() {
    return this.usersService.getUsers({});
  }

  getUser(id: string) {
    return this.usersService.getUser({ id });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ ...updateUserDto });
  }

  removeUser(id: string) {
    return this.usersService.removeUser({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationDto>();

    users$.next({ page: 0, skip: 25 });
    users$.next({ page: 1, skip: 25 });
    users$.next({ page: 2, skip: 25 });
    users$.next({ page: 3, skip: 25 });

    users$.complete();

    let chunkNumber = 1;

    this.usersService.queryUsers(users$).subscribe((users) => {
      console.log('Chunk: ', chunkNumber, users);
      chunkNumber++;
    });
  }
}
