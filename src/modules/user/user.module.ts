import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { UserService } from './application/services/user.service';
import { UserController } from './infrastructure/http/user.controller';
import { UserRepository } from './infrastructure/mongoose/user.repository';
import { UserSchema } from './infrastructure/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository, // Replace with actual repository implementation
    },
  ],
  exports: ['IUserService'],
})
export class UserModule {}
