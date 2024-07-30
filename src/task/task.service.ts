import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../User/user.service';
import { request, Request } from 'express';
import { NotFoundError } from 'rxjs';

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

  async getAllTask() {
    const allTask = await this.taskRepository.find();

    return allTask;
  }

  async getTask(id: number) {
    const task = await this.taskRepository.find({
      where: {
        id: id,
      },
    });
    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const task = new Task();

    task.task = updateTaskDto.task;
    task.title = updateTaskDto.taskTitle;
    task.assignedTo = updateTaskDto.assignedTo;
    // task.userId = userInfo.id;
    // task.createDate = new Date();

    const validUser = await this.taskRepository.find({
      where: {
        id,
      },
    });

    if (!validUser) {
      return new NotFoundException('invalid user');
    }

    return this.taskRepository.update(id, task);
  }

  async deleteSingleTask(id: number) {
    const validUser = await this.taskRepository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('id = :id', { id })
      .execute();
  }

  async deleteTasks(ids: number[]) {
    const validUser = await this.taskRepository.delete(ids);
    return validUser;
  }
}
