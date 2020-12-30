import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(vals: any) {
    if (!this.isStatusValid(vals)) {
      throw new BadRequestException(`"${vals}" is invalid status`);
    }

    return vals;
  }

  private isStatusValid(status: any) {
    return TaskStatus[status] !== undefined;
  }
}
