import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    
    const { method, url, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const tenantId = headers['x-tenant-id'] || 'no-tenant';
    const userId = request.user?.id || 'anonymous';

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - now;
        this.logger.log(
          `${method} ${url} ${elapsed}ms - User: ${userId} - Tenant: ${tenantId} - ${userAgent}`,
        );
      }),
    );
  }
}