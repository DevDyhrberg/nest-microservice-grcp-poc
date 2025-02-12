import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { CORE_API_SERVICE } from './constants';
import { CORE_API_PACKAGE_NAME } from '@app/common';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      debug: true,
      playground: true,
    }),
    ClientsModule.register([
      {
        name: CORE_API_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: CORE_API_PACKAGE_NAME,
          protoPath: join(__dirname, '../core-api.proto'),
        },
      },
    ]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
