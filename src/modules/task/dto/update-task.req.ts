import { IsEnum, IsDefined, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HISTORY_STATUS_ERR_MESSAGE } from '../../../utilities/common';
import { ETaskStatus } from '../../../types/task';

export class UpdateTaskRequestDto {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  taskId: number;

  @IsDefined()
  @ApiProperty()
  @IsEnum(ETaskStatus, { message: HISTORY_STATUS_ERR_MESSAGE })
  status: ETaskStatus;
}
