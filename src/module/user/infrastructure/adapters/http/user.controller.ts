import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'module/user/application/dtos/create-user.dto';
import { IUserService } from 'module/user/application/ports/user-service.port';
import { User } from 'module/user/domain/entities/user.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created successfully',
  })
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.save(createUserDto);
  }
}
