import { Test, TestingModule } from '@nestjs/testing';
import { CustomizationServiceController } from './customization-service.controller';
import { CustomizationServiceService } from './customization-service.service';

describe('CustomizationServiceController', () => {
  let customizationServiceController: CustomizationServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomizationServiceController],
      providers: [CustomizationServiceService],
    }).compile();

    customizationServiceController = app.get<CustomizationServiceController>(CustomizationServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(customizationServiceController.getHello()).toBe('Hello World!');
    });
  });
});
