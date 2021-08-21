import {
  Repository,
  EntityRepository,
  FindOneOptions,
  FindConditions,
  UpdateResult,
} from 'typeorm';
import { Task } from './task.entity';
import { ETaskStatus } from '../../types/task';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(task): Promise<Task> {
    return await this.save(task);
  }

  public async findTaskById(taskId: number): Promise<Task> {
    return this.findOne(taskId);
  }

  async updateTaskStatus(taskId: number, status: ETaskStatus): Promise<Task> {
    await this.update({ id: taskId }, { status });
    return this.findOne(taskId, { relations: ['creator', 'assignee'] });
  }

  public async findAllTasks(): Promise<Task[]> {
    return this.find({
      relations: ['creator', 'assignee'],
    });
  }
}
