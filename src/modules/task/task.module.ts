import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskRepository, User, UserRepository]),
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtStrategy, UserService],
})
export class TaskModule {}
