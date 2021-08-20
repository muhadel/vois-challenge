import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Task, User, UserRepository])],
  controllers: [TaskController],
  providers: [TaskService, JwtStrategy],
})
export class TaskModule {}
