import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiGatewayService {
  constructor(private configService: ConfigService) {}

  getInfo() {
    return {
      service: 'API Gateway',
      version: '1.0.0',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      environment: this.configService.get('NODE_ENV'),
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
