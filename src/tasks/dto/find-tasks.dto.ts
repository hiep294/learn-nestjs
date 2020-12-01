import { TaskStatus } from '../task.model';

export class FindTasksDto {
  status: TaskStatus;
  keyword: string;
}
