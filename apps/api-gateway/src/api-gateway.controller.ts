import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiGatewayService } from './api-gateway.service';
import { Public } from './auth/decorators/public.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { CurrentTenant } from './auth/decorators/current-tenant.decorator';

@ApiTags('API Gateway')
@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'API Gateway root endpoint' })
  @ApiResponse({ status: 200, description: 'Returns API Gateway information' })
  getRoot() {
    return this.apiGatewayService.getInfo();
  }

  @Get('protected')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Protected endpoint example' })
  @ApiResponse({ status: 200, description: 'Returns user information' })
  getProtected(@CurrentUser() user: any, @CurrentTenant() tenantId: string) {
    return {
      message: 'This is a protected endpoint',
      user: user,
      tenantId: tenantId,
    };
  }

  @Post('test-rate-limit')
  @UseGuards(ThrottlerGuard)
  @Public()
  @ApiOperation({ summary: 'Test rate limiting' })
  testRateLimit() {
    return { message: 'Rate limit test successful' };
  }
}