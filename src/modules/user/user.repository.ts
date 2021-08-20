import {
  Repository,
  EntityRepository,
  FindOneOptions,
  FindConditions,
} from 'typeorm';
// import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user): Promise<User> {
    const hashedPassword = User.hashPassword(user.password);
    return await this.save({ ...user, password: hashedPassword });
  }

  public async findOneUser(
    condition: FindConditions<User>,
    options: FindOneOptions,
  ): Promise<User> {
    return this.findOne(condition, options);
  }

  public async findUserById(userId: number): Promise<User> {
    return this.findOne(userId);
  }

  public async findAllUsers(): Promise<User[]> {
    return this.find({});
  }
}
