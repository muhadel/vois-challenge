import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsDefined,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z])).*$/, {
    message: `Password is too weak!`,
  })
  @ApiProperty()
  password: string;
}
