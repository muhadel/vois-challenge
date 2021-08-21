import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TaskHistoryService } from '../task-history/task-history.service';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskRequestDto, UpdateTaskRequestDto } from './dto';
import { TaskHistoryDto } from '../task-history/dto';
import { ETaskStatus } from 'src/types/task';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    private readonly taskRepository: TaskRepository,
    private readonly taskHistoryService: TaskHistoryService,
  ) {}

  async createTask(
    createTaskRequestDto: CreateTaskRequestDto,
    userId: number,
  ): Promise<Task> {
    const { assignee } = createTaskRequestDto;
    const isAssigneeExists = await this.userService.findUserById(assignee);
    if (!isAssigneeExists) {
      throw new HttpException('Assignee is not exists', HttpStatus.BAD_REQUEST);
    }
    // Create new task
    const newTask = { ...createTaskRequestDto, creator: userId };
    const taskCreated = await this.taskRepository.createTask(newTask);
    return taskCreated;
  }

  async updateTaskStatus(
    updateTaskRequestDto: UpdateTaskRequestDto,
    userDto: User,
  ): Promise<Task> {
    const { taskId, status } = updateTaskRequestDto;
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) {
      throw new HttpException('Task is not exists!', HttpStatus.BAD_REQUEST);
    }
    if (task.status === status) {
      throw new HttpException(
        `Task already has ${status} status!`,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Check the availability to change status
    const isAcceptable = this.isStatusAcceptable(task.status, status);
    console.log('isAcceptable', isAcceptable);

    if (!isAcceptable) {
      throw new HttpException(
        `Can't change status from ${task.status} to ${status} !`,
        HttpStatus.BAD_REQUEST,
      );
    }
    // update task status
    const updatedTask = await this.taskRepository.updateTaskStatus(
      taskId,
      status,
    );

    // Save history
    if (updatedTask) {
      const history: TaskHistoryDto = {
        newStatus: status,
        oldStatus: task.status,
        task,
        user: userDto,
      };
      const historyCreated = await this.taskHistoryService.createHistory(
        history,
      );
      console.log('historyCreated', historyCreated);
    } else {
      throw new HttpException(
        `Service is down!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return updatedTask;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAllTasks();
  }

  private isStatusAcceptable(
    oldStatus: ETaskStatus,
    newStatus: ETaskStatus,
  ): Boolean {
    const flow = {
      todo: { inprogress: true },
      inprogress: { blocked: true, inQA: true },
      blocked: { todo: true },
      inQA: { todo: true, done: true },
      done: { deployed: true },
    };
    if (flow[oldStatus].hasOwnProperty(newStatus)) {
      return true;
    }
    return false;
  }
}
