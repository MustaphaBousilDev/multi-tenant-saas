import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('API-Gateway');
  const app = await NestFactory.create(ApiGatewayModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 4000);
  const environment = configService.get('NODE_ENV', 'development');
  app.use(helmet({
    contentSecurityPolicy: environment === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  }));
  app.enableCors({
    origin: configService.get('CORS_ORIGINS', 'http://localhost:3000').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With', 
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Tenant-ID',
      'X-API-Key'
    ],
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  app.setGlobalPrefix('api/v1', {
    exclude: ['health', 'graphql'],
  });
  if (environment !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Multi-Tenant SaaS API Gateway')
      .setDescription('API Gateway for Multi-Tenant SaaS Platform')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addApiKey(
        {
          type: 'apiKey',
          name: 'X-API-Key',
          in: 'header',
        },
        'API-Key',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
  await app.listen(port, '0.0.0.0');
  
  logger.log(`🚀 API Gateway is running on: http://localhost:${port}`);
  logger.log(`📚 GraphQL Playground: http://localhost:${port}/graphql`);
  if (environment !== 'production') {
    logger.log(`📖 API Documentation: http://localhost:${port}/api/docs`);
  }


}
bootstrap();
