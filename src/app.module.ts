import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'modules/auth/auth.module';
import { ConversationModule } from 'modules/conversation/conversation.module';
import { UserModule } from 'modules/user/user.module';
import { ConfigModule } from 'shared/config/config.module';

import { IConfigService } from './shared/config/config.interface';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConversationModule,
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
