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
        `Tipo de classificação do período inválido.`,
      );
    }
    return value;
  }

  private isValidPeriodType(value: any): value is PeriodClassification {
    return Object.values(PeriodClassification).includes(value);
  }
}
