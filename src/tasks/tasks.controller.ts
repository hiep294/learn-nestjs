import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() query: FindTasksDto) {
    return this.tasksService.getAllTasks(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() inputs: CreateTaskDto) {
    return this.tasksService.createTask(inputs);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Body('status') status: TaskStatus,
    @Param('id') id: string,
  ) {
    return this.tasksService.updateTask(id, { status });
  }
}
