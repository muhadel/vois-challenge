import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: User): Promise<User> {
    return await this.create(user).save();
  }

  public async findById(userId: number): Promise<User> {
    return await this.findOne(userId);
  }

  public async findAll(): Promise<User[]> {
    return await this.find({});
  }
}
