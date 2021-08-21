import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TaskHistoryService } from '../task-history/task-history.service';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { TaskHistory } from '../task-history/task-history.entity';
import { TaskRepository } from './task.repository';
import { TaskHistoryDto } from '../task-history/dto';
import { ETaskStatus } from 'src/types/task';
import {
  CreateTaskRequestDto,
  UpdateTaskStatusDto,
  UpdateTaskAssigneeDto,
} from './dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    private readonly taskRepository: TaskRepository,
    private readonly taskHistoryService: TaskHistoryService,
  ) {}

  async createTask(createTaskRequestDto: CreateTaskRequestDto, userId: number): Promise<Task> {
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

  async updateTaskStatus(UpdateTaskStatusDto: UpdateTaskStatusDto, userDto: User): Promise<Task> {
    const { taskId, status } = UpdateTaskStatusDto;
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) {
      throw new HttpException('Task is not exists!', HttpStatus.BAD_REQUEST);
    }
    if (task.status === status) {
      throw new HttpException(`Task already has ${status} status!`, HttpStatus.BAD_REQUEST);
    }
    // Check the availability to change status
    const isAcceptable = this.isStatusAcceptable(task.status, status);

    if (!isAcceptable) {
      throw new HttpException(`Can't change status from ${task.status} to ${status} !`,HttpStatus.BAD_REQUEST);
    }
    // update task status
    const updatedTask = await this.taskRepository.updateTask(taskId, {status});

    if (updatedTask) {
      const history: TaskHistoryDto = {newStatus: status,oldStatus: task.status,task,user: userDto};
      // Create history
      await this.taskHistoryService.createHistory(history);
    } else {
      throw new HttpException(`Service is down!`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return updatedTask;
  }

  async updateTaskAssignee(taskId: number, updateTaskAssigneeDto: UpdateTaskAssigneeDto): Promise<Task> {
    const { assignee } = updateTaskAssigneeDto;
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) {
      throw new HttpException('Task is not exists!', HttpStatus.BAD_REQUEST);
    }
    // update task assignee
    const updatedTask = await this.taskRepository.updateTask(taskId, {assignee: { id: assignee }});
    return updatedTask;
  }

  async getTaskHistory(taskId: number): Promise<TaskHistory[]> {
    return await this.taskHistoryService.getHistoryByTaskId(taskId);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAllTasks();
  }

  private isStatusAcceptable(oldStatus: ETaskStatus, newStatus: ETaskStatus): Boolean {
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
