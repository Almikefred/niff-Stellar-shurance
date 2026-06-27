import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantContextService } from './tenant-context.service';
import { TenantConfigService, TenantConfig } from './tenant-config.service';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(
    private readonly tenantContextService: TenantContextService,
    private readonly tenantConfigService: TenantConfigService,
  ) {}

  @Get('config')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get tenant configuration (contract IDs, feature flags)' })
  @ApiResponse({
    status: 200,
    description: 'Tenant configuration including contract IDs, feature flags, and network.',
    schema: {
      example: {
        tenantId: 'acme',
        contractIds: {
          niffyinsure: 'CCXZ...',
          defaultToken: 'CBDR...',
        },
        featureFlags: {
          claims_enabled: true,
          policy_creation_enabled: true,
        },
        network: 'testnet',
      },
    },
  })
  async getConfig(): Promise<TenantConfig> {
    const tenantId = this.tenantContextService.tenantId;
    return this.tenantConfigService.getConfig(tenantId);
  }
}
