import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserModule } from 'modules/user/user.module';

import { ConversationService } from './application/services/conversation.service';
import { ConversationController } from './infrastructure/http/conversation.controller';
import { ConversationRepository } from './infrastructure/mongoose/conversation.repository';
import { ConversationSchema } from './infrastructure/schemas/conversation.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: ConversationSchema.name,
        schema: SchemaFactory.createForClass(ConversationSchema),
      },
    ]),
  ],
  controllers: [ConversationController],
  providers: [
    {
      provide: 'IConversationService',
      useClass: ConversationService,
    },
    {
      provide: 'IConversationRepository',
      useClass: ConversationRepository,
    },
  ],
  exports: ['IConversationService'],
})
export class ConversationModule {}
