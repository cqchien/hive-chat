import { Global, Module } from '@nestjs/common';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'IConfigService',
      useClass: ConfigService,
    },
  ],
  exports: ['IConfigService'],
})
export class ConfigModule {}
