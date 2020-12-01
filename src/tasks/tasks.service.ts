import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(query?: FindTasksDto) {
    let tasks = this.tasks;
    if (query?.keyword) {
      const keyword = query.keyword.toLocaleLowerCase();
      tasks = tasks.filter(
        (t) =>
          t.description.toLocaleLowerCase().includes(keyword) ||
          t.title.toLocaleLowerCase().includes(keyword),
      );
    }
    if (query?.status) {
      const status = query.status;
      tasks = tasks.filter((t) => t.status === status);
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }
    return task;
  }

  getTaskIndexById(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index < 0) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }
    return index;
  }

  deleteTaskById(id: string) {
    const index = this.getTaskIndexById(id);
    if (index >= 0) {
      return this.tasks.splice(index, 1)[0];
    }
    return {};
  }

  createTask({ title, description }: CreateTaskDto) {
    const newTask = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    } as Task;

    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const index = this.getTaskIndexById(id);
    if (index >= 0) {
      this.tasks[index] = { ...this.tasks[index], ...updateTaskDto };
      return this.tasks[index];
    }
  }
}
