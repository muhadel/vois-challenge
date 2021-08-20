import {
  Repository,
  EntityRepository,
  FindOneOptions,
  FindConditions,
} from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(task): Promise<Task> {
    return await this.save(task);
  }

  public async findAllTasks(): Promise<Task[]> {
    return this.find({
      relations: ['creator', 'assignee'],
    });
  }

  // public async findOneUser(
  //   condition: FindConditions<User>,
  //   options: FindOneOptions,
  // ): Promise<User> {
  //   return this.findOne(condition, options);
  // }

  // public async findUserById(userId: number): Promise<User> {
  //   return this.findOne(userId);
  // }
}
