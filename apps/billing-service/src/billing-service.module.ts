import { Module } from '@nestjs/common';
import { BillingServiceController } from './billing-service.controller';
import { BillingServiceService } from './billing-service.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BillingServiceController],
  providers: [BillingServiceService],
})
export class BillingServiceModule {}
