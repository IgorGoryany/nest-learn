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
    console.log(createTaskDto);
    this.tasks = [
      ...this.tasks,
      {
        ...createTaskDto,
        id: (this.tasks.at(-1)?.id || 0) + 1,
        isCompleted: false,
      },
    ];
    return 'This action adds a new task';
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
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          ...updateTaskDto,
        };
      }
      return task;
    });
    return;
  }

  remove(id: number) {
    return (this.tasks = this.tasks.filter((task) => task.id !== id));
  }
}
