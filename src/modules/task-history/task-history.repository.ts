import {
  Repository,
  EntityRepository,
  FindOneOptions,
  FindConditions,
} from 'typeorm';
import { TaskHistory } from './task-history.entity';

@EntityRepository(TaskHistory)
export class TaskHistoryRepository extends Repository<TaskHistory> {
  async createHistory(history): Promise<TaskHistory> {
    return await this.save(history);
  }
}
