import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      name: 'learn Nest.js',
      isCompleted: false,
    },
    {
      id: 2,
      name: 'create API',
      isCompleted: false,
    },
  ];

  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      ...createTaskDto,
      id: (this.tasks.at(-1)?.id || 0) + 1,
      isCompleted: false,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    Object.assign(task, updateTaskDto);

    return task;
  }

  remove(id: number) {
    const currTask = this.findOne(id);

    if (!currTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.tasks = this.tasks.filter((task) => task.id !== currTask.id);

    return currTask;
  }
}
