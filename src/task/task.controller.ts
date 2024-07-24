import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AllowAnon } from 'src/auth.decorators';
import { request, Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @AllowAnon()
  @Post('createTask')
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.createTask(createTaskDto, req);
  }

  @Get()
  findAll() {
    return this.taskService.getAllTask();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.getTask(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.deleteTask(+id);
  }
}
