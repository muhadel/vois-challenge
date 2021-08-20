import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  SignupRequestDto,
  SignupResponseDto,
  SigninRequestDto,
  SigninResponseDto,
} from './dto';
import { User } from '../user/user.entity';
@Injectable()
export class AuthService {
  private static readonly tokenType = 'Bearer';
  constructor(private readonly userService: UserService) {}

  async signup(signupRequestDto: SignupRequestDto): Promise<SignupResponseDto> {
    const { email } = signupRequestDto;
    const isEmailFound = await this.userService.findOne({ email });
    if (isEmailFound) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    // Create User
    const userCreated = await this.userService.create(signupRequestDto);
    console.log('userCreated', userCreated);
    return {
      message: 'Successfully created!',
      data: {
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email,
      },
    };
  }

  async signin(signinRequestDto: SigninRequestDto): Promise<SigninResponseDto> {
    const { email, password } = signinRequestDto;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = user.validatePassword(password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const accessToken = user.generateAuthToken();
    return { tokenType: AuthService.tokenType, accessToken };
  }
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
