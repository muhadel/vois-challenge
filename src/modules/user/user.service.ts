import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { FindConditions, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(user) {
    return this.userRepository.createUser(user);
  }

  async findOne(
    conditions: FindConditions<User>,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    return await this.userRepository.findOneUser(conditions, options);
  }

  async findAll() {
    return await this.userRepository.findAllUsers();
  }
}
