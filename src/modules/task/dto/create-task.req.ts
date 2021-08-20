import { IsString, IsDefined, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequestDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  title: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  description: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  assignee: number;
}
