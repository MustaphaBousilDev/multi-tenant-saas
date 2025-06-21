import { NestFactory } from '@nestjs/core';
import { TenantServiceModule } from './tenant-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TenantServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
