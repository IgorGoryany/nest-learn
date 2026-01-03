import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

interface Task {
  name: string;
  isCompleted?: boolean;
}

export class CreateTaskDto implements Task {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsInt({ message: 'Приоритет должен быть целым числом' })
  priority: number;
}
