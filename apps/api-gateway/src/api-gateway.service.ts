import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiGatewayService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getInfo() {
    return {
      service: 'API Gateway',
      version: '1.0.0',
      environment: this.configService.get<string>('NODE_ENV'),
      timestamp: new Date().toISOString(),
      features: {
        graphql: true,
        authentication: true,
        rateLimit: true,
        multiTenant: true,
        monitoring: true,
      },
    };
  }
}
