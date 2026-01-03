interface Task {
  name: string;
  isCompleted?: boolean;
}

export class CreateTaskDto implements Task {
  name!: string;
  isCompleted?: boolean = false;
}
