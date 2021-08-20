import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskRequestDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    private readonly taskRepository: TaskRepository,
  ) {}

  async createTask(
    taskDto: CreateTaskRequestDto,
    userId: number,
  ): Promise<Task> {
    const { assignee } = taskDto;
    const isAssigneeExists = await this.userService.findUserById(assignee);
    if (!isAssigneeExists) {
      throw new HttpException('Assignee is not exists', HttpStatus.BAD_REQUEST);
    }
    console.log('isAssigneeExists', isAssigneeExists);

    // Create new task
    const newTask = { ...taskDto, creator: userId };
    const taskCreated = await this.taskRepository.createTask(newTask);
    // Create task history
    // @TODO
    console.log('taskCreated', taskCreated);

    return taskCreated;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAllTasks();
  }
}
