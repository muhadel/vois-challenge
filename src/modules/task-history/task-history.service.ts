import { Injectable } from '@nestjs/common';
import { TaskHistoryRepository } from './task-history.repository';
import { TaskHistory } from './task-history.entity';
import { TaskHistoryDto } from './dto';

@Injectable()
export class TaskHistoryService {
  constructor(private readonly taskHistoryRepository: TaskHistoryRepository) {}

  async createHistory(history: TaskHistoryDto): Promise<TaskHistory> {
    return this.taskHistoryRepository.createHistory(history);
  }

  async getHistoryByTaskId(taskId: number): Promise<TaskHistory[]> {
    return this.taskHistoryRepository.getHistoryByTaskId(taskId);
  }
}
