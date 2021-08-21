import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { TaskHistoryModule } from './modules/task-history/task-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SharedModule,
    AuthModule,
    UserModule,
    TaskModule,
    TaskHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
