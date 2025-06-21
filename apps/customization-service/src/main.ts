import { NestFactory } from '@nestjs/core';
import { CustomizationServiceModule } from './customization-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomizationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
