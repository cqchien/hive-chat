import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from 'shared/config/config.module';

import { IConfigService } from './shared/config/config.interface';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: IConfigService) => ({
        uri: configService.databaseConfig,
      }),
      inject: ['IConfigService'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
