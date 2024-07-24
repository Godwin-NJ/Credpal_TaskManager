import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserModule } from '../User/user.module';
// import { UserService } from '../User/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
