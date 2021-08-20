import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsDefined,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninRequestDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z])).*$/, {
    message: `Password is too weak!`,
  })
  @IsDefined()
  @ApiProperty()
  password: string;
}
