import { Controller, Get } from '@nestjs/common';
import { CustomizationServiceService } from './customization-service.service';

@Controller()
export class CustomizationServiceController {
  constructor(private readonly customizationServiceService: CustomizationServiceService) {}

  @Get()
  getHello(): string {
    return this.customizationServiceService.getHello();
  }
}
