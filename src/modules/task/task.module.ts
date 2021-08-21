import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { TaskHistory } from '../task-history/task-history.entity';

import { TaskRepository } from './task.repository';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { TaskHistoryService } from '../task-history/task-history.service';
import { TaskHistoryRepository } from '../task-history/task-history.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      TaskHistory,
      User,
      TaskRepository,
      UserRepository,
      TaskHistoryRepository,
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtStrategy, UserService, TaskHistoryService],
})
export class TaskModule {}
