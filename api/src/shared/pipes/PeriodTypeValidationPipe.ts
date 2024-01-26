import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { PeriodType } from 'src/modules/efficiencies/entities/PeriodType';

@Injectable()
export class PeriodTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidPeriodType(value)) {
      throw new BadRequestException(`Tipo de período inválido.`);
    }
    return value;
  }

  private isValidPeriodType(value: any): value is PeriodType {
    return Object.values(PeriodType).includes(value);
  }
}
