import { Module } from '@nestjs/common';
import { TenantServiceController } from './tenant-service.controller';
import { TenantServiceService } from './tenant-service.service';

@Module({
  imports: [],
  controllers: [TenantServiceController],
  providers: [TenantServiceService],
})
export class TenantServiceModule {}
