import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupRequestDto,
  SigninRequestDto,
  SigninResponseDto,
  SignupResponseDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupRequestDto): Promise<SignupResponseDto> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninRequestDto): Promise<SigninResponseDto> {
    return this.authService.signin(signinDto);
  }

  @Get('find-all')
  findAll(): Promise<any> {
    return this.authService.findAll();
  }
}
