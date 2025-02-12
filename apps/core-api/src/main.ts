import { NestFactory } from '@nestjs/core';
import { CoreApiModule } from './core-api.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CORE_API_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoreApiModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../core-api.proto'),
        package: CORE_API_PACKAGE_NAME,
      },
    }
  );
  await app.listen();
}
bootstrap();
