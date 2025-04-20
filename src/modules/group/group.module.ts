import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserModule } from 'modules/user/user.module';

import { GroupService } from './application/services/group.service';
import { GroupController } from './infrastructure/http/group.controller';
import { GroupRepository } from './infrastructure/mongoose/group.repository';
import { GroupSchema } from './infrastructure/schemas/group.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: GroupSchema.name,
        schema: SchemaFactory.createForClass(GroupSchema),
      },
    ]),
  ],
  controllers: [GroupController],
  providers: [
    {
      provide: 'IGroupService',
      useClass: GroupService,
    },
    {
      provide: 'IGroupRepository',
      useClass: GroupRepository,
    },
  ],
  exports: ['IGroupService'],
})
export class GroupModule {}
