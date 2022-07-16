import type { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { BoardStatus } from '../interface/board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: string) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid status`);
    }

    return value;
  }

  isStatusValid(status: string) {
    const index = this.StatusOption.indexOf(status as BoardStatus);

    return index !== -1;
  }
}
