import {
  Repository,
  EntityRepository,
  FindOneOptions,
  FindConditions,
} from 'typeorm';
import { TaskHistory } from './task-history.entity';
import { TaskHistoryDto } from './dto';

@EntityRepository(TaskHistory)
export class TaskHistoryRepository extends Repository<TaskHistory> {
  async createHistory(history: TaskHistoryDto): Promise<TaskHistory> {
    return await this.save(history);
  }
}
