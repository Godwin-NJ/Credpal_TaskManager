import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// import { AllowAnon } from 'src/auth.decorators';
import { request, Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @AllowAnon()
  @Post('createTask')
  @HttpCode(201)
  createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.createTask(createTaskDto, req);
  }

  @Get('getAllTask')
  @HttpCode(200)
  getAllTask() {
    return this.taskService.getAllTask();
  }

  @Get('getTask/:id')
  @HttpCode(200)
  getTask(@Param('id') id: number) {
    return this.taskService.getTask(+id);
  }

  @Patch('updateTask/:id')
  @HttpCode(200)
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(+id, updateTaskDto);
  }

  @Delete('deletSingleTask/:id')
  @HttpCode(200)
  deleteSingleTask(@Param('id') id: number) {
    return this.taskService.deleteSingleTask(+id);
  }

  @Delete('deletTasks')
  @HttpCode(200)
  deleteTasks(@Body() ids: number[]) {
    return this.taskService.deleteSingleTask(+ids);
  }
}
