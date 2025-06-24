import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    return {
      // Schema Configuration
      autoSchemaFile: join(process.cwd(), 'apps/api-gateway/schema.gql'),
      sortSchema: true,
      
      // Development Features
      playground: !isProduction,
      introspection: !isProduction,
      
      // Context Configuration
      context: ({
        req,
        res,
      }: {
        req: Express.Request;
        res: Express.Response;
      }) => ({
        req,
        res,
        user: req.user,
        tenantId: req.headers['x-tenant-id'],
      }),

      // Security Configuration
      cors: {
        origin:
          this.configService.get('CORS_ORIGINS', 'http://localhost:3000').split(','),
        credentials: true,
      },

      // Performance Configuration
      cache: 'bounded',
      
      // Error Handling
      formatError: (error) => {
        if (isProduction) {
          // Don't expose internal errors in production
          return {
            message: error.message,
            code: error.extensions?.code,
            path: error.path,
          };
        }
        return error;
      },

      // Custom Directives
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },

      // Upload Configuration
      uploads: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
      },
    };
  }
}
