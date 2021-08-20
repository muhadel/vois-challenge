import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
