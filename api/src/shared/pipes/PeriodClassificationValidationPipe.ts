import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { PeriodClassification } from 'src/modules/efficiencies/entities/PeriodClassification';

@Injectable()
export class PeriodClassificationValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidPeriodType(value)) {
      throw new BadRequestException(
        `Tipo de período inválido. Deveria ser um dos seguintes valores: ${Object.values(
          PeriodClassification,
        ).join(', ')}`,
      );
    }
    return value;
  }

  private isValidPeriodType(value: any): value is PeriodClassification {
    return Object.values(PeriodClassification).includes(value);
  }
}
