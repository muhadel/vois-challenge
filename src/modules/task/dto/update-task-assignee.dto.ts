import { IsDefined, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';

export class UpdateTaskAssigneeDto {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  assignee: number;
}
