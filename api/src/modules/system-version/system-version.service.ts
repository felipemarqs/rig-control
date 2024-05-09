import { Injectable } from '@nestjs/common';
import { CreateSystemVersionDto } from './dto/create-system-version.dto';
import { UpdateSystemVersionDto } from './dto/update-system-version.dto';
import { SystemVersionRepository } from 'src/shared/database/repositories/systemVersion.repositories';

@Injectable()
export class SystemVersionService {
  constructor(private readonly systemVersionRepo: SystemVersionRepository) {}

  async findFirst() {
    return await this.systemVersionRepo.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
