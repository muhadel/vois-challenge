import { IsDefined, IsNumber, IsEnum } from 'class-validator';
import { ETaskStatus } from '../../../types/task';
import { Task } from '../../task/task.entity';
import { User } from '../../user/user.entity';
import { HISTORY_STATUS_ERR_MESSAGE } from '../../../utilities/common';

export class TaskHistoryDto {
  @IsDefined()
  @IsNumber()
  task: Task;

  @IsDefined()
  @IsEnum(ETaskStatus, { message: HISTORY_STATUS_ERR_MESSAGE })
  oldStatus: ETaskStatus;

  @IsDefined()
  @IsEnum(ETaskStatus, { message: HISTORY_STATUS_ERR_MESSAGE })
  newStatus: ETaskStatus;

  @IsDefined()
  @IsNumber()
  user: User;
}
