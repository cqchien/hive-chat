import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth, AuthUser } from 'decorators/auth.decorators';
import { UserResponseDto } from 'modules/user/application/dtos/user-response.dto';
import { UserEntity } from 'modules/user/domain/entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UserController {
  @Get('me')
  @Auth()
  @ApiOkResponse({
    description: 'Get current user',
    type: UserResponseDto,
  })
  getMe(@AuthUser() authUser: UserEntity): UserResponseDto {
    return new UserResponseDto(authUser);
  }
}
