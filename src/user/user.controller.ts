import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/common/auth/token.decorator';
import { User } from 'src/entities/user.entity';
import { SigninRequestDto, SignupRequestDto } from './dto/user.request.dto';
import {
  SigninResponseDto,
  SignupResponseDto,
  UserFindResponseDto,
} from './dto/user.response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() req: SignupRequestDto): Promise<SignupResponseDto> {
    return await this.userService.signUp(req);
  }

  @Post('/signin')
  async singIn(@Body() req: SigninRequestDto): Promise<SigninResponseDto> {
    return await this.userService.signIn(req);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Token() user: User,
  ): Promise<UserFindResponseDto> {
    return await this.userService.findOne(id, user);
  }
}
