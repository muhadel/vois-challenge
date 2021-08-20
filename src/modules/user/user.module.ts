import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
// import { JwtStrategy } from '../auth/jwt.strategy';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
})
export class UserModule {}
