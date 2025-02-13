// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v5.29.3
// source: proto/core-api.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "coreApi";

export interface Empty {
}

export interface PaginationDto {
  page: number;
  skip: number;
}

export interface GetUserDto {
  id: string;
}

export interface GetUsersDto {
  ids: GetUserDto[];
}

export interface GetAllUsersDto {
  ids: GetUserDto[];
}

export interface CreateUserDto {
  email: string;
  password: string;
  countryCode: string;
  age: number;
}

export interface UpdateUserDto {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  age: number;
  socialMedia: SocialMedia | undefined;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  age: number;
  socialMedia: SocialMedia | undefined;
}

export interface Users {
  users: User[];
}

export interface SocialMedia {
  facebookUri?: string | undefined;
  instagramUri?: string | undefined;
  tiktokUri?: string | undefined;
  youtubeUri?: string | undefined;
}

export const CORE_API_PACKAGE_NAME = "coreApi";

export interface UsersServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  getAllUsers(request: Empty): Observable<Users>;

  getUsers(request: GetUsersDto): Observable<Users>;

  getUser(request: GetUserDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  removeUser(request: GetUserDto): Observable<User>;

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;
}

export interface UsersServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  getAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  getUsers(request: GetUsersDto): Promise<Users> | Observable<Users> | Users;

  getUser(request: GetUserDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  removeUser(request: GetUserDto): Promise<User> | Observable<User> | User;

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getAllUsers", "getUsers", "getUser", "updateUser", "removeUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
