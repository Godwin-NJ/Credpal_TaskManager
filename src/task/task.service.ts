import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../User/user.service';
import { request, Request } from 'express';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private UserService: UserService,
  ) {}

  async createTask(taskDto: CreateTaskDto, req: Request): Promise<Task> {
    // : Promise<Task>
    // req?: Request
    // type req = Request;
    const userInfo = await this.UserService.getUserFromToken(req);
    // console.log({ userInfo });
    const task: Task = new Task();
    task.assignedTo = taskDto.assignedTo;
    task.task = taskDto.task;
    task.title = taskDto.taskTitle;
    task.userId = userInfo.id;
    task.createDate = new Date();

    return this.taskRepository.save(task);
  }

  getAllTask() {
    return `This action returns all task`;
  }

  getTask(id: number) {
    return `This action returns a #${id} task`;
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  deleteTask(id: number) {
    return `This action removes a #${id} task`;
  }
}
