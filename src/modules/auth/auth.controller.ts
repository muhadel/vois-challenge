import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupRequestDto,
  SigninRequestDto,
  SigninResponseDto,
  SignupResponseDto,
} from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Signup' })
  signup(@Body() signupDto: SignupRequestDto): Promise<SignupResponseDto> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Signin' })
  signin(@Body() signinDto: SigninRequestDto): Promise<SigninResponseDto> {
    return this.authService.signin(signinDto);
  }
}
