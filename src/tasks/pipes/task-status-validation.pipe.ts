import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(vals: any, metadata: ArgumentMetadata) {
    console.log({ vals });
    console.log({ metadata });
    return vals;
  }
}
