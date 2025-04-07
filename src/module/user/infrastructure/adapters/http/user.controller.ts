import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'module/user/application/dtos/create-user.dto';
import { UserResponseDto } from 'module/user/application/dtos/user-response.dto';
import { IUserService } from 'module/user/application/ports/user-service.port';

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
    type: UserResponseDto,
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.save(createUserDto);

    return new UserResponseDto(user);
  }
}
