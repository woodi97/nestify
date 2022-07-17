import type { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: string) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: string) {
    const index = this.StatusOptions.indexOf(status as BoardStatus);

    return index !== -1;
  }
}
