import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { GetUser } from '../../utilities/user.decorator';
import { TaskService } from './task.service';
import { User } from '../user/user.entity';
import { Task } from './task.entity';
import { TaskHistory } from '../task-history/task-history.entity';
import {
  CreateTaskRequestDto,
  UpdateTaskStatusDto,
  UpdateTaskAssigneeDto,
  FindOneParams,
} from './dto';

@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create new task' })
  createTask(@Body() createTaskRequestDto: CreateTaskRequestDto, @GetUser() { id }: User): Promise<Task> {
    return this.taskService.createTask(createTaskRequestDto, id);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update task status' })
  updateTaskStatus(@Body() updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() userDto: User): Promise<Task> {
    return this.taskService.updateTaskStatus(updateTaskStatusDto, userDto);
  }

  @Put('/assign/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Assign task to user by task id' })
  @UseGuards(AuthGuard('jwt'))
  assignTask(@Param() { id }: FindOneParams, @Body() updateTaskAssigneeDto: UpdateTaskAssigneeDto): Promise<Task> {
    return this.taskService.updateTaskAssignee(parseInt(id),updateTaskAssigneeDto);
  }

  @Get('/history/:id')
  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: 'Get task history by task id' })
  @UseGuards(AuthGuard('jwt'))
  getTaskHistory(@Param() { id }: FindOneParams): Promise<TaskHistory[]> {
    return this.taskService.getTaskHistory(parseInt(id));
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all tasks' })
  @UseGuards(AuthGuard('jwt'))
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }
}
