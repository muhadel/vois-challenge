import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User) {
    return this.userRepository.create(user);
  }

  async findOneById(userId: number) {
    return await this.userRepository.findById(userId);
  }
}
