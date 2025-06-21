import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomizationServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
