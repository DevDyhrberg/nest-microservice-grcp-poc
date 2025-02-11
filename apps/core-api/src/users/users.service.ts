import {
  User,
  CreateUserDto,
  UpdateUserDto,
  Users,
  PaginationDto,
} from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i < 10; i++) {
      this.create({
        email: randomUUID(),
        password: randomUUID(),
        countryCode: 'US',
        age: 0,
      });
    }
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      id: randomUUID(),
      firstName: randomUUID(),
      lastName: randomUUID(),
      socialMedia: {},
    };
    this.users.push(user);
    return user;
  }

  getUsers(): Users {
    // return {
    //   users: data.userIds
    //     .map((userId) => {
    //       const user = this.users.find((u) => u.id === userId);
    //       if (!user) return null;

    //       const filteredUser: Partial<User> = { id: userId };
    //       data.fields.forEach((field) => {
    //         if (user[field] !== undefined) {
    //           filteredUser[field] = user[field];
    //         }
    //       });

    //       return filteredUser;
    //     })
    //     .filter(Boolean),
    // };
    return { users: this.users };
  }

  getUser(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    return this.users[userIndex];
  }

  remove(id: string): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.users.splice(userIndex)[0];
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };

    const onComplete = () => {
      subject.complete();
    };

    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
