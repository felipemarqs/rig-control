import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { OrderByType } from 'src/modules/periods/entities/OrderByType';

@Injectable()
export class OrderByValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidOrderByType(value)) {
      throw new BadRequestException(
        `Tipo de período inválido. Deveria ser um dos seguintes valores: ${Object.values(
          OrderByType,
        ).join(', ')}`,
      );
    }
    return value;
  }

  private isValidOrderByType(value: any): value is OrderByType {
    return Object.values(OrderByType).includes(value);
  }
}
