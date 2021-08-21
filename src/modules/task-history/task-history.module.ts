import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskHistoryService } from './task-history.service';
import { TaskHistory } from './task-history.entity';
import { TaskHistoryRepository } from './task-history.repository';
@Module({
  imports: [TypeOrmModule.forFeature([TaskHistory, TaskHistoryRepository])],
  providers: [TaskHistoryService],
})
export class TaskHistoryModule {}
