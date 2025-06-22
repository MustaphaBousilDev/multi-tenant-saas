import { Module } from '@nestjs/common';
import { TenantServiceController } from './tenant-service.controller';
import { TenantServiceService } from './tenant-service.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TenantServiceController],
  providers: [TenantServiceService],
})
export class TenantServiceModule {}
