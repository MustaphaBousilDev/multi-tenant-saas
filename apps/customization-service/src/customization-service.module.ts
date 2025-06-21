import { Module } from '@nestjs/common';
import { CustomizationServiceController } from './customization-service.controller';
import { CustomizationServiceService } from './customization-service.service';

@Module({
  imports: [],
  controllers: [CustomizationServiceController],
  providers: [CustomizationServiceService],
})
export class CustomizationServiceModule {}
