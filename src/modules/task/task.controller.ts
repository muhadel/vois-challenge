import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../utilities/user.decorator';
import { TaskService } from './task.service';
import { User } from '../user/user.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('find-all')
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetUser() user: User): Promise<any> {
    console.log('This id =>', user);
    //   return this.authService.findAll();
    return;
  }
}
