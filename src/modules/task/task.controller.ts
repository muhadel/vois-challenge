import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../utilities/user.decorator';
import { TaskService } from './task.service';
import { User } from '../user/user.entity';
import { Task } from './task.entity';
import { CreateTaskRequestDto } from './dto';

@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createTask(
    @Body() taskDto: CreateTaskRequestDto,
    @GetUser() { id }: User,
  ): Promise<Task> {
    return this.taskService.createTask(taskDto, id);
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
}
